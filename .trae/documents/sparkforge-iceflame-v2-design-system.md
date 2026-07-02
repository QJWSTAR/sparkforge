# SparkForge 冰焰版 Design System v2 实施计划

## 概述

为 SparkForge 创建全新"冰焰版"设计系统 v2，品牌灵魂从"锻造火花（暖橙 #FF6B35）"全面迁移至"淡蓝色的思维火花（冰蓝 #4DA8FF）"。交付三件套：设计令牌系统、新品牌 Logo、UI 核心组件库（含开发规格表）。

## 当前状态

| 资产 | 路径 | 状态 |
|------|------|------|
| 旧版 Token CSS | `sparkforge-dashboard-design/colors_and_type.css` | 暖橙色 #FF6B35，需完全替换 |
| 旧版 .design 项目 | `sparkforge-dashboard-design/` | 2 页面（仪表板+详情），引用旧 token |
| 旧版 Logo | `sparkforge-logo/` + 临时工作目录 | 暖橙色风格，非冰焰版 |
| css-to-json 脚本 | 技能内置 `scripts/css-to-json.mjs` | 可用 |
| 验证脚本 | 技能内置 `scripts/validate-design-library-output.mjs` | 可用 |

## 路线选择

`create-from-scratch` — 用户提供结构化 Token 规格，无 bundle 上传。

## 实施步骤

### Step 1: Token 系统 (colors_and_type.css + css.json)

**输出目录**: `sparkforge/.design_library/sparkforge-iceflame-v2/`

生成 `colors_and_type.css`，包含：

**色系** (以用户指定值为锚点，衍生完整色阶):
- 主色阶: #4DA8FF (思维火花蓝) → 10 阶 50-900
- 强调色阶: #7B61FF (星云紫) → 10 阶
- 状态色: #22C55E (成功) / #EAB308 (警示) / #EF4444 (错误) → 各 10 阶
- 表面色阶: #0A0E14 (深空黑) / #1C2128 (石墨灰) / #8B949E (雾灰) / #E8F4FF (冰芯白) / #30363D (边界色)

