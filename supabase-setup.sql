-- SparkForge Supabase 建表脚本
-- 在 Supabase SQL 编辑器中执行此脚本
-- 支持幂等执行，可多次运行

-- ============================================
-- 删除已存在的 RLS 策略
-- ============================================

DROP POLICY IF EXISTS "Public access to signals" ON "Signal";
DROP POLICY IF EXISTS "Public access to logs" ON "LogEntry";
DROP POLICY IF EXISTS "User access to settings" ON "UserSetting";

-- ============================================
-- 删除已存在的表（按外键依赖顺序）
-- ============================================

DROP TABLE IF EXISTS "LogEntry" CASCADE;
DROP TABLE IF EXISTS "CanvasReport" CASCADE;
DROP TABLE IF EXISTS "ForgeProject" CASCADE;
DROP TABLE IF EXISTS "UserSetting" CASCADE;
DROP TABLE IF EXISTS "Signal" CASCADE;

-- ============================================
-- 删除已存在的枚举类型
-- ============================================

DROP TYPE IF EXISTS "SignalStatus" CASCADE;
DROP TYPE IF EXISTS "ForgeStatus" CASCADE;
DROP TYPE IF EXISTS "CanvasStatus" CASCADE;
DROP TYPE IF EXISTS "LogType" CASCADE;

-- ============================================
-- 创建枚举类型
-- ============================================

CREATE TYPE "SignalStatus" AS ENUM (
  'PENDING',
  'SCREENED',
  'SCORED',
  'TOP10',
  'ARCHIVED'
);

CREATE TYPE "ForgeStatus" AS ENUM (
  'PENDING',
  'RUNNING',
  'COMPLETED',
  'FAILED'
);

CREATE TYPE "CanvasStatus" AS ENUM (
  'PENDING',
  'GENERATING',
  'COMPLETED',
  'FAILED'
);

CREATE TYPE "LogType" AS ENUM (
  'SIGNAL_DISCOVERED',
  'SIGNAL_SCORED',
  'SIGNAL_TOP10',
  'FORGE_STARTED',
  'FORGE_PROGRESS',
  'FORGE_COMPLETED',
  'CANVAS_GENERATED',
  'SYSTEM'
);

-- ============================================
-- 创建 Signal 表
-- ============================================

CREATE TABLE "Signal" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "source" VARCHAR NOT NULL,
  "sourceId" VARCHAR NOT NULL,
  "title" VARCHAR NOT NULL,
  "description" TEXT,
  "url" VARCHAR,
  "imageUrl" VARCHAR,
  "tags" TEXT[] DEFAULT '{}',
  "author" VARCHAR,
  "votesCount" INTEGER DEFAULT 0,
  "commentsCount" INTEGER DEFAULT 0,
  "hotScore" FLOAT DEFAULT 0,
  "noveltyScore" FLOAT,
  "businessScore" FLOAT,
  "localScore" FLOAT,
  "finalScore" FLOAT,
  "scoreVersion" VARCHAR,
  "status" "SignalStatus" DEFAULT 'PENDING',
  "rawData" JSON,
  "fetchedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建唯一约束和索引
CREATE UNIQUE INDEX "Signal_source_sourceId_key" ON "Signal" ("source", "sourceId");
CREATE INDEX "Signal_status_finalScore_idx" ON "Signal" ("status", "finalScore");
CREATE INDEX "Signal_source_fetchedAt_idx" ON "Signal" ("source", "fetchedAt");

-- ============================================
-- 创建 ForgeProject 表
-- ============================================

CREATE TABLE "ForgeProject" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "signalId" UUID NOT NULL REFERENCES "Signal"("id") ON DELETE CASCADE,
  "status" "ForgeStatus" DEFAULT 'PENDING',
  "targetLanguage" VARCHAR DEFAULT 'zh-CN',
  "customPrompt" TEXT,
  "localScore" FLOAT,
  "outputUrl" VARCHAR,
  "outputRepoUrl" VARCHAR,
  "outputPreviewUrl" VARCHAR,
  "outputSummary" TEXT,
  "startedAt" TIMESTAMP,
  "completedAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX "ForgeProject_status_createdAt_idx" ON "ForgeProject" ("status", "createdAt");

-- ============================================
-- 创建 CanvasReport 表
-- ============================================

CREATE TABLE "CanvasReport" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "signalId" UUID NOT NULL REFERENCES "Signal"("id") ON DELETE CASCADE,
  "positioning" TEXT,
  "userPersona" TEXT,
  "competitors" JSON,
  "monetization" TEXT,
  "actionPlan" JSON,
  "fullReport" JSON,
  "status" "CanvasStatus" DEFAULT 'PENDING',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX "CanvasReport_status_createdAt_idx" ON "CanvasReport" ("status", "createdAt");

-- ============================================
-- 创建 LogEntry 表
-- ============================================

