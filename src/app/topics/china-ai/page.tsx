import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How China Is Using AI — And Why It Should Have Your Attention | Prompt AI News',
  description:
    'China is deploying AI in surveillance, electric vehicles, and military technology at a scale the United States is only beginning to reckon with. A deep-dive guide from Prompt AI News.',
  openGraph: {
    title: 'How China Is Using AI — And Why It Should Have Your Attention',
    description:
      'From predicting dissent before it happens to dominating global EV markets — a comprehensive look at how China is weaponizing AI.',
    type: 'article',
  },
}

const RELATED = [
  {
    title: 'A Chinese Company Is Building AI to Predict Dissent Before It Happens',
    slug:  'a-chinese-company-is-building-ai-to-predict-dissent-before-it-happens',
  },
  {
    title: 'Nvidia Is Coming for Your Laptop',
    slug:  'nvidia-is-coming-for-your-laptop',
  },
]

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mt-12 mb-6">
      <h2 className="text-xl font-bold whitespace-nowrap" style={{ color: 'var(--pan-body)' }}>
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'var(--pan-border)' }} aria-hidden />
    </div>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border-l-4 px-6 py-4 my-6 text-sm leading-relaxed"
      style={{
        borderLeftColor: '#4A90D9',
        background:      'var(--pan-surface)',
        color:           'var(--pan-muted)',
      }}
    >
      {children}
    </div>
  )
}

function StatRow({ stat, label }: { stat: string; label: string }) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl border px-5 py-4"
      style={{ background: 'var(--pan-surface)', borderColor: 'var(--pan-border)' }}
    >
      <span className="text-2xl font-black" style={{ color: '#4A90D9' }}>{stat}</span>
      <span className="text-sm leading-snug" style={{ color: 'var(--pan-muted)' }}>{label}</span>
    </div>
  )
}

