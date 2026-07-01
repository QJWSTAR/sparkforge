# 中国大陆直连访问解决方案配置指南

## 项目背景
当前项目部署在 Vercel，域名：`sparkforge-blush.vercel.app`。由于 Vercel 在中国大陆无服务器节点，用户访问时需跨国际链路，导致延迟高、稳定性差。本方案提供两种实现中国大陆直连访问的配置方案。

---

## 方案一：Cloudflare 中国大陆网络优化方案

### 原理
Cloudflare 在中国香港、新加坡等亚太地区有节点，通过智能 DNS 解析和 Argo Smart Routing 优化国际链路，减少中国大陆用户访问延迟。

### 配置步骤

#### 1. 域名准备
- 注册一个自定义域名（如 `sparkforge.cn`）
- 在 Vercel 中添加自定义域名并完成验证

#### 2. Cloudflare 基础配置
```
登录 Cloudflare → 添加站点 → 输入域名 → 选择免费套餐
```

#### 3. DNS 设置
| 类型 | 名称 | 内容 | TTL | 代理状态 |
|------|------|------|-----|---------|
| CNAME | `www` | `sparkforge-blush.vercel.app` | Auto | ✅ 橙色云（开启代理） |
| CNAME | `@` | `sparkforge-blush.vercel.app` | Auto | ✅ 橙色云（开启代理） |

#### 4. SSL/TLS 配置
```
SSL/TLS → 概述 → SSL/TLS 加密模式 → 选择「完整」
SSL/TLS → 边缘证书 → 开启「始终使用 HTTPS」
SSL/TLS → 边缘证书 → 开启「TLS 1.3」
```

#### 5. Argo Smart Routing（关键优化）
```
网络 → Argo Smart Routing → 开启
```
- 免费版：每月 10GB 流量
- 付费版：$5/月 + $0.10/GB

#### 6. 缓存规则
```
缓存 → 缓存规则 → 创建规则

规则名称：SparkForge Static Cache
匹配条件：Hostname equals sparkforge.cn
缓存级别：缓存所有内容
边缘 TTL：30 分钟
浏览器 TTL：5 分钟
```

#### 7. 页面规则（Page Rules）
```
规则 1：www.sparkforge.cn/*
  → 始终使用 HTTPS
  → 缓存级别：标准
  → 浏览器缓存 TTL：4 小时

规则 2：sparkforge.cn/api/*
  → 缓存级别：绕过缓存
  → 始终使用 HTTPS
```

#### 8. 防火墙规则
```
防火墙 → WAF → 规则

规则名称：Allow API Access
匹配条件：URI contains /api/
动作：允许

规则名称：Rate Limit
匹配条件：所有请求
阈值：500 请求/5 分钟
动作：挑战
```

---

## 方案二：国内 CDN 反向代理 Vercel 方案

### 原理
使用阿里云/腾讯云 CDN 作为反向代理，将国内用户请求转发到 Vercel，通过 CDN 节点加速静态资源，API 请求走专线回源。

### 配置步骤（以阿里云 CDN 为例）

#### 1. 域名准备
- 注册国内可备案域名（如 `sparkforge.cn`）
- 完成 ICP 备案（约 5-20 个工作日）

#### 2. 添加 CDN 加速域名
```
阿里云 CDN → 域名管理 → 添加域名

域名：sparkforge.cn
源站类型：自定义源站
源站地址：sparkforge-blush.vercel.app
端口：443
协议：HTTPS
```

#### 3. 回源配置
```
回源设置 → 回源协议：HTTPS
回源设置 → 回源端口：443
回源设置 → 回源域名：sparkforge-blush.vercel.app
回源设置 → 开启「回源 SNI」
```

