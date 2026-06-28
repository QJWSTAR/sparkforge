# API Key 获取指南

## 已获取的 API Keys ✅

| API | 状态 | 用途 |
|-----|------|------|
| Supabase API Keys | ✅ | 数据库连接 |
| DeepSeek API Key | ✅ | LLM 评分 |
| MiMo API Key | ✅ | LLM 粗筛（低成本） |
| Vercel Token | ✅ | 自动部署 |
| Algolia API Key | ✅ | Hacker News 搜索 |

## 需要获取的 API Keys ❌

---

### 1. TRAE IDE API Key（高优先级）

**用途**：一键复刻功能（核心功能）

**获取方式**：
1. 登录 [TRAE 平台](https://www.trae.cn/)
2. 进入个人设置页面
3. 找到 "API Keys" 或 "开发者设置"
4. 创建新的 API Key

**注意**：
- TRAE IDE API Key 是一键复刻功能的核心依赖
- 如果 TRAE 平台暂未开放 API，可以考虑：
  - 使用 TRAE IDE 的 CLI 工具（命令行调用）
  - 暂时用 Mock 数据模拟复刻流程
  - 等待 TRAE 官方开放 API

---

### 2. Product Hunt API Key（中优先级）

**用途**：信号源抓取（Product Hunt 是重要信号源）

**获取方式**：
1. 访问 [Product Hunt API](https://api.producthunt.com/)
2. 点击 "Get Started" 或 "Apply for API Access"
3. 填写申请表单（需要描述用途）
4. 等待审核（通常 1-3 天）

**申请理由模板**：
```
项目名称：SparkForge - 创意信号雷达
项目描述：我们正在开发一个帮助独立开发者发现优质创意的平台，
        需要通过 Product Hunt API 获取最新的产品上线信息，
        用于帮助用户发现有潜力的创业方向。
用途：仅用于读取公开的产品数据，不涉及用户隐私
网站：https://sparkforge.vercel.app（开发中）
```

**替代方案**：
- 如果申请未通过，可以使用 Hacker News API（已获取 Algolia Key）
- 后续可以接入 GitHub Trending、V2EX 等其他信号源

---

### 3. Supabase 项目 URL 和完整 Keys

**当前状态**：已获取 `sb_secret_...`，但需要完整信息

**需要的信息**：
- `NEXT_PUBLIC_SUPABASE_URL`：项目 URL（格式：`https://xxx.supabase.co`）
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`：公开密钥
- `SUPABASE_SERVICE_ROLE_KEY`：服务端密钥（您提供的看起来是这个）

**获取方式**：
1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择或创建项目
3. 进入 "Project Settings" > "API"
4. 复制以下信息：
   - Project URL
   - anon public key
   - service_role key（注意：仅用于服务端）

---

### 4. Upstash Redis（可选）

**用途**：缓存、任务队列

**获取方式**：
1. 登录 [Upstash](https://upstash.com/)
2. 创建 Redis 数据库
3. 复制 `UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN`

**免费额度**：10,000 commands/day，足够初赛 Demo 使用

---

### 5. Stripe API Key（可选，后期需要）

**用途**：支付功能

**获取方式**：
1. 登录 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 进入 "Developers" > "API Keys"
3. 复制 Secret Key 和 Publishable Key

**注意**：可以先使用测试模式（Test Mode）

---

## 优先级排序

| 优先级 | API Key | 阻断程度 |
|--------|---------|----------|
| ⭐⭐⭐ | Supabase 完整信息 | 高（无法连接数据库） |
| ⭐⭐⭐ | TRAE IDE API Key | 高（核心功能阻断） |
| ⭐⭐ | Product Hunt API Key | 中（可先用 Hacker News） |
| ⭐ | Upstash Redis | 低（可后续添加） |
| ⭐ | Stripe API Key | 低（支付功能后期需要） |

---

## 建议行动

1. **立即**：登录 Supabase Dashboard，获取完整的项目 URL 和 anon key
2. **今天**：查看 TRAE 平台是否有 API Key 获取入口，如果没有考虑替代方案
3. **本周**：提交 Product Hunt API 申请
4. **开发过程中**：注册 Upstash Redis（免费层）

---

## 安全提醒

⚠️ **请勿在公开场合分享 API Keys**

- 所有 API Keys 应存储在 `.env.local` 文件中
- `.env.local` 文件不会被 Git 提交（已在 .gitignore 中）
- 在 Vercel 中配置环境变量时，使用加密存储