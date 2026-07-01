import Link from 'next/link'

const techStack = [
  {
    name: 'Next.js',
    icon: '⚛️',
    color: 'rgba(0, 0, 0, 0.8)',
    bgColor: 'rgba(0, 0, 0, 0.12)',
    description: 'Full-stack React framework with App Router, Server Components, and Edge Runtime for optimal performance.',
    features: ['App Router', 'Server Components', 'Edge Functions', 'Static Generation'],
  },
  {
    name: 'Supabase',
    icon: '🛢️',
    color: '#3ECF8E',
    bgColor: 'rgba(62, 207, 142, 0.12)',
    description: 'Open-source Firebase alternative providing PostgreSQL database, authentication, and real-time subscriptions.',
    features: ['PostgreSQL', 'Auth', 'Real-time', 'Storage'],
  },
  {
    name: 'Cloudflare',
    icon: '☁️',
    color: '#F38020',
    bgColor: 'rgba(243, 128, 32, 0.12)',
    description: 'Global edge network for CDN, caching, and serverless functions with 300+ data centers worldwide.',
    features: ['CDN', 'Workers', 'KV Store', 'Zero Trust'],
  },
  {
    name: 'Vercel',
    icon: '▲',
    color: '#000000',
    bgColor: 'rgba(0, 0, 0, 0.12)',
    description: 'Frontend cloud platform with automatic deployments, preview environments, and Edge Network.',
    features: ['Git Integration', 'Preview Deployments', 'Edge Network', 'Analytics'],
  },
]

const features = [
  {
    icon: '📡',
    title: 'Creative Radar',
    description: '7×24 real-time monitoring of 9+ signal sources including Product Hunt, Hacker News, and more.',
  },
  {
    icon: '🔥',
    title: 'Forge Workshop',
    description: 'One-click MVP generation using TRAE IDE. Configure tech stack, custom prompts, and get results in 30 seconds.',
  },
  {
    icon: '📋',
    title: 'Business Canvas',
    description: 'Generate complete business models from signals. One-sentence positioning, user personas, competitor analysis.',
  },
  {
    icon: '📺',
    title: 'Public Streams',
    description: 'Build in Public real-time logging. Track your journey from signal discovery to commercialization.',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Discover Signals',
    description: 'Our radar continuously scans the web for emerging creative ideas and trending products.',
  },
  {
    step: '02',
    title: 'AI Evaluation',
    description: 'Signals are automatically scored across multiple dimensions: hotness, novelty, business potential, and localization.',
  },
  {
    step: '03',
    title: 'Generate MVP',
    description: 'Select a signal and use TRAE IDE to generate a fully functional prototype in your preferred tech stack.',
  },
  {
    step: '04',
    title: 'Launch & Iterate',
    description: 'Deploy to production and start iterating based on real user feedback.',
  },
]

const projectHistory = [
  {
    date: 'Q1 2026',
    event: 'Project inception and initial research on creative signal detection',
  },
  {
    date: 'Q2 2026',
    event: 'MVP development with Next.js and Supabase integration',
  },
  {
    date: 'Q3 2026',
    event: 'TRAE IDE integration and automated MVP generation',
  },
  {
    date: 'Q4 2026',
    event: 'Public launch and community building',
  },
]

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Signal Expansion',
    items: ['Add 5+ new signal sources', 'Advanced filtering and search', 'Custom alert rules'],
    status: 'in-progress',
  },
  {
    phase: 'Phase 2',
    title: 'AI Enhancement',
    items: ['Predictive trend analysis', 'Automated competitor research', 'Market size estimation'],
    status: 'upcoming',
  },
  {
    phase: 'Phase 3',
    title: 'Community Features',
    items: ['Signal sharing and discussion', 'Collaborative forging', 'Leaderboard and rankings'],
    status: 'upcoming',
  },
]