CREATE TABLE "LogEntry" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "signalId" UUID REFERENCES "Signal"("id") ON DELETE CASCADE,
  "forgeId" UUID REFERENCES "ForgeProject"("id") ON DELETE CASCADE,
  "type" "LogType" NOT NULL,
  "title" VARCHAR NOT NULL,
  "content" TEXT,
  "metadata" JSON,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX "LogEntry_type_createdAt_idx" ON "LogEntry" ("type", "createdAt");

-- ============================================
-- 创建 UserSetting 表
-- ============================================

CREATE TABLE "UserSetting" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" VARCHAR UNIQUE NOT NULL,
  "sources" TEXT[] DEFAULT '{}',
  "categories" TEXT[] DEFAULT '{}',
  "minScore" FLOAT DEFAULT 0,
  "notify" BOOLEAN DEFAULT true,
  "subscribedSignals" TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 创建触发器更新 updatedAt
-- ============================================

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_signal ON "Signal";
CREATE TRIGGER set_timestamp_signal
BEFORE UPDATE ON "Signal"
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_forge_project ON "ForgeProject";
CREATE TRIGGER set_timestamp_forge_project
BEFORE UPDATE ON "ForgeProject"
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_canvas_report ON "CanvasReport";
CREATE TRIGGER set_timestamp_canvas_report
BEFORE UPDATE ON "CanvasReport"
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_user_setting ON "UserSetting";
CREATE TRIGGER set_timestamp_user_setting
BEFORE UPDATE ON "UserSetting"
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ============================================
-- 创建数组操作函数
-- ============================================

CREATE OR REPLACE FUNCTION array_append_unique(arr TEXT[], val TEXT)
RETURNS TEXT[] AS $$
BEGIN
  IF arr IS NULL THEN
    RETURN ARRAY[val];
  END IF;
  IF val = ANY(arr) THEN
    RETURN arr;
  END IF;
  RETURN arr || val;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION array_remove_val(arr TEXT[], val TEXT)
RETURNS TEXT[] AS $$
BEGIN
  IF arr IS NULL THEN
    RETURN '{}'::TEXT[];
  END IF;
  RETURN array_remove(arr, val);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 配置 RLS (Row Level Security)
-- ============================================

-- 启用 RLS
ALTER TABLE "Signal" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ForgeProject" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CanvasReport" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LogEntry" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserSetting" ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许公开读取信号
CREATE POLICY "Public access to signals" ON "Signal"
FOR SELECT USING (true);

-- 创建策略：允许公开读取日志
CREATE POLICY "Public access to logs" ON "LogEntry"
FOR SELECT USING (true);

-- 创建策略：用户只能访问自己的设置
CREATE POLICY "User access to settings" ON "UserSetting"
FOR ALL USING (auth.uid()::TEXT = "userId");

-- ============================================
-- 初始化数据
-- ============================================

-- 插入一些示例信号
INSERT INTO "Signal" ("source", "sourceId", "title", "description", "url", "tags", "hotScore", "status") VALUES
('producthunt', 'demo-1', 'AI Code Review Agent', '基于 AI 的智能代码审查工具，帮助团队提高代码质量', 'https://producthunt.com/posts/ai-code-review-agent', '{"AI", "Developer Tools", "Code Quality"}', 85, 'PENDING'),
('hackernews', 'demo-2', 'OpenAI Sora API Released', 'OpenAI 正式发布 Sora API，支持文本生成视频', 'https://news.ycombinator.com/item?id=demo-2', '{"AI", "Video", "OpenAI"}', 92, 'PENDING'),
('producthunt', 'demo-3', 'Notion AI Workspace', '集成 AI 的新一代工作空间，提升团队协作效率', 'https://producthunt.com/posts/notion-ai-workspace', '{"Productivity", "AI", "Collaboration"}', 78, 'PENDING');

-- 插入示例日志
INSERT INTO "LogEntry" ("type", "title", "content") VALUES
('SYSTEM', '系统初始化完成', 'SparkForge 数据库已创建，等待信号抓取...'),
('SIGNAL_DISCOVERED', '发现新信号', '已从 Product Hunt 和 Hacker News 发现首批创意信号');

-- ============================================
-- 验证创建结果
-- ============================================

SELECT 'Signal: ' || (SELECT COUNT(*) FROM "Signal") || ' rows' AS status
UNION ALL
SELECT 'ForgeProject: ' || (SELECT COUNT(*) FROM "ForgeProject") || ' rows' AS status
UNION ALL
SELECT 'CanvasReport: ' || (SELECT COUNT(*) FROM "CanvasReport") || ' rows' AS status
UNION ALL
SELECT 'LogEntry: ' || (SELECT COUNT(*) FROM "LogEntry") || ' rows' AS status
UNION ALL
SELECT 'UserSetting: ' || (SELECT COUNT(*) FROM "UserSetting") || ' rows' AS status;