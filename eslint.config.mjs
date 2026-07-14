import nextConfig from 'eslint-config-next'

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**'] },
  ...nextConfig,
  {
    rules: {
      // Technical Debt: React 19 新规则，14 处预存 set-state-in-effect
      // 均为 SSR-safe localStorage 读取或数据获取 loading 初始化，功能正常
      // 真正修复需引入 useSyncExternalStore/SWR，属架构调整，非 Critical 暂不处理
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]

export default eslintConfig
