# SparkForge 冰焰版 — 设计系统使用文档

## 快速开始

在 HTML 文件中引入 `colors_and_type.css` 即可使用全部设计令牌：

```html
<link rel="stylesheet" href="path/to/sparkforge-iceflame-v2/colors_and_type.css" />
```

引入后，所有 CSS 自定义属性（变量）将在 `:root` 上可用，直接在任意组件或自定义样式中引用即可。

---

## Token 变量索引

### 色彩

#### 主色 & 强调色

| 变量 | 值 | 说明 |
|------|----|------|
| `--color-primary` | `#4DA8FF` | 品牌主色（冰蓝） |
| `--color-primary-hover` | `#69B9FF` | 主色悬停态 |
| `--color-accent` | `#7B61FF` | 辅助强调色（星云紫） |
| `--color-accent-hover` | `#9179FF` | 强调色悬停态 |

#### 背景与表面

| 变量 | 值 | 说明 |
|------|----|------|
| `--color-background` | `#0A0E14` | 页面背景 |
| `--color-surface` | `#1C2128` | 卡片/面板表面 |
| `--color-surface-dim` | `#161B22` | 沉降表面 |
| `--color-card` | `#1C2128` | 卡片背景 |

#### 边框与前景

| 变量 | 值 | 说明 |
|------|----|------|
| `--color-border` | `#30363D` | 边框色 |
| `--color-outline` | `#30363D` | 轮廓线 |
| `--color-foreground` | `#E8F4FF` | 前景文字 |
| `--color-on-surface` | `#E8F4FF` | 表面文字 |
| `--color-on-surface-variant` | `#8B949E` | 次要文字 |
| `--color-muted-foreground` | `#6E7681` | 弱化文字 |
| `--color-highlight` | `#E8F4FF` | 高亮文字 |

#### 语义色

| 变量 | 值 | 说明 |
|------|----|------|
| `--color-success` | `#22C55E` | 成功 |
| `--color-warning` | `#EAB308` | 警告 |
| `--color-error` | `#EF4444` | 错误 |

#### 色阶组（spark-blue 为例，其他组结构相同: 50/100/200/300/400/500/600/700/800/900）

| 阶 | spark-blue | nebula-purple | deep-space |
|----|-----------|-------------|------------|
| 50 | `#F0F7FF` | `#F5F3FF` | `#8B949E` |
| 100 | `#DCEEFF` | `#EDE9FE` | `#6E7681` |
| 200 | `#B8D9FF` | `#DDD6FE` | `#484F58` |
| 300 | `#85BFFF` | `#C4B5FD` | `#30363D` |
| 400 | `#4DA8FF` | `#7B61FF` | `#21262D` |
| 500 | `#2D8AE0` | `#6D4DE8` | `#1C2128` |
| 600 | `#1F6FB8` | `#5B3AD0` | `#161B22` |
| 700 | `#1A5590` | `#4C2BA8` | `#0D1117` |
| 800 | `#153E6B` | `#3E2080` | `#0A0E14` |
| 900 | `#0E2A4A` | `#2E1660` | `#06080C` |

### 排版

#### 字体族

| 变量 | 值 |
|------|----|
| `--font-body` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans SC', sans-serif` |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', 'SF Mono', monospace` |

#### 字阶

| 变量 | 值 |
|------|----|
| `--font-size-xs` | `12px` |
| `--font-size-sm` | `13px` |
| `--font-size-base` | `14px` |
| `--font-size-md` | `16px` |
| `--font-size-lg` | `20px` |
| `--font-size-xl` | `24px` |
| `--font-size-2xl` | `32px` |

#### 字重

| 变量 | 值 |
|------|----|
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semibold` | `600` |
| `--font-weight-bold` | `700` |

#### 行高

| 变量 | 值 |
|------|----|
| `--line-height-tight` | `1.25` |
| `--line-height-normal` | `1.5` |
| `--line-height-relaxed` | `1.625` |

### 间距

| 变量 | 值 |
|------|----|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |

### 圆角

| 变量 | 值 | 说明 |
|------|----|------|
| `--radius-sm` | `4px` | 小圆角 |
| `--radius-button` | `6px` | 按钮 |
| `--radius-card` | `8px` | 卡片 |
| `--radius-modal` | `12px` | 模态框 |
| `--radius-lg` | `16px` | 大圆角 |
| `--radius-full` | `9999px` | 完全圆角（药丸/圆形） |

### 阴影

| 变量 | 值 | 说明 |
|------|----|------|
| `--shadow-1` (Subtle) | `0px 1px 2px rgba(0,0,0,0.04)` | 微妙层级 |
| `--shadow-2` (Float) | `0px 4px 16px rgba(77,168,255,0.08)` | 浮动卡片 |

### 尺寸

| 变量 | 值 | 说明 |
|------|----|------|
| `--size-button-md` | `40px` | 按钮中号高度 |
| `--size-button-lg` | `48px` | 按钮大号高度 |
| `--size-input-height` | `40px` | 输入框高度 |
| `--size-icon-sm` | `16px` | 小图标 |
| `--size-icon-md` | `20px` | 中图标 |
| `--size-icon-lg` | `24px` | 大图标 |
| `--size-avatar-sm` | `32px` | 小头像 |
| `--size-avatar-md` | `40px` | 中头像 |
| `--size-avatar-lg` | `56px` | 大头像 |
| `--sidebar-width` | `280px` | 侧边栏宽度 |