**语义别名层**:
- `--color-primary: var(--primary-400)` (→ #4DA8FF)
- `--color-primary-hover: #69B9FF`
- `--color-background: var(--bg-base)` (→ #0A0E14)
- `--color-surface: var(--bg-elevated)` (→ #1C2128)
- `--color-text: #E8F4FF`
- `--color-text-secondary: #8B949E`
- `--color-border: #30363D`
- `--color-accent: var(--accent-400)` (→ #7B61FF)

**排版**:
- `--font-sans: Inter` + `--font-mono: JetBrains Mono`
- 字阶: 12/13/14/16/20/24/32px
- 字重: 400/500/600/700（禁用 ExtraBold）
- 行高: 1.5

**空间与形状**:
- 栅格: 4px 基础 (--space-1 到 --space-12)
- 圆角: --radius-button 6px, --radius-card 8px, --radius-modal 12px, --radius-icon 9999px
- 阴影: --shadow-float 0px 4px 16px rgba(77,168,255,0.08)（仅浮动卡片）
- 氛围光: --atmosphere-glow radial-gradient(600px at 50% 30%, rgba(77,168,255,0.04), transparent)

**布局**:
- --content-max-width: 1280px
- --mobile-breakpoint: 768px

**标记**: `/* @dark-only */` — 用户仅定义深色主题，浅色后续通过 refine 添加。

生成后运行 `css-to-json.mjs` 确定性派生 `css.json`。

### Step 2: Logo 生成 (8 张图)

**并行于 Step 3 执行**

使用 AI 图片生成工具，输出到 `sparkforge/sparkforge-logo-v2/`。

三个设计方向:

| # | 概念 | 描述 |
|---|------|------|
| 1 | 突触火花 (Synapse Spark) | 极小冰芯白光点向外不对称扩散 3-4 条分叉，像神经元树突 + 火花溅射 + 花括号抽象 |
| 2 | 火花脑 (Spark Brain) | 六边形一角爆出火花 |
| 3 | 括号火花 (Bracket Spark) | 两个花括号相向，中间空隙形成火花 |

**配色**: 仅 #4DA8FF / #E8F4FF / #0A0E14
**风格**: 极简几何矢量，无复杂渐变，不卡通

8 张图片:
- concept1-synapse-dark.jpg / concept1-synapse-light.jpg
- concept2-brain-dark.jpg / concept2-brain-light.jpg
- concept3-bracket-dark.jpg / concept3-bracket-light.jpg
- horizontal-dark.jpg / horizontal-light.jpg (推荐方案 + "SparkForge" 水平组合)

### Step 3: 组件 JSON 定义 (9 个组件)

**并行于 Step 2 执行**

输出到 `sparkforge/.design_library/sparkforge-iceflame-v2/components/`

| Slug | 名称 | 状态维度 |
|------|------|---------|
| button | 按钮 (Primary/Secondary/Ghost × md/lg) | default, hover, active, disabled |
| input | 输入框 | default, focus, error, disabled |
| select | 下拉选择框 | default, focus, open, disabled |
| data-card | 数据指标卡片 | default, hover, selected, disabled |
| content-card | 普通内容卡片 | default, hover, selected, disabled |
| modal | 模态框 | closed, open, opening, closing |
| tag | 标签/徽章 | default, hover, active, disabled |
| avatar | 头像 | default, hover, online, group |
| toggle | 开关 | off, on, disabled-off, disabled-on |

每个组件 JSON 包含完整的 4 状态 dev spec:
- 背景色 / 文字色 / 边框 / 阴影 / 变换 / 内外边距 / 尺寸
- 按钮需区分 Primary/Secondary/Ghost × md(h-10)/lg(h-12)
- 数据卡片: 左侧 3px #4DA8FF 竖条，标签 12px 雾灰，数字 32px JetBrains Mono
- 模态框: 标题 + 内容区 + 底部按钮组 + 半透明遮罩
- 标签: 成功(#22C55E)/警告(#EAB308)/默认(#30363D)

### Step 4: Logo 展示页

生成 `sparkforge/sparkforge-logo-v2/index.html`，使用冰焰版 Token 配色展示 3 个 Logo 概念 + 水平锁标。

### Step 5: 组件预览 HTML (9 个页面)

分 3 批次由子代理并行生成:

- **Batch 1**: button, input, select
- **Batch 2**: data-card, content-card, modal
- **Batch 3**: tag, avatar, toggle

每个预览页:
- 通过 `<link>` 引用 `../colors_and_type.css`
- 展示全部 4 状态
- 包含 dev spec 表格
- body 背景 #0A0E14 + 氛围光晕

### Step 6: 文档生成 (SKILL.md + README.md)

并行生成:
- **SKILL.md**: 品牌故事、Token 系统概览、组件使用指南、状态交互规则
- **README.md**: 快速开始、Token 变量索引、组件 API 参考、v1→v2 迁移色值对照表

### Step 7: UIKit 组装

1. 生成 `uikit-plan.json`
2. 子代理生成 `ui_kits/dashboard/index.html` — 交互式 React 18 展示页
3. 包含: 品牌展示区 + Token 色板 + 9 个组件 Playground + 状态切换

### Step 8: 验证

运行 `validate-design-library-output.mjs`，确保:
- css.json 存在且包含 6 个顶级键
- 9 个组件 JSON + 9 个预览 HTML 存在
- 预览 HTML 均通过 `<link>` 引用 Token CSS
- SKILL.md / README.md / uikit-plan.json 存在
- UIKit HTML 存在

## 假设与决策

1. **深色专一**: 用户仅定义深色方案，CSS 标记 `@dark-only`，浅色后续 refine 添加
2. **色阶衍生**: 以用户指定的 8 个精确色值为锚点，AI 衍生完整 10 阶色阶，保持色相一致性
3. **氛围光 Token**: 使用专用 `--atmosphere-glow` 变量存储渐变值，同时提供 `--glow-primary: rgba(77,168,255,0.04)` 供 css.json 识别
4. **独立输出**: v2 设计系统输出到 `.design_library/sparkforge-iceflame-v2/`，不影响旧版 dashboard-design 项目
5. **Logo 独立**: Logo 输出到 `sparkforge-logo-v2/`，与设计系统目录分开
6. **用户明确指定按钮包含 md/lg 两种尺寸**: 按钮组件 JSON 需包含 size 维度 (md=h10, lg=h12)
7. **下拉选择框**: 用户要求展示展开状态的菜单样式，select 组件 JSON 需包含 open 状态的菜单面板定义

## v1 → v2 Token 迁移对照

| 角色 | v1 (旧) | v2 (冰焰) |
|------|---------|----------|
| Primary | #FF6B35 | #4DA8FF |
| Background | #0B0D11 | #0A0E14 |
| Surface | #1A1D24 | #1C2128 |
| Text | #E8E8EC | #E8F4FF |
| Text Secondary | #9CA3AF | #8B949E |
| Border | rgba(255,255,255,0.08) | #30363D |
| Success | #10B981 | #22C55E |
| Warning | #F59E0B | #EAB308 |
| Shadow Float | 0 8px 24px rgba(0,0,0,0.12) | 0px 4px 16px rgba(77,168,255,0.08) |
| Max Width | 1200px | 1280px |
| Radius Button | 4px | 6px |
| Accent (新增) | — | #7B61FF |

## 验证步骤

1. `css-to-json.mjs` 生成 css.json 成功
2. 9 个 `components/*.json` 通过结构校验
3. 9 个 `preview/*.html` 通过外部 CSS 引用校验
4. `validate-design-library-output.mjs` 全部检查通过
5. Logo 8 张图片 + 展示页可访问
6. UIKit HTML 在浏览器中可交互
