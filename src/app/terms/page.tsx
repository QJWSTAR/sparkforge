import { Zap } from 'lucide-react'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ambient-glow py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <section className="mb-16">
          <h1 className="text-[32px] md:text-4xl font-bold mb-6 text-ice-white">
            服务条款
          </h1>
          <p className="text-base text-fog">最后更新：2026年7月1日</p>
        </section>

        <Section title="引言">
          <p className="mb-4">
            欢迎使用SparkForge（&ldquo;我们&rdquo;、&ldquo;我方&rdquo;或&ldquo;本公司&rdquo;）。本服务条款（&ldquo;条款&rdquo;）管辖您对我们网站、应用程序、API和服务（统称&ldquo;服务&rdquo;）的访问和使用。
          </p>
          <p>在使用我们的服务之前，请仔细阅读本条款。通过访问或使用我们的服务，您同意受本条款和我们的隐私政策约束。如果您不同意本条款，请不要使用我们的服务。</p>
        </Section>

        <Section title="条款接受">
          <p className="mb-4">使用我们的服务必须年满18岁。通过使用我们的服务，您声明并保证：</p>
          <TermsList items={['您年满18岁', '您有法律能力签署本条款', '您有权、有授权并有能力使用我们的服务', '您使用我们的服务不违反任何适用法律或法规']} />
        </Section>

        <Section title="服务描述">
          <p className="mb-4">SparkForge提供一个平台，用于发现创意信号、分析趋势，并使用AI生成MVP（最小可行产品）代码。我们的服务包括但不限于：</p>
          <ul className="space-y-3 pl-6">
            <li className="list-disc text-fog"><strong className="text-ice-white">信号雷达：</strong>一个用于发现和追踪网络上创意信号和趋势的工具。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">AI评分：</strong>基于热度、新颖性、商业潜力和本地相关性等多个维度对信号进行自动化分析和评分。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">锻造：</strong>基于信号分析的AI驱动MVP代码和原型生成。</li>
            <li className="list-disc text-fog"><strong className="text-ice-white">画布：</strong>用于组织和管理信号及生成项目的工作空间。</li>
          </ul>
          <p className="mt-4">我们保留随时修改、暂停或终止我们服务任何部分的权利，恕不另行通知。</p>
        </Section>

        <Section title="用户账户">
          <p className="mb-4">要访问我们服务的某些功能，您可能需要创建账户。创建账户时，您同意：</p>
          <TermsList items={['提供准确、最新和完整的信息', '维护密码安全', '根据需要更新账户信息', '对您账户下发生的所有活动负全部责任']} />
          <p className="mt-4">您同意在发现账户未授权使用或任何其他安全漏洞时立即通知我们。我们不对因账户未授权访问造成的任何损失负责。</p>
        </Section>

        <Section title="用户责任">
          <p className="mb-4">作为我们服务的用户，您同意：</p>
          <TermsList items={['在使用我们的服务时遵守所有适用法律和法规', '尊重其他用户的权利和隐私', '不干扰或破坏我们的服务或服务器', '不尝试获取对我们系统的未授权访问', '仅将我们的服务用于合法目的', '提供真实准确的信息']} />
        </Section>

        <Section title="禁止使用">
          <p className="mb-4">您严禁：</p>
          <TermsList items={['使用我们的服务生成或分发有害、非法或侵权内容', '使用我们的服务进行网络钓鱼、垃圾邮件或其他恶意活动', '尝试逆向工程、反编译或入侵我们的系统', '使用我们的服务创建深度伪造或误导性内容', '侵犯任何知识产权', '滥用我们的API或超出合理使用限制', '骚扰、威胁或伤害其他用户']} />
        </Section>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-ice-white">AI生成内容免责声明</h2>
          <div className="rounded-lg p-6 bg-graphite border-2 border-ui-warning">
            <p className="mb-4 text-ui-warning text-base font-semibold">关于AI生成内容的重要通知</p>
            <p className="mb-4 text-fog">我们的服务使用人工智能生成内容，包括代码、文本和其他材料。您承认并同意：</p>
            <ul className="space-y-3 pl-6">
              <li className="list-disc text-fog"><strong className="text-ice-white">准确性：</strong>AI生成的内容可能包含错误、不准确或误导性信息。您对通过我们服务生成的任何内容的验证和审查负全部责任。</li>
              <li className="list-disc text-fog"><strong className="text-ice-white">原创性：</strong>尽管我们努力确保原创性，但AI生成的内容可能无意中包含受版权保护的材料或与现有作品相似。您对确保使用的任何内容符合知识产权法律负全部责任。</li>
              <li className="list-disc text-fog"><strong className="text-ice-white">质量：</strong>AI生成内容的质量参差不齐，无法保证。通过我们服务生成的代码可能不适合生产环境，可能需要大量修改。</li>
              <li className="list-disc text-fog"><strong className="text-ice-white">责任：</strong>我们不对因您使用AI生成内容而产生的任何损害、损失或索赔负责，包括但不限于知识产权纠纷、错误或安全漏洞。</li>
              <li className="list-disc text-fog"><strong className="text-ice-white">合规性：</strong>您负责确保AI生成内容符合所有适用法律、法规和道德标准，包括与数据隐私、版权和合理使用相关的标准。</li>
            </ul>
            <p className="mt-4 text-fog">通过使用我们的AI功能，您承认AI生成内容按&ldquo;原样&rdquo;提供，您承担使用它的所有风险。</p>
          </div>
        </div>

        <Section title="知识产权">
          <p className="mb-4">我们服务中的所有知识产权，包括但不限于软件、代码、设计、标志、商标和内容，均归SparkForge或我们的授权方所有。这些权利受版权、商标和其他知识产权法律保护。</p>
          <p className="mb-4">您被授予有限、非排他、不可转让的许可，根据本条款为您的个人或商业目的使用我们的服务。您不得：</p>
          <TermsList items={['复制、修改或分发我们的服务', '逆向工程或反编译我们的软件', '未经许可使用我们的商标或标志', '删除或更改任何版权或专有通知']} />
          <p className="mt-4">您保留通过我们服务提交或生成的任何内容的所有权，前提是此类内容不侵犯我们的知识产权。</p>
        </Section>

        <Section title="终止">
          <p className="mb-4">我们可以随时终止或暂停您对我们服务的访问，无需事先通知或承担责任，原因包括但不限于：</p>
          <TermsList items={['违反本条款', '非法或未授权使用我们的服务', '未支付任何适用费用', '安全问题或可疑活动']} />
          <p className="mt-4">您可以随时通过账户设置中的说明终止账户。终止后，您使用我们服务的权利将立即停止。我们可能会根据法律要求在合理期限内保留您的数据。</p>
        </Section>

        <Section title="免责声明">
          <p className="mb-4">我们的服务按&ldquo;原样&rdquo;和&ldquo;可用&rdquo;基础提供。我们不提供任何明示或暗示的保证，包括但不限于：</p>
          <TermsList items={['适销性或特定用途适用性的保证', '关于我们服务准确性、完整性或可靠性的保证', '关于我们服务可用性或不间断使用的保证', '关于我们服务安全性的保证']} />
          <p className="mt-4">我们不保证我们的服务会满足您的要求或任何错误会被纠正。</p>
        </Section>

        <Section title="责任限制">
          <p className="mb-4">在任何情况下，SparkForge或其附属公司、董事、高级职员、员工或代理人均不对任何直接、间接、附带、特殊、后果性或惩罚性损害负责，包括但不限于：</p>
          <TermsList items={['利润、收入或数据损失', '业务中断', '人身伤害或财产损失', '因您使用我们服务而产生的任何其他损害']} />
          <p className="mt-4">本责任限制适用于任何责任理论，无论是合同、侵权、严格责任还是其他，即使我们已被告知此类损害的可能性。</p>
          <p className="mt-4">在法律不允许责任限制的司法管辖区，我们的全部责任不应超过您在索赔前12个月内为我们服务支付的金额。</p>
        </Section>

        <Section title="赔偿">
          <p className="mb-4">您同意赔偿、辩护并使SparkForge及其附属公司、董事、高级职员、员工和代理人免受任何索赔、责任、损害、损失、成本或费用（包括合理的律师费），这些索赔源于：</p>
          <TermsList items={['您使用我们的服务', '您违反本条款', '您违反任何适用法律或法规', '您通过我们服务提交或生成的任何内容', '任何声称您使用我们服务侵犯第三方权利的索赔']} />
        </Section>

        <Section title="适用法律">
          <p className="mb-4">本条款应根据美国加利福尼亚州法律管辖和解释，不考虑其法律冲突原则。</p>
          <p className="mt-4">因本条款引起或与本条款相关的任何争议应在加利福尼亚州旧金山县的州法院和联邦法院解决。</p>
        </Section>

        <Section title="条款变更">
          <p className="mb-4">我们可能会不时更新本条款，以反映我们实践或法律要求的变化。当我们进行更改时，我们会更新本条款顶部的&ldquo;最后更新&rdquo;日期。</p>
          <p className="mt-4">我们鼓励您定期查看本条款，以了解我们的政策。在任何更改后继续使用我们的服务即表示您接受更新后的条款。</p>
        </Section>

        <Section title="联系信息">
          <p className="mb-4">如果您对本条款有任何问题、疑虑或请求，请通过以下方式联系我们：</p>
          <div className="space-y-2 text-fog">
            <p>邮箱：terms@sparkforge.dev</p>
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

/* ── Reusable sub-components ── */

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

function TermsList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-6 text-fog text-sm">
      {items.map((item, i) => (
        <li key={i} className="list-disc">{item}</li>
      ))}
    </ul>
  )
}