#### 4. 缓存规则配置
```
缓存规则 → 添加规则

规则 1：静态资源缓存
  路径：*.js, *.css, *.png, *.jpg, *.svg, *.ico
  缓存时间：30 天
  缓存策略：强制缓存

规则 2：API 请求不缓存
  路径：/api/*
  缓存时间：0 秒
  缓存策略：不缓存

规则 3：HTML 页面缓存
  路径：*.html
  缓存时间：5 分钟
  缓存策略：协商缓存
```

#### 5. HTTPS 配置
```
HTTPS 设置 → 证书管理 → 上传证书
  - 申请 Let's Encrypt 免费证书或购买阿里云证书
  - 开启「强制 HTTPS」
  - 开启「HTTP/2 协议」
```

#### 6. 安全防护
```
安全防护 → DDoS 防护 → 开启基础防护
安全防护 → WAF → 开启
安全防护 → 访问控制 → 设置 IP 黑名单/白名单
```

#### 7. DNS 设置
```
将域名 A 记录指向阿里云 CDN 分配的 CNAME 地址
```

#### 8. 腾讯云 CDN 配置差异
```
腾讯云 CDN → 添加加速域名

源站配置：
  源站类型：域名源
  源站地址：sparkforge-blush.vercel.app
  端口：443
  HTTPS 回源：开启

缓存配置：
  静态文件：30 天
  /api/*：不缓存
```

---

## 两种方案对比分析

### 配置复杂度

| 维度 | Cloudflare | 国内 CDN |
|------|-----------|---------|
| 步骤数量 | 8 步 | 8-10 步 |
| ICP 备案 | ❌ 不需要 | ✅ **必须**（5-20 天） |
| 技术难度 | 低 | 中 |
| 配置时间 | 1-2 小时 | 1-2 小时 + 备案时间 |

### 访问速度

| 地区 | Cloudflare (Argo) | 国内 CDN |
|------|------------------|---------|
| 北京 | 150-250ms | 30-80ms |
| 上海 | 120-200ms | 20-60ms |
| 广州 | 80-150ms | 20-50ms |
| 成都 | 200-300ms | 40-90ms |
| 平均 | **~160ms** | **~45ms** |

### 稳定性

| 维度 | Cloudflare | 国内 CDN |
|------|-----------|---------|
| 服务可用性 | 99.9% | 99.95% |
| 故障率 | 中（国际链路波动） | 低（国内链路稳定） |
| 回源稳定性 | 依赖国际链路 | 国内专线回源更稳定 |
| 抗 DDoS | 基础防护 | 专业防护 |

### 成本

| 项目 | Cloudflare | 国内 CDN |
|------|-----------|---------|
| 基础费用 | 免费 / Pro $20/月 | 备案免费 / CDN 按流量计费 |
| 流量费用 | 免费版 100GB/月<br>Pro 版 $0.10/GB | 阿里云：¥0.29-0.50/GB<br>腾讯云：¥0.26-0.46/GB |
| Argo 费用 | $5/月 + $0.10/GB | 无 |
| SSL 证书 | 免费 | 免费（Let's Encrypt） |
| **总成本（100GB/月）** | **$0-$25** | **¥29-50** |

### 维护难度

| 维度 | Cloudflare | 国内 CDN |
|------|-----------|---------|
| 日常管理 | 简单（一站式管理） | 中等（需管理 CDN + 源站） |
| 故障排查 | 中（国际链路问题难定位） | 简单（国内监控完善） |
| 缓存刷新 | 一键刷新 | 一键刷新 |
| 安全更新 | 自动 | 需手动配置 |

---

## 方案推荐

### 基于"配置便捷性"的推荐：**Cloudflare 方案**

**推荐理由：**

1. **无需 ICP 备案** - 节省 5-20 天备案时间，可快速上线
2. **配置简单** - 一站式管理，界面友好，适合非专业运维人员
3. **成本低** - 免费版即可满足基础需求
4. **无需国内服务器** - 省去服务器购买和运维成本
5. **快速上线** - 1-2 小时完成配置，立即生效

### 但需要注意的限制：

