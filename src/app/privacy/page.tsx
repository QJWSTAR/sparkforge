import { Zap } from 'lucide-react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-ice-white">{title}</h2>
      <div className="rounded-lg p-6 bg-graphite border border-border-line">
        <div className="text-fog text-sm leading-relaxed">{children}</div>
      </div>
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-6 text-fog text-sm">
      {items.map((item, i) => (
        <li key={i} className="list-disc">{item}</li>
      ))}
    </ul>
  )
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ambient-glow py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <section className="mb-16">
          <h1 className="text-[32px] md:text-4xl font-bold mb-6 text-ice-white">隐私政策</h1>
          <p className="text-base text-fog">最后更新：2026年7月1日</p>
        </section>

        <Section title="引言">
          <p className="mb-4">
            SparkForge（&ldquo;我们&rdquo;、&ldquo;我方&rdquo;或&ldquo;本公司&rdquo;）致力于保护您的个人信息隐私和安全。本隐私政策解释了当您使用我们的网站和服务（统称&ldquo;服务&rdquo;）时，我们如何收集、使用、披露和保护您的信息。
          </p>
          <p>通过访问或使用我们的服务，您同意按照本政策收集和使用信息。如果您不同意本政策的任何部分，请不要使用我们的服务。</p>
        </Section>

        <Section title="信息收集">
          <h3 className="text-xl font-bold mb-4 text-ice-white">个人信息</h3>
          <p className="mb-4">当您注册账户或使用我们的服务时，我们可能会收集以下个人信息：</p>
          <List items={['电子邮箱地址', '用户名', '密码（加密）', '个人资料信息（姓名、简介、头像）', '使用偏好和设置']} />
          <div className="mt-6 pt-6 border-t border-border-line">
            <h3 className="text-xl font-bold mb-4 text-ice-white">使用数据</h3>
            <p className="mb-4">当您使用我们的服务时，我们会自动收集某些信息，包括：</p>
            <List items={['IP地址', '浏览器类型和版本', '访问的页面和停留时间', '设备信息（操作系统、设备类型）', '交互数据（点击、搜索、浏览的信号）', 'API使用统计']} />
          </div>
        </Section>

        <Section title="我们如何使用您的信息">
          <p className="mb-4">我们将收集的信息用于以下目的：</p>
          <ul className="space-y-3 pl-6">
            <li className="list-disc text-fog"><strong className="text-ice-white">提供和维护服务：</strong>运营和交付我们平台的功能，包括信号追踪、AI评分和MVP生成。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">改善用户体验：</strong>了解用户如何与我们的服务交互并进行改进。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">个性化：</strong>根据您的偏好定制内容、推荐和功能。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">沟通：</strong>向您发送关于账户的更新、新闻通讯和重要通知。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">安全：</strong>检测和防止欺诈、滥用和未经授权访问您的账户。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">分析：</strong>分析使用模式和趋势，用于研究和开发目的。</li>
          </ul>
        </Section>

        <Section title="数据安全">
          <p className="mb-4">我们采用行业标准的安全措施来保护您的个人信息免受未经授权的访问、披露、篡改或破坏。这些措施包括：</p>
          <List items={['传输中数据加密（HTTPS/TLS）', '静态敏感数据加密', '安全的身份验证和授权协议', '定期安全审计和漏洞评估', '访问控制，限制授权人员访问数据']} />
          <p className="mt-4">尽管我们努力保护您的信息，但互联网传输或电子存储的任何方法都不是完全安全的。因此，我们无法保证绝对安全。</p>
        </Section>

        <Section title="Cookie和追踪技术">
          <p className="mb-4">我们使用Cookie和类似的追踪技术来增强您在我们网站上的体验。这些技术帮助我们识别您的设备并记住您的偏好。</p>
          <h3 className="text-base font-bold mb-3 text-ice-white">我们使用的Cookie类型：</h3>
          <ul className="space-y-2 pl-6">
            <li className="list-disc text-fog"><strong className="text-ice-white">必要Cookie：</strong>服务基本功能所必需的。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">性能Cookie：</strong>帮助我们分析用户如何与我们的网站交互。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">功能Cookie：</strong>实现增强功能和个性化。</li>
          </ul>
          <p className="mt-4">您可以通过浏览器设置管理Cookie偏好。但是，禁用某些Cookie可能会影响我们服务的功能。</p>
        </Section>

        <Section title="您的权利">
          <p className="mb-4">根据您所在的位置，您可能拥有以下关于个人信息的权利：</p>
          <ul className="space-y-3 pl-6">
            <li className="list-disc text-fog"><strong className="text-ice-white">访问权：</strong>请求访问我们持有的您的个人信息。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">更正权：</strong>请求更正不准确或不完整的信息。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">删除权：</strong>请求删除您的个人信息（受适用法律约束）。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">数据可携权：</strong>请求以结构化、机器可读格式获取您的数据副本。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">拒绝权：</strong>拒绝营销通信或某些数据处理活动。</li>
          </ul>
          <p className="mt-4">如要行使上述任何权利，请使用下方提供的联系方式与我们联系。</p>
        </Section>

        <Section title="政策变更">
          <p className="mb-4">我们可能会不时更新本隐私政策，以反映我们实践或法律要求的变化。当我们进行更改时，我们会更新本政策顶部的&ldquo;最后更新&rdquo;日期。</p>
          <p className="mt-4">我们鼓励您定期查看本政策，以了解我们如何保护您的信息。在任何更改后继续使用我们的服务即表示您接受更新后的政策。</p>
        </Section>

        <Section title="联系我们">
          <p className="mb-4">如果您对本隐私政策或我们的数据实践有任何问题、疑虑或请求，请通过以下方式联系我们：</p>
          <div className="space-y-2 text-fog">
            <p>邮箱：privacy@sparkforge.dev</p>
            <p>GitHub：<a href="https://github.com/QJWSTAR/sparkforge" target="_blank" rel="noopener noreferrer" className="text-spark-blue hover:text-spark-blue-hover transition-colors">github.com/QJWSTAR/sparkforge</a></p>
          </div>
        </Section>

        <footer className="py-8 px-4 border-t border-border-line">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-spark-blue">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-ice-white">SparkForge</span>
                <span className="text-sm text-fog">&copy; 2026</span>
              </div>
              <span className="text-xs text-fog">Hosted on Cloudflare &middot; Vercel</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-fog">
              <a href="/privacy" className="hover:text-ice-white transition-colors">隐私政策</a>
              <a href="/terms" className="hover:text-ice-white transition-colors">服务条款</a>
              <a href="https://github.com/QJWSTAR/sparkforge/issues" target="_blank" rel="noopener noreferrer" className="hover:text-ice-white transition-colors">联系我们</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}