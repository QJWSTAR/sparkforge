export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="container-app max-w-3xl mx-auto">
        <section className="mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Last updated: July 1, 2026
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            Introduction
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              SparkForge (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website and services (collectively, the &quot;Services&quot;).
            </p>
            <p
              style={{ color: 'var(--color-text-secondary)' }}
            >
              By accessing or using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with any part of this policy, please do not use our Services.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            Information Collection
          </h2>

          <div
            className="rounded-2xl p-6 mb-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Personal Information
            </h3>
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              When you register for an account or use our Services, we may collect the following personal information:
            </p>
            <ul
              className="space-y-2 pl-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <li className="list-disc">Email address</li>
              <li className="list-disc">Username</li>
              <li className="list-disc">Password (encrypted)</li>
              <li className="list-disc">Profile information (name, bio, avatar)</li>
              <li className="list-disc">Usage preferences and settings</li>
            </ul>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Usage Data
            </h3>
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We automatically collect certain information when you use our Services, including:
            </p>
            <ul
              className="space-y-2 pl-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <li className="list-disc">IP address</li>
              <li className="list-disc">Browser type and version</li>
              <li className="list-disc">Pages visited and time spent</li>
              <li className="list-disc">Device information (OS, device type)</li>
              <li className="list-disc">Interaction data (clicks, searches, signals viewed)</li>
              <li className="list-disc">API usage statistics</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            How We Use Your Information
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We use the collected information for the following purposes:
            </p>
            <ul
              className="space-y-3 pl-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Provide and maintain Services:</strong> To operate and deliver the functionality of our platform, including signal tracking, AI scoring, and MVP generation.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Improve user experience:</strong> To understand how users interact with our Services and make improvements.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Personalization:</strong> To tailor content, recommendations, and features to your preferences.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Communications:</strong> To send you updates, newsletters, and important notifications regarding your account.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Security:</strong> To detect and prevent fraud, abuse, and unauthorized access to your account.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Analytics:</strong> To analyze usage patterns and trends for research and development purposes.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            Data Security
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We employ industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:
            </p>
            <ul
              className="space-y-2 pl-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <li className="list-disc">Encryption of data in transit (HTTPS/TLS)</li>
              <li className="list-disc">Encryption of sensitive data at rest</li>
              <li className="list-disc">Secure authentication and authorization protocols</li>
              <li className="list-disc">Regular security audits and vulnerability assessments</li>
              <li className="list-disc">Access controls limiting data access to authorized personnel</li>
            </ul>
            <p
              className="mt-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              While we strive to protect your information, no method of transmission over the internet or electronic storage is completely secure. Therefore, we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            Cookies and Tracking Technologies
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us recognize your device and remember your preferences.
            </p>
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: 'var(--color-text)' }}
            >
              Types of Cookies We Use:
            </h3>
            <ul
              className="space-y-2 pl-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Essential cookies:</strong> Required for the basic functioning of our Services.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Performance cookies:</strong> Help us analyze how users interact with our website.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Functional cookies:</strong> Enable enhanced functionality and personalization.
              </li>
            </ul>
            <p
              className="mt-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              You can manage your cookie preferences through your browser settings. However, disabling certain cookies may affect the functionality of our Services.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            Your Rights
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul
              className="space-y-3 pl-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Access:</strong> Request access to your personal information we hold.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Correction:</strong> Request correction of inaccurate or incomplete information.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Deletion:</strong> Request deletion of your personal information, subject to applicable laws.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format.
              </li>
              <li className="list-disc">
                <strong style={{ color: 'var(--color-text)' }}>Opt-out:</strong> Opt out of marketing communications or certain data processing activities.
              </li>
            </ul>
            <p
              className="mt-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            Changes to This Policy
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make changes, we will update the &quot;Last updated&quot; date at the top of this policy.
            </p>
            <p
              className="mt-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We encourage you to review this policy periodically to stay informed about how we are protecting your information. Your continued use of our Services after any changes constitutes your acceptance of the updated policy.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            Contact Us
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <div
              className="space-y-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <p>Email: privacy@sparkforge.dev</p>
              <p>GitHub: <a href="https://github.com/QJWSTAR/sparkforge" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>github.com/QJWSTAR/sparkforge</a></p>
            </div>
          </div>
        </section>

        <footer
          className="py-8 px-4 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
              <a href="/privacy" className="hover:opacity-70 transition-opacity">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:opacity-70 transition-opacity">
                Terms of Service
              </a>
              <a href="https://github.com/QJWSTAR/sparkforge/issues" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}