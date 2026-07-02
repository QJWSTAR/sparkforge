# SparkForge 冰焰版 — 设计系统技能文档

## 品牌故事

**"淡蓝色的思维火花"**

SparkForge 品牌定位为理性深度思考中迸发的灵感工具。从旧版"锻造火花"（暖橙 #FF6B35）全面迁移至冰焰版（冰蓝 #4DA8FF），传达冷静、精准、技术感。

冰焰版的核心设计理念是：在深空般沉静的暗色基底上，以冰蓝火花点亮关键交互节点。每一个视觉元素都服务于"专注力"——降低视觉噪音，让用户的注意力自然聚焦于数据和决策。

---

## Token 系统概览

### 色彩

6 个色组，每组 10 阶（50–900）：

| 色组 | 用途 | 主色 (400 阶) |
|------|------|---------------|
| spark-blue | 品牌主色，交互高亮 | #4DA8FF |
| nebula-purple | 辅助强调色 | #7B61FF |
| success | 成功/完成状态 | #22C55E |
| warning | 警告/提示状态 | #EAB308 |
| error | 错误/危险状态 | #EF4444 |
| deep-space | 深色基底系列（背景、表面、边框、文字） | — |

**语义别名**（通过 CSS 变量使用）：

- `--color-primary` / `--color-primary-hover` — 主色与悬停态
- `--color-accent` / `--color-accent-hover` — 辅助强调色
- `--color-background` — 页面背景（#0A0E14）
- `--color-surface` — 卡片/面板表面（#1C2128）
- `--color-surface-dim` — 沉降表面（#161B22）
- `--color-card` — 卡片背景
- `--color-border` — 边框色（#30363D）
- `--color-foreground` — 前景文字（#E8F4FF）
- `--color-on-surface` / `--color-on-surface-variant` — 表面文字 / 次要文字
- `--color-muted-foreground` — 弱化文字
- `--color-highlight` — 高亮色

### 排版

| 属性 | 值 |
|------|----|
| 正文 | Inter（回退: -apple-system, BlinkMacSystemFont, Segoe UI, Noto Sans SC） |
| 等宽 | JetBrains Mono（回退: Fira Code, SF Mono） |
| 字阶 | 12 / 13 / 14 / 16 / 20 / 24 / 32px |
| 字重 | 400 (regular) / 500 (medium) / 600 (semibold) / 700 (bold) |
| 行高 | 1.25 (tight) / 1.5 (normal) / 1.625 (relaxed) |

### 间距

基于 4px 栅格：4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48px

### 圆角

| 令牌 | 值 | 适用场景 |
|------|----|---------|
| --radius-button | 6px | 按钮、输入框 |
| --radius-card | 8px | 卡片容器 |
| --radius-modal | 12px | 模态框面板 |
| --radius-full | 9999px | 标签（药丸形）、头像（圆形） |

### 阴影

| 令牌 | 值 | 用途 |
|------|----|------|
| shadow-1 Subtle | 0px 1px 2px rgba(0,0,0,0.04) | 微妙层级 |
| shadow-2 Float | 0px 4px 16px rgba(77,168,255,0.08) | 浮动卡片（唯一使用阴影的场景） |

### 布局

- 最大内容宽度: 1280px
- 移动端断点: 768px
- 侧边栏宽度: 280px

---

## 组件使用指南

共 9 个组件，按类别分组。

### Button（按钮）

**3 变体 x 2 尺寸 = 6 种状态组合**

| 变体 | 适用场景 | 视觉特征 |
|------|---------|---------|
| Primary | 页面唯一主行动（CTA） | 冰蓝实心填充，深色文字 |
| Secondary | 次要操作、替代方案 | 透明背景 + 边框 |
| Ghost | 弱化操作、工具栏 | 无边框，仅文字 |

- 尺寸: md (40px 高) / lg (48px 高)
- 圆角统一 6px
- **设计原则: 每个页面/视图最多一个 Primary 按钮**

### Input（输入框）

- 表单文本输入
- 默认深色表面 + 边框
- Focus 态: 蓝色边框 + 外发光 (0 0 0 3px rgba(77,168,255,0.15))
- Error 态: 红色边框 + 红色外发光

### Select（下拉选择）

- 与 Input 视觉一致的基础样式
- 展开菜单使用深色面板 (#1C2128)
- 与 Input 共享 focus 发光效果
- 包含: 触发器、箭头图标、下拉菜单、菜单项

### Data Card（数据卡片）

- 数据指标展示（KPI、统计数字等）
- 左侧蓝色竖条作为视觉锚点
- 大号等宽数字提升可读性
- 包含: 左侧竖条、标签、数值

### Content Card（内容卡片）

- 通用内容容器
- 默认细边框 (#30363D)
- Hover 时边框变为品牌蓝 (#4DA8FF)
- 支持选中态（蓝色光晕环）

### Modal（模态框）

- 半透明遮罩覆盖层
- 居中弹出面板，圆角 12px
- 淡入淡出过渡动画
- 包含: 遮罩、容器、标题、内容区、关闭按钮

### Tag（标签）

- 药丸形状 (border-radius: 9999px)
- 3 种状态色变体:
  - **default** (蓝) — 常规标签
  - **success** (绿) — 成功/完成
  - **warning** (黄) — 警告/待处理
- 半透明背景 + 对应色彩文字

### Avatar（头像）

- 圆形，默认带 2px 边框
- 可选在线状态指示器（小圆点）
- Hover 时蓝色光环 (0 0 0 2px #4DA8FF)
- 3 尺寸: sm (32px) / md (40px) / lg (56px)

### Toggle（开关）

- 紧凑型滑动开关 (40x20px)
- Off 态: 深灰 (#30363D)
- On 态: 品牌蓝 (#4DA8FF)
- Disabled 态: opacity 0.5
- 包含: 轨道 (track)、滑块 (thumb)

---

## 状态交互规则

### 按钮

- **Hover**: Primary 背景变亮 (#4DA8FF -> #69B9FF)；Secondary 边框变蓝；Ghost 文字变蓝
- **Active**: `transform: scale(0.97)` 微缩反馈
- **Disabled**: `opacity: 0.4`

### 输入框 / 下拉选择

- **Focus**: 边框变蓝 + 外发光 `0 0 0 3px rgba(77,168,255,0.15)`
- **Error**: 边框变红 + 外发光 `0 0 0 3px rgba(239,68,68,0.15)`
- **Disabled**: `opacity: 0.4`

### 卡片

- **Hover**: 浮起 `translateY(-1px)` + 蓝色阴影
- **选中**: 蓝色光晕环 `0 0 0 1px rgba(77,168,255,0.3)`

### 标签

- **Hover**: 背景色加深
- **Active**: `transform: scale(0.95)` 微缩
- **Disabled**: `opacity: 0.4`

### 通用禁用

- 所有组件的禁用态统一使用 `opacity: 0.4` ~ `0.5`
- 禁止任何交互（pointer-events: none）