1. **延迟仍高于国内 CDN** - 平均 150-200ms vs 国内 CDN 的 30-80ms
2. **API 请求延迟较高** - 动态请求仍需走国际链路
3. **大文件下载体验一般** - 不适合大量静态资源分发

---

## Cloudflare 方案完整实施步骤

### 第一步：注册自定义域名
```bash
# 在阿里云/腾讯云注册域名（如 sparkforge.cn）
# 价格：约 ¥20-60/年
```

### 第二步：在 Vercel 中添加域名
```
Vercel Dashboard → Settings → Domains → Add
输入：sparkforge.cn
等待 DNS 验证
```

### 第三步：配置 Cloudflare
```bash
# 1. 登录 cloudflare.com
# 2. 添加站点：sparkforge.cn
# 3. 选择免费套餐
```

### 第四步：修改 DNS 解析
```
将域名的 Nameserver 修改为 Cloudflare 提供的 NS 记录
等待 DNS 生效（通常 5-30 分钟）
```

### 第五步：配置 SSL
```
SSL/TLS → 概述 → 加密模式：完整
SSL/TLS → 边缘证书 → 开启「始终使用 HTTPS」
```

### 第六步：开启 Argo Smart Routing（关键）
```
网络 → Argo Smart Routing → 开启
（免费版每月 10GB 流量）
```

### 第七步：配置缓存规则
```
缓存 → 缓存规则 → 创建规则

规则名称：Static Assets
匹配条件：Hostname equals sparkforge.cn AND File extension is one of (.js, .css, .png, .jpg, .svg)
缓存级别：缓存所有内容
边缘 TTL：86400 秒（24小时）

规则名称：API Bypass
匹配条件：URI contains /api/
缓存级别：绕过缓存
```

### 第八步：配置页面规则
```
页面规则 → 创建页面规则

规则 1：sparkforge.cn/*
  → 始终使用 HTTPS
  → 缓存级别：标准

规则 2：sparkforge.cn/api/*
  → 缓存级别：绕过缓存
```

### 第九步：验证配置

**1. 验证 DNS 解析**
```bash
nslookup sparkforge.cn
# 应返回 Cloudflare 的 IP 地址（104.x.x.x, 172.x.x.x 等）
```

**2. 验证 HTTPS**
```bash
curl -I https://sparkforge.cn
# 应返回 HTTP/2 200
# Server: cloudflare
```

**3. 验证访问速度**
```bash
# 使用 ping 测试延迟
ping sparkforge.cn

# 使用 curl 测试响应时间
curl -w "Total: %{time_total}s\n" -o /dev/null -s https://sparkforge.cn
```

**4. 验证 API 可用性**
```bash
curl https://sparkforge.cn/api/signals
# 应返回信号数据
```

### 第十步：部署验证
```bash
# 推送代码到 Vercel
git push origin main

# 等待部署完成后测试
curl https://sparkforge.cn
```

---

## 验证方法总结

| 验证项 | 方法 | 预期结果 |
|--------|------|---------|
| DNS 解析 | `nslookup sparkforge.cn` | 返回 Cloudflare IP |
| HTTPS 配置 | `curl -I https://sparkforge.cn` | HTTP/2 200, Server: cloudflare |
| 页面加载 | 浏览器访问 | 页面正常加载 |
| API 请求 | `curl https://sparkforge.cn/api/signals` | 返回 JSON 数据 |
| 延迟测试 | `ping sparkforge.cn` | < 250ms（中国大陆） |
| 缓存生效 | 查看响应头 | CF-Cache-Status: HIT/MISS |

---

## 注意事项

1. **Cloudflare 免费版有流量限制**（100GB/月），超出后需升级 Pro 版
2. **Argo Smart Routing 需手动开启**，免费版每月 10GB
3. **DNS 生效可能需要时间**（最多 24 小时），建议提前配置
4. **Vercel 域名验证**需等待 DNS 生效后才能完成
5. **HTTPS 证书**通常在 DNS 生效后自动颁发（约 10-30 分钟）