---

## 组件 API 参考

### Button

```html
<button class="btn btn-primary btn-md">主要按钮</button>
<button class="btn btn-primary btn-lg">主要按钮（大）</button>
<button class="btn btn-secondary btn-md">次要按钮</button>
<button class="btn btn-ghost btn-md">幽灵按钮</button>
```

- 变体: `btn-primary` / `btn-secondary` / `btn-ghost`
- 尺寸: `btn-md` (40px) / `btn-lg` (48px)
- 禁用: 添加 `disabled` 属性

### Input

```html
<input type="text" class="sf-input" placeholder="请输入..." />
<input type="text" class="sf-input sf-input-error" placeholder="错误状态" />
```

- 默认类: `sf-input`
- 错误态: `sf-input-error`
- 禁用: 添加 `disabled` 属性

### Select

```html
<div class="sf-select">
  <div class="sf-select-trigger">请选择...</div>
  <div class="sf-select-menu">
    <div class="sf-select-item">选项 A</div>
    <div class="sf-select-item">选项 B</div>
  </div>
</div>
```

- 触发器: `sf-select-trigger`
- 菜单: `sf-select-menu`
- 菜单项: `sf-select-item`

### Data Card

```html
<div class="sf-data-card">
  <div class="sf-data-card-value">1,234</div>
  <div class="sf-data-card-label">活跃用户</div>
</div>
```

- 容器: `sf-data-card`
- 数值: `sf-data-card-value`（使用等宽字体）
- 标签: `sf-data-card-label`

### Content Card

```html
<div class="sf-content-card">
  <div class="sf-content-card-title">卡片标题</div>
  <div class="sf-content-card-body">卡片内容...</div>
</div>
```

- 容器: `sf-content-card`
- 标题: `sf-content-card-title`
- 内容: `sf-content-card-body`

### Modal

```html
<div class="sf-modal-overlay">
  <div class="sf-modal">
    <div class="sf-modal-header">
      <h3 class="sf-modal-title">标题</h3>
      <button class="sf-modal-close">&times;</button>
    </div>
    <div class="sf-modal-content">内容...</div>
  </div>
</div>
```

- 遮罩: `sf-modal-overlay`
- 面板: `sf-modal`
- 标题区: `sf-modal-header` / `sf-modal-title`
- 关闭按钮: `sf-modal-close`
- 内容区: `sf-modal-content`

### Tag

```html
<span class="sf-tag">默认</span>
<span class="sf-tag sf-tag-success">成功</span>
<span class="sf-tag sf-tag-warning">警告</span>
```

- 默认: `sf-tag`
- 成功: `sf-tag sf-tag-success`
- 警告: `sf-tag sf-tag-warning`

### Avatar

```html
<div class="sf-avatar sf-avatar-md">
  <img src="avatar.jpg" alt="用户" />
  <span class="sf-avatar-status sf-avatar-status-online"></span>
</div>
```

- 尺寸: `sf-avatar-sm` (32px) / `sf-avatar-md` (40px) / `sf-avatar-lg` (56px)
- 在线状态: `sf-avatar-status-online`

### Toggle

```html
<button class="sf-toggle" role="switch" aria-checked="true">
  <span class="sf-toggle-thumb"></span>
</button>
```

- 容器: `sf-toggle`
- 滑块: `sf-toggle-thumb`
- 开启: `aria-checked="true"`
- 禁用: 添加 `disabled` 属性

---

## v1 -> v2 迁移对照表

从旧版"锻造火花"（暖橙色系）迁移至冰焰版（冰蓝色系），以下是需要更新的核心变量：

| 角色 | v1 (旧) | v2 (冰焰) |
|------|---------|----------|
| Primary | `#FF6B35` | `#4DA8FF` |
| Primary Hover | `#FF8555` | `#69B9FF` |
| Background | `#0B0D11` | `#0A0E14` |
| Surface | `#1A1D24` | `#1C2128` |
| Text (Foreground) | `#E8E8EC` | `#E8F4FF` |
| Text Secondary | `#9CA3AF` | `#8B949E` |
| Border | `rgba(255,255,255,0.08)` | `#30363D` |
| Success | `#10B981` | `#22C55E` |
| Warning | `#F59E0B` | `#EAB308` |
| Error | `#EF4444` | `#EF4444` (不变) |
| Shadow Float | `0 8px 24px rgba(0,0,0,0.12)` | `0px 4px 16px rgba(77,168,255,0.08)` |
| Max Width | `1200px` | `1280px` |
| Accent (新增) | — | `#7B61FF` |

### 迁移注意事项

1. **主色替换**: 所有 `#FF6B35` 及其变体需替换为 `#4DA8FF` 系列色阶
2. **边框标准化**: 旧版使用 `rgba(255,255,255,0.08)` 半透明边框，新版使用固定色值 `#30363D`，更可控
3. **阴影调整**: 旧版使用纯黑阴影，新版使用品牌蓝着色阴影，在深色背景上更自然
4. **新增 Accent**: `#7B61FF` 星云紫为 v2 新增，用于需要与主色区分的辅助强调场景
5. **文字色微调**: 前景文字从 `#E8E8EC` 调整为 `#E8F4FF`，带轻微蓝色调，与冰焰主题更协调
6. **布局扩展**: 最大宽度从 1200px 增至 1280px，适配更宽的屏幕
