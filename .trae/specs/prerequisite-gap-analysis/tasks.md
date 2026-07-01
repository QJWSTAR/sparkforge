# SparkForge 初赛提交 - 工作步骤清单

## 优先级说明
- **P0（阻塞）**: 不完成则无法提交初赛
- **P1（必要）**: 评审维度必需，直接影响得分
- **P2（加分）**: 提升竞争力，非必须但建议完成

---

## [x] Task 1: 确认报名状态和赛道选择（P0）
- **Priority**: P0 - 阻塞
- **Depends On**: None
- **Description**: 
  - 确认 TRAE 社区报名帖审核是否通过
  - 确认报名时选择的赛道（生活娱乐/学习工作/社会服务/硬件交互）
  - 获取报名帖链接（用于 Demo 帖引用）
- **Acceptance Criteria Addressed**: FR-6
- **Test Requirements**:
  - `human-judgment` TR-1.1: 报名审核状态确认 ✅ 已通过
  - `human-judgment` TR-1.2: 赛道标签确定 ✅ 学习工作
  - `human-judgment` TR-1.3: 报名帖链接可访问 🔴 待填写
- **预估时间**: 10分钟
- **Notes**: 报名已通过，赛道为学习工作。报名帖链接待补充

## [x] Task 2: Vercel 部署配置（P0）
- **Priority**: P0 - 阻塞
- **Depends On**: Task 1
- **Description**: 
  - 在 Vercel 控制台配置 7 个环境变量
  - 触发重新部署，确保构建成功
  - 获取公开可访问的体验链接
  - 验证核心功能可用（信号浏览、评分、详情页）
- **Acceptance Criteria Addressed**: AC-1, AC-5
- **Test Requirements**:
  - `programmatic` TR-2.1: Vercel 部署成功，无构建错误 ✅
  - `programmatic` TR-2.2: 体验链接可公开访问 ✅ https://sparkforge-blush.vercel.app/
  - `programmatic` TR-2.3: 首页展示真实信号数据 ✅ 已验证
  - `programmatic` TR-2.4: /radar 页面正常浏览 ✅
  - `programmatic` TR-2.5: 信号详情页正常展示 ✅
- **环境变量清单**:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - DEEPSEEK_API_KEY
  - PRODUCTHUNT_ACCESS_TOKEN
  - ALGOLIA_API_KEY
  - CRON_API_KEY
- **预估时间**: 15-30分钟

## [ ] Task 3: 推送代码到 GitHub（P0）
- **Priority**: P0 - 阻塞
- **Depends On**: None
- **Description**: 
  - 将本地所有 commit 推送到 GitHub 远程仓库
  - 确保仓库为公开状态（评审需查看代码）
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-3.1: git push 成功
  - `programmatic` TR-3.2: GitHub 仓库可公开访问
- **预估时间**: 5分钟

## [x] Task 4: Session ID 收集与整理（P1）
- **Priority**: P1 - 必要
- **Depends On**: None
- **Description**: 
  - 从 TRAE IDE 对话记录中提取关键 Session ID
  - 至少 3 个，覆盖关键节点
  - 记录每个 Session ID 对应的开发内容简述
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-4.1: 收集 ≥3 个 Session ID ✅ 5个
  - `human-judgment` TR-4.2: 每个 Session ID 有对应开发内容说明 ✅
  - `human-judgment` TR-4.3: Session ID 覆盖不同开发阶段 ✅
- **预估时间**: 15-20分钟
- **Notes**: 用户需自行在 TRAE IDE 中双击对话头像复制 Session ID

## [x] Task 5: 开发截图准备（P1）
- **Priority**: P1 - 必要
- **Depends On**: Task 2
- **Description**: 
  - 截取至少 3 张开发关键步骤截图
  - 截图已存放于项目 image/ 文件夹
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgment` TR-5.1: 截图 ≥3 张 ✅ 5张
  - `human-judgment` TR-5.2: 截图清晰展示 TRAE 开发过程 ✅
  - `human-judgment` TR-5.3: 截图包含产品界面展示 ✅
- **预估时间**: 15分钟

## [x] Task 6: 撰写初赛 Demo 帖（P1）
- **Priority**: P1 - 必要
- **Depends On**: Task 1, 2, 4, 5
- **Description**: 
  - 按官方模板撰写 Demo 帖 ✅ 已生成 demo-post.md
  - 包含简介、创作思路、体验地址、实践过程、截图、Session ID
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgment` TR-6.1: 帖子包含所有必需部分 ✅
  - `human-judgment` TR-6.2: 标签正确 ✅ 学习工作
  - `human-judgment` TR-6.3: 体验链接可正常访问 ✅
  - `human-judgment` TR-6.4: 截图清晰可见 ✅
  - `human-judgment` TR-6.5: Session ID 完整列出 ✅
  - `human-judgment` TR-6.6: 语言流畅，逻辑清晰 ✅
- **预估时间**: 30-45分钟

## [ ] Task 7: 最终验证（P0）
- **Priority**: P0 - 阻塞
- **Depends On**: Task 2, 3, 6
- **Description**: 
  - 验证体验链接能从不同设备/网络访问
  - 验证核心功能路径完整可用
  - 确认 Demo 帖所有链接有效
  - 确认报名帖链接正确
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `programmatic` TR-7.1: 从外部网络访问体验链接正常
  - `programmatic` TR-7.2: 信号数据正常展示
  - `programmatic` TR-7.3: Demo 帖中所有链接有效
- **预估时间**: 10分钟

---

# Task Dependencies

```
Task 1 (报名确认) ──┐
                    ├──→ Task 6 (撰写Demo帖) ──→ Task 7 (最终验证)
Task 3 (推送代码) ──┤
                    │
Task 2 (Vercel部署)─┤
                    │
Task 4 (Session ID)─┤
                    │
Task 5 (截图准备) ──┘
```

- Task 1, 3, 4 可并行执行
- Task 2 依赖 Task 3（代码需先推送）
- Task 5 依赖 Task 2（需部署后的界面截图）
- Task 6 依赖 Task 1, 2, 4, 5
- Task 7 依赖 Task 2, 3, 6

## 总预估时间
- P0 任务: 约 30-45 分钟
- P1 任务: 约 60-80 分钟
- **总计**: 约 90-120 分钟（不含等待时间）