export default function ChinaAIPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 mb-4">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: '#4A90D9' }}
        >
          Deep Dive · China &amp; AI
        </span>
        <h1
          className="text-3xl sm:text-4xl font-black leading-tight"
          style={{ color: 'var(--pan-body)' }}
        >
          How China Is Using AI —{' '}
          <span style={{ color: '#4A90D9' }}>And Why It Should Have Your Attention</span>
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--pan-muted)' }}>
          China is not waiting. While the United States debates regulation and ethics frameworks,
          China is deploying artificial intelligence at a scale and speed that has no parallel
          anywhere in the world — in its cities, its factories, its military, and increasingly,
          inside the borders of other countries.
        </p>
        <p className="text-xs" style={{ color: 'var(--pan-muted)' }}>
          Last updated: June 2026 &nbsp;·&nbsp; Prompt AI News
        </p>
      </div>

      <div className="h-px w-full mb-10" style={{ background: 'var(--pan-border)' }} aria-hidden />

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div
        className="prose prose-lg max-w-none text-base leading-relaxed"
        style={{ color: 'var(--pan-muted)' }}
      >

        {/* 1 — Surveillance */}
        <SectionDivider title="Surveillance and Social Control" />

        <p>
          China&apos;s AI surveillance apparatus is the most advanced ever built. Hundreds of
          millions of cameras feed into centralized systems that can identify faces, track
          movements, and flag behavior in real time. In Xinjiang, this infrastructure has been
          used to monitor the Uyghur Muslim population at a level that human rights organizations
          describe as a digital police state.
        </p>

        <p className="mt-4">
          But the next phase goes further. A Chinese company called{' '}
          <strong style={{ color: 'var(--pan-body)' }}>Geedge Networks</strong> — which sells a
          commercial version of China&apos;s Great Firewall — has been developing AI tools designed
          to predict political dissent <em>before it happens</em>. Using location data, social
          media activity, internet history, and even what books and movies citizens consume, the
          system builds behavioral profiles to flag people before they&apos;ve done anything wrong.
          Researchers at Vanderbilt University uncovered the program from 100,000 leaked internal
          documents.
        </p>

        <Callout>
          &ldquo;Geedge&apos;s research team was doing more than just documenting behavioral
          patterns. They were trying to predict what citizens might do next and with whom.&rdquo;
          <br />
          <span className="font-semibold">— Brett V. Benson, Vanderbilt University</span>
        </Callout>

        <p>
          Meeting minutes from February 2024 show Geedge researchers discussing how to build
          profiles to &ldquo;identify intent&rdquo; and &ldquo;achieve discovery of harmful
          information&rdquo; — language the Chinese Communist Party routinely uses as a euphemism
          for political dissent. Geedge has already exported its surveillance software to Ethiopia,
          Kazakhstan, Myanmar, and Pakistan. The predictive profiling technology represents the
          next generation of what it is already selling abroad.
        </p>

        <p className="mt-4">
          This technology is slowed — but not stopped — by U.S. export controls on the advanced
          Nvidia chips needed to run it at full scale. That restraint is currently being
          renegotiated.
        </p>

        {/* 2 — EVs */}
        <SectionDivider title="Electric Vehicles: China's Most Dangerous Export" />

        <p>
          If surveillance is where China&apos;s AI ambitions are most alarming, electric vehicles
          are where they are most impressive — and most threatening to American industry. China now
          manufactures more electric vehicles than the rest of the world combined, and it is winning
          markets the United States is not even competing in.
        </p>

        {/* Stat grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 not-prose">
          <StatRow stat="383,453" label="BYD vehicles sold in a single month (May 2025)" />
          <StatRow stat="+80%"    label="BYD overseas sales year over year" />
          <StatRow stat="+81%"    label="Leapmotor deliveries year over year — single-month record" />
          <StatRow stat="+62%"    label="Nio deliveries year over year" />
          <StatRow stat="70+"     label="Countries where BYD sells cars" />
          <StatRow stat="18%"     label="EV share of new car sales in Costa Rica — 3× the U.S. rate" />
        </div>

        <p className="mt-2 font-semibold" style={{ color: 'var(--pan-body)' }}>
          How China won the EV market
        </p>
        <p className="mt-2">
          The reason China dominates is not just subsidies, though those are massive and effectively
          unlimited. It is <strong style={{ color: 'var(--pan-body)' }}>vertical integration
          powered by AI</strong> at every layer of the stack. Chinese companies control the full
          supply chain — from lithium mining in South America, to battery manufacturing, to the
          AI-powered software running the car itself. Onboard AI handles navigation, driver
          assistance, predictive maintenance, and over-the-air software updates that improve the
          vehicle after purchase. XPeng began production of China&apos;s first robotaxi-specific car
          in May 2025. Li Auto is preparing to unveil in-house AI chips and autonomous driving
          foundational models.
        </p>

        <p className="mt-4 font-semibold" style={{ color: 'var(--pan-body)' }}>
          What happened to Tesla in China is a warning
        </p>
        <p className="mt-2">
          China ran a precise playbook on Tesla. Using tariffs on foreign-manufactured cars and
          subsidies for domestic production, China lured Elon Musk to open a Shanghai factory in
          2017. Tesla received generous subsidies, discounted industrial land, and fast regulatory
          approvals — just long enough for Chinese engineers to study the company&apos;s
          innovations. Then the subsidies vanished. By 2025, Tesla&apos;s market share in China had
          fallen below 5%.
        </p>

        <Callout>
          &ldquo;The existential risk to the U.S. auto industry isn&apos;t Chinese EVs alone.
          It&apos;s the combination of sustained government support, vertically integrated supply
          chains and speed.&rdquo;
          <br />
          <span className="font-semibold">— Elizabeth Krear, Center for Automotive Research</span>
        </Callout>

        <p className="mt-2 font-semibold" style={{ color: 'var(--pan-body)' }}>
          China is winning markets America isn&apos;t watching
        </p>
        <p className="mt-2">
          Costa Rica now has the second-highest EV adoption rate in Latin America — 18% of all new
          car sales in Q1 2025, three times the U.S. rate. The cars filling those roads are not
          Teslas or Fords. They are BYDs, Geelygeelys, MGs, Aions, and Dongfengs — many selling for
          under $20,000. When Costa Rica&apos;s largest EV association polled its members, 70% said
          they switched to electric to save money, not for environmental reasons. Across Latin
          America, Africa, and much of Asia, EV sales surged 79% in March 2025 compared to a year
          earlier, according to Benchmark Mineral Intelligence. Chinese brands dominate every one of
          those markets on price points no American manufacturer can match.
        </p>

        <Callout>
          &ldquo;We&apos;re living probably the biggest disruption since we went from the horse to
          a car a hundred years ago.&rdquo;
          <br />
          <span className="font-semibold">— Alejandro Rubinstein, CEO, Grupo Purdy (Costa Rica&apos;s largest car dealership)</span>
        </Callout>

        <p className="mt-2 font-semibold" style={{ color: 'var(--pan-body)' }}>
          The $1 trillion question
        </p>
        <p className="mt-2">
          The Trump administration is reportedly considering a deal to allow China to invest
          $1 trillion in the United States, largely to build factories on American soil. The
          political logic is jobs. The strategic risk is everything else.
        </p>
        <p className="mt-4">
          When American companies like General Electric, Intel, and Tesla opened factories in China
          in exchange for market access, Chinese engineers absorbed the technology, built
          competitors, and pushed the Americans out. China&apos;s 2017 National Intelligence Law
          requires every Chinese company to share data with the state on demand. An American factory
          built by a Chinese company is not a jobs program. It is an intelligence operation with a
          parking lot.
        </p>
        <p className="mt-4">
          &ldquo;If they want to come in and build the plant and hire you and hire your friends and
          your neighbors, that&apos;s great. I love that. Let China come in,&rdquo; President Trump
          said in Detroit in January 2025. His own AI Action Plan states that denying foreign
          adversaries access to advanced AI chips is &ldquo;a matter of both geostrategic
          competition and national security.&rdquo; Both cannot be true at the same time.
        </p>

        {/* 3 — Military */}
        <SectionDivider title="AI in the Military" />

        <p>
          China&apos;s People&apos;s Liberation Army has made AI-enabled warfare an explicit
          national priority. The PLA is developing autonomous drones, AI-assisted targeting systems,
          and information warfare tools — including AI-generated propaganda tailored to specific
          foreign audiences. A separate Chinese company, GoLaxy, was documented by Vanderbilt
          researchers and The New York Times developing AI software designed to push targeted
          propaganda aligned with Chinese government positions into foreign social media feeds.
          China&apos;s Public Security Bureaus are racing to deploy DeepSeek, China&apos;s leading
          AI model, for predictive policing technology.
        </p>

        <Callout>
          &ldquo;Our state&apos;s ideology and social system are fundamentally incompatible with
          the West. This determines that our struggle and contest with Western countries is
          irreconcilable, so it will inevitably be long, complicated and sometimes even very
          sharp.&rdquo;
          <br />
          <span className="font-semibold">— Xi Jinping, as written into the PLA curriculum</span>
        </Callout>

        {/* 4 — Chip gap */}
        <SectionDivider title="The Chip Gap — And How Long It Lasts" />

        <p>
          The single biggest constraint on China&apos;s AI ambitions is compute. Nvidia&apos;s most
          advanced chips are the engines behind the world&apos;s most powerful AI models. U.S.
          export controls have blocked China from purchasing them since 2022, and internal Geedge
          documents from 2024 show the company struggling with GPU shortages as a direct result —
          falling back on older, less capable models.
        </p>
        <p className="mt-4">
          The controls have worked, but imperfectly. The Trump administration has relaxed some
          Biden-era restrictions, and during President Trump&apos;s 2026 trip to Beijing, officials
          confirmed China would gain access to a more advanced Nvidia chip variant. China is
          simultaneously funding domestic alternatives through Huawei and others, with a stated goal
          of chip independence by 2030.
        </p>

        <Callout>
          &ldquo;Chinese security services are dealing with an overload of data. The real value of
          artificial intelligence is that they can triage the data and find the threats. But their
          ability to scale that depends on their access to compute. This is what makes export
          controls so important.&rdquo;
          <br />
          <span className="font-semibold">— Jimmy Goodrich, UC Institute on Global Conflict and Cooperation</span>
        </Callout>

        {/* 5 — What it means */}
        <SectionDivider title="What This Means for You" />

        <p>
          China&apos;s AI story is not abstract. It is reshaping the car you might buy next, the
          price of electronics, the social media content reaching your feed, and the balance of
          power between democratic and authoritarian governments. The United States still leads on
          foundational AI research and the most powerful models. That lead rests heavily on export
          controls that are currently being renegotiated, and on a domestic manufacturing base being
          targeted for Chinese investment.
        </p>

      </div>

      {/* ── Related stories ─────────────────────────────────────────────── */}
      <div className="mt-14">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest whitespace-nowrap" style={{ color: 'var(--pan-muted)' }}>
            Related stories
          </h2>
          <div className="flex-1 h-px" style={{ background: 'var(--pan-border)' }} aria-hidden />
        </div>
        <div className="flex flex-col gap-3">
          {RELATED.map(({ title, slug }) => (
            <Link
              key={slug}
              href={`/posts/${slug}`}
              className="group flex items-center justify-between rounded-xl border px-5 py-4 transition-shadow hover:shadow-md"
              style={{ background: 'var(--pan-surface)', borderColor: 'var(--pan-border)' }}
            >
              <span className="text-sm font-medium leading-snug" style={{ color: 'var(--pan-body)' }}>
                {title}
              </span>
              <span className="ml-4 flex-shrink-0 text-sm font-semibold transition-opacity group-hover:opacity-70" style={{ color: '#4A90D9' }}>
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