const team = [
  {
    name: 'Quan Jiawei',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack developer passionate about AI-powered tools for independent creators.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 px-4">
        <div className="container-app text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: 'var(--color-primary-muted)',
              color: 'var(--color-primary)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-primary)' }}
            ></span>
            About SparkForge
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span
              className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--state-warning)] to-[var(--color-primary)] bg-clip-text text-transparent"
            >
              Building the Future
            </span>
            <br />
            <span style={{ color: 'var(--color-text)' }}>of Creative Discovery</span>
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto mb-10"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            SparkForge is a comprehensive platform that bridges the gap between creative discovery and MVP deployment. 
            Our mission is to empower independent developers to turn ideas into reality faster than ever.
          </p>
        </div>
      </section>

      <section
        className="py-20 px-4"
        style={{ backgroundColor: 'var(--color-bg-muted)' }}
      >
        <div className="container-app">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--color-text)' }}
          >
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="rounded-2xl p-6 card-hover"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-3xl"
                  style={{ backgroundColor: tech.bgColor }}
                >
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: tech.color }}>
                  {tech.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  {tech.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tech.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: tech.bgColor,
                        color: tech.color,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container-app">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--color-text)' }}
          >
            Features Overview
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl p-6 card-hover"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--color-primary-muted)' }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 px-4"
        style={{ backgroundColor: 'var(--color-bg-muted)' }}
      >
        <div className="container-app">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--color-text)' }}
          >
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative">
                <div
                  className="rounded-2xl p-6 h-full card-hover"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    className="text-5xl font-bold mb-4"
                    style={{ color: 'var(--color-primary-muted)' }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
                {howItWorks.indexOf(item) < howItWorks.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <span className="text-2xl">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container-app max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--color-text)' }}
          >
            Project History
          </h2>
          <div className="relative">
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{ backgroundColor: 'var(--color-border)' }}
            ></div>
            <div className="space-y-8">
              {projectHistory.map((item, index) => (
                <div
                  key={item.date}
                  className={`relative flex items-start gap-6 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <div
                      className="rounded-2xl p-6 inline-block"
                      style={{
                        backgroundColor: 'var(--color-bg-surface)',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <h3 className="font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                        {item.date}
                      </h3>
                      <p style={{ color: 'var(--color-text-secondary)' }}>{item.event}</p>
                    </div>
                  </div>
                  <div
                    className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-text-inverse)',
                    }}
                  >
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 px-4"
        style={{ backgroundColor: 'var(--color-bg-muted)' }}
      >
        <div className="container-app max-w-2xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--color-text)' }}
          >
            Team
          </h2>
          <div className="flex flex-col items-center">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl p-8 text-center"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4"
                  style={{ backgroundColor: 'var(--color-primary-muted)' }}
                >
                  👤
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                  {member.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--color-primary)' }}>
                  {member.role}
                </p>
                <p style={{ color: 'var(--color-text-secondary)' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container-app">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--color-text)' }}
          >
            Roadmap
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {roadmap.map((item) => (
              <div
                key={item.phase}
                className="rounded-2xl p-6 card-hover"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-sm font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor:
                        item.status === 'in-progress'
                          ? 'var(--color-primary-muted)'
                          : 'var(--color-bg-hover)',
                      color:
                        item.status === 'in-progress'
                          ? 'var(--color-primary)'
                          : 'var(--color-text-muted)',
                    }}
                  >
                    {item.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {item.phase}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  {item.title}
                </h3>
                <ul className="space-y-3">
                  {item.items.map((listItem) => (
                    <li key={listItem} className="flex items-start gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
                        style={{
                          backgroundColor:
                            item.status === 'in-progress'
                              ? 'var(--color-primary)'
                              : 'var(--color-bg-active)',
                          color: 'var(--color-text-inverse)',
                        }}
                      >
                        {item.status === 'in-progress' ? '✓' : '○'}
                      </span>
                      <span style={{ color: 'var(--color-text-secondary)' }}>
                        {listItem}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 px-4"
        style={{ backgroundColor: 'var(--color-bg-muted)' }}
      >
        <div className="container-app max-w-2xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--color-text)' }}
          >
            Contact
          </h2>
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              Have questions, suggestions, or want to collaborate? We&apos;d love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@sparkforge.dev"
                className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 btn-press"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-text-inverse)',
                }}
              >
                Email Us
              </a>
              <a
                href="https://github.com/QJWSTAR/sparkforge"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-medium transition-colors btn-press"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="py-8 px-4 border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="container-app flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-sm font-bold"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), var(--state-warning))',
                  color: 'var(--color-text-inverse)',
                }}
              >
                S
              </div>
              <span className="font-bold" style={{ color: 'var(--color-text)' }}>
                SparkForge
              </span>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                © 2026
              </span>
            </div>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Hosted on Cloudflare · Vercel
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <Link href="/privacy" className="hover:opacity-70 transition-opacity">
              Privacy
            </Link>
            <Link href="/terms" className="hover:opacity-70 transition-opacity">
              Terms
            </Link>
            <a href="https://github.com/QJWSTAR/sparkforge/issues" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}