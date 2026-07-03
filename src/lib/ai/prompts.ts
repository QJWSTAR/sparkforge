/**
 * AI 提示词管理
 *
 * 所有 AI 提示词集中管理，便于版本控制、优化和审计。
 * 系统提示词定义角色、约束和输出质量标准。
 * 用户提示词仅包含任务数据和格式要求。
 */
import { sanitizeUserInput } from './deepseek';
import type { ScoringInput } from '@/lib/scoring';

// ============================================================
// 系统提示词 — 角色定义 + 行为约束 + 输出标准
// ============================================================

export const SCORING_SYSTEM_PROMPT = [
  '你是一个资深的产品分析师和连续创业者，专注于评估海外创意在中国市场的落地潜力。',
  '',
  '行为准则：',
  '- 基于数据和市场逻辑给出客观评分，不夸张、不贬低',
  '- 评分要有区分度，不全部给 50-70 的中间值',
  '- 列举具体、可验证的关键点，避免空泛描述',
  '- 如果创意明显缺乏差异化，新颖度应低于 40',
  '- 如果市场已被巨头垄断，本地化潜力应低于 30',
  '',
  '输出格式：严格 JSON，无其他文字。',
].join('\n');

export const CANVAS_SYSTEM_PROMPT = [
  '你是一个专业的商业分析师，专注于为初创项目生成完整、可执行的商业模型画布。',
  '',
  '行为准则：',
  '- 每个模块至少提供 2 条具体内容，不能为空',
  '- 客户细分要具体到人群画像，不是泛泛的"互联网用户"',
  '- 收入来源要具体到定价策略，如"月费 $9.99 的 SaaS 订阅"',
  '- 竞品分析要列出真实存在的竞争对手，不可虚构',
  '- SWOT 分析要有逻辑支撑，优势和劣势对应，机会和威胁对应',
  '- 行动计划要可执行，分阶段描述',
  '',
  '输出格式：严格 JSON，无其他文字。',
].join('\n');

export const FORGE_SYSTEM_PROMPT = [
  '你是一个资深的全栈开发工程师和产品架构师，专注于将创意转化为可执行的技术方案。',
  '',
  '行为准则：',
  '- 技术栈推荐要具体到版本号，如"Next.js 16 + React 19"',
  '- 项目结构要符合实际工程最佳实践，目录命名规范',
  '- 核心功能模块要列出具体的实现要点，不是功能描述',
  '- 本地化改造要针对中国市场的具体需求（支付、登录、合规等）',
  '- 如果用户指定了额外要求，必须在方案中明确体现',
  '- 预估时间要合理，考虑独立开发者的实际效率',
  '',
  '输出格式：严格 JSON，无其他文字。',
].join('\n');

// ============================================================
// 用户提示词 — 任务数据 + 输出格式
// ============================================================

export function buildScoringPrompt(input: ScoringInput): string {
  const title = sanitizeUserInput(input.title);
  const desc = sanitizeUserInput(input.description || '');
  const source = sanitizeUserInput(input.source);

  return [
    '请对以下创意信号进行深度评估评分（0-100分）。',
    '',
    '=== 创意信息 ===',
    `标题：${title}`,
    `描述：${desc || '无'}`,
    `来源平台：${source}`,
    `相关链接：${input.url || '无'}`,
    `标签：${input.tags?.join(', ') || '无'}`,
    `热度指数：${input.hotScore || 0}/100`,
    '',
    '=== 评分维度 ===',
    '1. 新颖度 noveltyScore (权重30%)：创意独特性、差异化程度、解决新痛点能力',
    '2. 商业潜力 businessScore (权重35%)：市场规模、付费意愿、商业模式清晰度、竞争壁垒',
    '3. 本地化潜力 localScore (权重35%)：中国市场需求匹配度、政策合规、本土化难度',
    '',
    '=== 输出 JSON 格式 ===',
    '{',
    '  "noveltyScore": 0-100,',
    '  "businessScore": 0-100,',
    '  "localScore": 0-100,',
    '  "finalScore": 0-100,',
    '  "summary": "100字以内的整体评估",',
    '  "keyPoints": ["核心优势", "主要风险", "本地化建议"]',
    '}',
  ].join('\n');
}

export function buildCanvasPrompt(params: {
  signalTitle: string;
  signalDescription?: string;
}): string {
  const title = sanitizeUserInput(params.signalTitle);
  const desc = sanitizeUserInput(params.signalDescription || '');

  return [
    '请为以下创意信号生成完整的商业分析画布。',
    '',
    '=== 创意信息 ===',
    `标题：${title}`,
    `描述：${desc || '无'}`,
    '',
    '=== 输出 JSON 格式 ===',
    '{',
    '  "valueProposition": "一句话定位",',
    '  "customerSegments": ["具体人群画像", ...],',
    '  "revenueStreams": ["具体收入来源", ...],',
    '  "keyPartners": ["合作伙伴", ...],',
    '  "keyActivities": ["关键活动", ...],',
    '  "keyResources": ["关键资源", ...],',
    '  "channels": ["获客渠道", ...],',
    '  "customerRelationships": ["客户关系策略", ...],',
    '  "costStructure": ["成本项", ...],',
    '  "competitiveAnalysis": [{"competitor":"名称","strengths":"优势","weaknesses":"劣势","opportunity":"机会"}],',
    '  "swot": {"strengths":[...],"weaknesses":[...],"opportunities":[...],"threats":[...]},',
    '  "actionPlan": ["Day 1-7: 第一阶段行动", "Day 8-14: 第二阶段行动"],',
    '  "summary": "商业分析总结"',
    '}',
  ].join('\n');
}

export function buildForgePrompt(params: {
  signalTitle: string;
  signalDescription?: string;
  language?: string;
  transformPoints?: string;
  customPrompt?: string;
}): string {
  const title = sanitizeUserInput(params.signalTitle);
  const desc = sanitizeUserInput(params.signalDescription || '');
  const lang = sanitizeUserInput(params.language || 'zh');
  const custom = sanitizeUserInput(params.customPrompt || '');

  const parts = [
    '请为以下创意信号生成完整的项目复刻方案。',
    '',
    '=== 创意信息 ===',
    `标题：${title}`,
    `描述：${desc || '无'}`,
    `目标语言：${lang}`,
  ];

  // 仅在有实际内容时添加
  if (params.transformPoints && params.transformPoints !== '无') {
    parts.push(`本地化改造点：${sanitizeUserInput(params.transformPoints)}`);
  }
  if (custom) {
    parts.push(`额外要求：${custom}`);
  }

  parts.push(
    '',
    '=== 输出 JSON 格式 ===',
    '{',
    '  "techStack": "推荐技术栈",',
    '  "projectStructure": ["src/", "  components/", ...],',
    '  "coreFeatures": [{ "name":"功能","description":"描述","implementation":"实现要点" }],',
    '  "localizationPlan": ["本地化改造措施", ...],',
    '  "estimatedTime": "预估开发时间",',
    '  "difficulty": "简单|中等|困难",',
    '  "summary": "项目方案总结"',
    '}',
  );

  return parts.join('\n');
}