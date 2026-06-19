import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'The AI Data Center Boom: A Multi-Perspective Analysis',
  description:
    'A research report examining the energy, water, air quality, economic, and regulatory impacts of the unprecedented AI data center build-out.',
  openGraph: {
    title: 'The AI Data Center Boom: A Multi-Perspective Analysis',
    description:
      'Examining the societal and environmental impacts of the AI data center boom from multiple perspectives.',
    type: 'article',
  },
}

// ─── Local helpers ─────────────────────────────────────────────────────────────

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-2xl font-bold mt-14 mb-5 pb-3"
      style={{ color: 'var(--pan-body)', borderBottom: '3px solid var(--pan-border)' }}
    >
      {children}
    </h2>
  )
}

function Para({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-base leading-7" style={{ color: 'var(--pan-body)' }}>
      {children}
    </p>
  )
}

function HighlightBox({
  variant = 'info',
  children,
}: {
  variant?: 'info' | 'warning' | 'danger' | 'success'
  children: ReactNode
}) {
  const styles = {
    info:    { background: '#eff6ff', border: '1px solid #bfdbfe' },
    warning: { background: '#fffbeb', border: '1px solid #fcd34d' },
    danger:  { background: '#fef2f2', border: '1px solid #fca5a5' },
    success: { background: '#f0fdf4', border: '1px solid #86efac' },
  }
  return (
    <div className="rounded-xl px-6 py-5 my-6 text-sm leading-7" style={styles[variant]}>
      {children}
    </div>
  )
}

function ChartImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-8 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="w-full rounded-lg shadow-md" />
      <figcaption className="mt-3 text-sm italic" style={{ color: 'var(--pan-muted)' }}>
        {caption}
      </figcaption>
    </figure>
  )
}

function PerspectiveBox({
  variant,
  heading,
  headingColor,
  children,
}: {
  variant: 'concern' | 'counter' | 'nuance'
  heading: string
  headingColor: string
  children: ReactNode
}) {
  const styles = {
    concern: { background: '#fef2f2', borderLeft: '5px solid #dc2626' },
    counter: { background: '#f0fdf4', borderLeft: '5px solid #16a34a' },
    nuance:  { background: '#fffbeb', borderLeft: '5px solid #d97706' },
  }
  return (
    <div className="rounded-r-xl rounded-l-sm p-6 my-8 text-sm leading-7" style={styles[variant]}>
      <h4 className="font-bold text-base mb-4" style={{ color: headingColor }}>
        {heading}
      </h4>
      {children}
    </div>
  )
}

// ─── Table of contents entries ─────────────────────────────────────────────────

const TOC_ENTRIES = [
  ['#section1',  '1. The Scale of the AI Data Center Boom'],
  ['#section2',  '2. Energy Consumption: The Numbers and Projections'],
  ['#section3',  '3. Water Usage: Direct, Indirect, and Context'],
  ['#section4',  '4. Local Air Quality and Public Health Impacts'],
  ['#section5',  '5. The NIMBY Backlash: Community Opposition and Zoning Battles'],
  ['#section6',  '6. Economic Benefits: Tax Revenue, Jobs, and Local Development'],
  ['#section7',  '7. The Efficiency Story: PUE Improvements and Technological Innovation'],
  ['#section8',  "8. The Nuclear Pivot: Big Tech's Carbon-Free Strategy"],
  ['#section9',  '9. Global and EU Regulatory Landscape'],
  ['#section10', '10. Perspective One: The Case That Concerns Are Legitimate'],
  ['#section11', '11. Perspective Two: The Case That Impacts Are Overblown'],
  ['#section12', '12. Perspective Three: The Nuanced Middle Ground'],
  ['#section13', '13. Conclusion: Balancing Innovation with Responsibility'],
] as const

// ─── Regulatory table rows ─────────────────────────────────────────────────────

const REGULATORY_ROWS = [
  ['EU EED (Directive 2023/1791)', 'Mandatory reporting for facilities ≥500 kW; PUE, WUE, ERF, REF metrics', 'Active since 2024'],
  ['Germany EnEfG', 'New facilities: PUE ≤1.2; existing: PUE ≤1.5 by 2027, ≤1.3 by 2030', 'July 2026 onward'],
  ['Climate Neutral Data Centre Pact', 'PUE ≤1.3 (cool climates), 75% renewable by 2025, 100% by 2030', 'Voluntary; 100+ operators signed'],
  ['EU DC Rating Scheme', 'Common EU-wide energy efficiency labeling for data centers', 'Q2 2026 adoption'],
  ['EU Cloud and AI Development Act', 'Triple EU data center capacity in 5–7 years with efficiency requirements', 'Q4 2025 / Q1 2026'],
  ['Washington State (US)', 'Health impact assessment required; Tier 4 generator mandate proposed', 'Active'],
  ['Virginia GS-5 Rate Class', 'Large data centers must pay minimum 85% of contracted demand charges', 'January 2027'],
] as const

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function DataCenterBoomReport() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div
        className="text-white py-16 sm:py-20 text-center px-6"
        style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
            The AI Data Center Boom
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-5">
            A Multi-Perspective Analysis of Societal and Environmental Impacts in the Age of Artificial Intelligence
          </p>
          <p className="text-sm opacity-70">Research Report · June 2026</p>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Executive Summary ─────────────────────────────────────────────── */}
        <div
          className="rounded-r-xl shadow-sm px-7 py-7 my-10"
          style={{ background: 'var(--pan-surface)', borderLeft: '5px solid #4A90D9' }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--pan-body)' }}>
            Executive Summary
          </h2>
          <p className="mb-4 text-sm leading-7" style={{ color: 'var(--pan-body)' }}>
            The explosive growth of artificial intelligence has triggered an unprecedented global build-out of data center infrastructure. Over <strong>700 data centers</strong> are currently under construction across <strong>38 U.S. states</strong>, representing hundreds of billions of dollars in investment and tens of gigawatts of new electricity demand. This report examines whether the environmental and societal concerns surrounding this boom are proportionate to the actual impacts.
          </p>
          <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--pan-body)' }}>
            Key findings:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm leading-7" style={{ color: 'var(--pan-body)' }}>
            <li>
              <strong>Energy:</strong> U.S. data centers consumed <strong>176 TWh in 2023 (4.4% of U.S. electricity)</strong> and could reach <strong>325–580 TWh by 2028</strong>. Globally, data centers use about <strong>1.5% of world electricity</strong> — a meaningful but still marginal share.
            </li>
            <li>
              <strong>Water:</strong> Direct data center water consumption is approximately <strong>0.04% of U.S. freshwater</strong>. Even including indirect use (power generation), the total is roughly <strong>0.12%</strong> — far less than agriculture (70%) or golf courses (0.5%).
            </li>
            <li>
              <strong>Efficiency:</strong> Data center efficiency has improved dramatically — average PUE dropped from <strong>2.5 in 2007 to 1.56 in 2024</strong>. Google and Meta now operate at PUE of 1.08–1.09.
            </li>
            <li>
              <strong>Local impacts are real but concentrated:</strong> Northern Virginia, Ireland, and parts of Arizona face genuine strain. Diesel backup generators in Virginia alone may cause <strong>14,000 asthma cases and $220–300 million in annual health costs</strong>.
            </li>
            <li>
              <strong>Economic benefits are substantial:</strong> In Loudoun County, VA, data centers generate <strong>$26 in taxes for every $1</strong> of public services consumed and fund 38% of the county&apos;s General Fund.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-7" style={{ color: 'var(--pan-body)' }}>
            <strong>Bottom line:</strong> The data center impact is <strong>real but context-dependent</strong>. At the national and global level, the footprint remains a small fraction of total resource use. At the local level, impacts can be severe without proper planning and mitigation.
          </p>
        </div>

        {/* ── Table of Contents ─────────────────────────────────────────────── */}
        <div
          className="rounded-xl px-6 py-6 my-8 shadow-sm"
          style={{ background: 'var(--pan-surface)', border: '1px solid var(--pan-border)' }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--pan-body)' }}>
            Table of Contents
          </h3>
          <ol className="space-y-0 text-sm">
            {TOC_ENTRIES.map(([href, label]) => (
              <li
                key={href}
                className="py-2 border-b last:border-0"
                style={{ borderColor: 'var(--pan-border)' }}
              >
                <a
                  href={href}
                  className="hover:underline underline-offset-2 transition-colors"
                  style={{ color: '#4A90D9' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section1">1. The Scale of the AI Data Center Boom</SectionHeading>

        <Para>
          The data center industry is experiencing what analysts at the Brookings Institution describe as an &ldquo;infrastructure investment supercycle&rdquo; driven almost entirely by the artificial intelligence revolution. Over <strong>700 data centers</strong> are actively under construction across <strong>38 U.S. states</strong> as of early 2026, representing approximately <strong>18 gigawatts of new capacity</strong>. Texas leads with 140 projects, followed by Virginia with 136, Georgia with 56, and Ohio with 51.
        </Para>

        <Para>
          The financial commitments are equally staggering. Amazon, Google, Microsoft, and Meta have collectively announced over <strong>$300 billion in U.S. data center investments</strong> for 2024–2028. Individual projects now routinely exceed $10 billion. The Stargate initiative — a joint venture between OpenAI, Oracle, and SoftBank — targets <strong>$500 billion total investment</strong> and <strong>10 gigawatts of AI-dedicated capacity</strong>. Meta&apos;s Hyperion campus in Louisiana represents a <strong>$27 billion joint venture</strong> spanning 3,650 acres with peak power demand exceeding 5 gigawatts. Amazon&apos;s expansion in Pennsylvania totals <strong>$20 billion</strong> for 2+ gigawatts of capacity near the Susquehanna nuclear plant.
        </Para>

        {/* Stat grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
          {[
            { number: '700+',  label: 'Data centers under construction in 38 U.S. states' },
            { number: '$300B+', label: 'Combined U.S. investment by Big Tech (2024–2028)' },
            { number: '18 GW', label: 'New AI data center capacity currently being built' },
            { number: '$500B', label: 'Stargate AI infrastructure initiative target' },
          ].map(({ number, label }) => (
            <div
              key={number}
              className="rounded-xl p-5 text-center shadow-sm"
              style={{ background: 'var(--pan-surface)', borderTop: '4px solid #4A90D9' }}
            >
              <span className="block text-2xl font-extrabold mb-2" style={{ color: 'var(--pan-body)' }}>
                {number}
              </span>
              <span className="block text-xs leading-5" style={{ color: 'var(--pan-muted)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <Para>
          This build-out is qualitatively different from previous data center expansions. Traditional facilities were designed for general cloud computing and storage, with power densities of 5–15 kilowatts per rack. AI-optimized facilities now deploy high-performance GPU clusters consuming <strong>40–60+ kilowatts per rack</strong>, with cutting-edge installations pushing past 100 kW. Proximity to massive, reliable power sources has replaced proximity to population centers as the primary site-selection criterion.
        </Para>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section2">2. Energy Consumption: The Numbers and Projections</SectionHeading>

        <Para>
          The most authoritative U.S. data comes from Lawrence Berkeley National Laboratory&apos;s 2024 report, which found that data centers consumed approximately <strong>176 terawatt-hours (TWh)</strong> of electricity in 2023, representing about <strong>4.4% of total U.S. electricity consumption</strong>. This represents a near-tripling from 58 TWh in 2014 and a compound annual growth rate of roughly 18% from 2018 to 2023.
        </Para>

        <ChartImage
          src="/chart1_energy_growth.png"
          alt="U.S. Data Center Electricity Consumption 2014–2028 Projection"
          caption="Figure 1: U.S. data center electricity consumption has nearly tripled in a decade, with AI driving the most recent acceleration. Source: Lawrence Berkeley National Laboratory, 2024."
        />

        <Para>
          Future projections vary widely. LBNL projects U.S. data center consumption could reach <strong>325–580 TWh by 2028</strong>, representing 6.7–12.0% of national electricity. Goldman Sachs Research forecasts a <strong>165% increase in global data center power demand by 2030</strong> compared to 2023. BloombergNEF projects U.S. data-center power demand will more than double by 2035, from roughly 35 GW in 2024 to 78 GW.
        </Para>

        <Para>
          The International Energy Agency&apos;s base case projects global data center electricity consumption will <strong>roughly double from 415 TWh in 2024 to around 945 TWh by 2030</strong>, growing at approximately 15% per year — more than four times faster than electricity demand from all other sectors combined. Even in this scenario, data centers would represent just under <strong>3% of total global electricity consumption</strong> in 2030.
        </Para>

        <ChartImage
          src="/chart2_global_projections.png"
          alt="Global Data Center Energy Consumption: IEA Scenarios to 2030"
          caption="Figure 2: IEA scenarios for global data center electricity consumption through 2030. Even aggressive growth projections keep data centers below 3% of global electricity use. Source: IEA Energy and AI Report, 2025."
        />

        <Para>
          The regional concentration of demand matters enormously. Ireland&apos;s data centers now consume <strong>22% of the country&apos;s total electricity</strong>. In Northern Virginia, the world&apos;s largest data center market, approximately <strong>70% of global internet traffic passes through</strong> the region daily, and data centers now consume over <strong>25% of Virginia&apos;s total electricity</strong>.
        </Para>

        <HighlightBox variant="warning">
          <strong>Capacity market impact:</strong> AI data center demand in Virginia contributed to an <strong>833% increase</strong> in PJM&apos;s 2025–2026 capacity auction prices. Dominion Energy projects Virginia&apos;s energy demand will rise <strong>183% by 2040</strong>, driven primarily by data centers.
        </HighlightBox>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section3">3. Water Usage: Direct, Indirect, and Context</SectionHeading>

        <Para>
          Water consumption by data centers is among the most misunderstood aspects of their environmental footprint. A critical distinction is rarely made clear: <strong>direct water use</strong> (on-site cooling) versus <strong>indirect water use</strong> (water consumed at power plants generating the electricity). When headlines report that data centers use &ldquo;billions of gallons,&rdquo; they typically cite figures that include indirect consumption — which accounts for roughly <strong>80% of reported totals</strong>.
        </Para>

        <Para>
          The actual direct water consumption of U.S. data centers is approximately <strong>50 million gallons per day</strong> — about <strong>0.04% of America&apos;s freshwater consumption</strong>. Golf courses across the United States collectively consume approximately <strong>2 billion gallons per day</strong> — roughly 40 times more than all data centers combined. Almond orchards in California alone consume an estimated <strong>1.5 trillion gallons annually</strong>.
        </Para>

        <ChartImage
          src="/chart4_water_comparison.png"
          alt="Annual Water Consumption by Sector and Share of U.S. Freshwater"
          caption="Figure 3: Data center water consumption in context. Left: absolute gallons by sector. Right: share of U.S. freshwater withdrawals. Sources: USGS, Circle of Blue, industry reports."
        />

        <Para>
          In Maricopa County, Arizona — one of the most water-stressed regions where significant data center construction is occurring — all data centers are projected to use approximately <strong>905 million gallons in 2025</strong>. County golf courses consume <strong>29 billion gallons annually</strong>. Data centers make up roughly <strong>0.12% of the county&apos;s water use</strong>; golf courses consume <strong>3.8%</strong>. Data centers in Arizona generate approximately <strong>50 times as much tax revenue per gallon of water used</strong> as golf courses.
        </Para>

        <Para>
          However, the &ldquo;golf course argument&rdquo; has important limitations. Water is not fungible across geography — a data center&apos;s consumption in a drought-prone Arizona county affects local aquifers in ways that golf course consumption in water-rich Florida does not. Modern facilities are increasingly addressing this through closed-loop cooling systems, recycled wastewater, and air-cooled designs. Microsoft announced in December 2024 that all new data centers designed from August 2024 will use <strong>closed-loop cooling with zero water evaporation</strong>.
        </Para>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 4                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section4">4. Local Air Quality and Public Health Impacts</SectionHeading>

        <Para>
          Perhaps the most underappreciated environmental cost of data centers is their contribution to local air pollution through diesel backup generators. These generators — required to ensure continuous operation during grid outages — emit fine particulate matter (PM2.5), nitrogen oxides (NOx), sulfur dioxide (SO2), and volatile organic compounds. A study from UC Riverside published in late 2025 found that the number of permits for data center diesel generators in Northern Virginia increased by <strong>more than 70% since 2023</strong> compared to the total number issued between 2000 and 2022. Nearly all of these are <strong>Tier 2 generators</strong>, which have significantly higher emission rates than the cleaner Tier 4 standard.
        </Para>

        <Para>
          The public health modeling is sobering. Assuming actual emissions at 10% of permitted levels, backup generators in Virginia could cause approximately <strong>14,000 asthma symptom cases and 13–19 deaths each year</strong>, resulting in a total annual public health burden of <strong>$220–300 million</strong>. If generators operated at maximum permitted levels, the public health cost could reach <strong>$2.2–3.0 billion annually</strong>.
        </Para>

        <HighlightBox variant="danger">
          <strong>Health impact projection:</strong> A 2025 model indicates that U.S. data centers in 2030 could contribute to nearly <strong>1,300 premature deaths annually</strong>, creating a public health burden of more than <strong>$20 billion</strong> — primarily from diesel generator emissions and fossil-fuel power generation.
        </HighlightBox>

        <Para>
          The EPA recently issued a clarification allowing data centers to run backup generators for up to <strong>50 hours per year</strong> to participate in demand response programs — effectively increasing generator runtime beyond traditional emergency-only use. Washington State now requires data centers to prepare a <strong>health impact assessment</strong> of toxic air pollution before permits can be issued. Virginia&apos;s Department of Environmental Quality has proposed a statewide requirement for Tier 4 generators for any data center air quality permit submitted on or after July 1, 2026.
        </Para>

        <Para>
          Noise pollution represents another localized impact. Data center HVAC systems and generators produce internal noise levels reaching <strong>96 decibels</strong> — well above the 85 dBA threshold considered harmful to hearing. In Prince William County, Virginia, a draft ordinance now stringently regulates noise pollution using octave bands and a dBC scale specifically to address low-frequency noise from data centers.
        </Para>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 5                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section5">5. The NIMBY Backlash: Community Opposition and Zoning Battles</SectionHeading>

        <Para>
          The most politically consequential impact of the data center boom has been the rapid emergence of organized community opposition. From May 2024 to March 2025, up to <strong>$64 billion in U.S. data center projects</strong> were delayed or blocked due to local opposition. Data center cancellations quadrupled in 2024, with litigation on the rise.
        </Para>

        <ChartImage
          src="/chart6_nimby_opinion.png"
          alt="Public Opinion: Would You Welcome This Facility Near Your Home? Data Centers Rank Last."
          caption="Figure 4: Public opinion polling shows data centers are less welcome than nearly any other type of infrastructure facility. Source: Heatmap News national poll, 2025."
        />

        <Para>
          In September 2025, Prince George&apos;s County (Maryland) Executive Aisha Braveboy issued an executive order pausing all data center permit issuance after a proposal to convert the former Landover Mall sparked a petition with <strong>over 23,000 signatures</strong>. At least <strong>17 bills related to data centers</strong> were introduced in the 2026 Maryland legislative session. The legislature eventually passed the Utility RELIEF Act, aiming to hold utilities and data centers accountable for grid reliability impacts.
        </Para>

        <Para>
          A nationwide Heatmap poll in 2025 found that only <strong>44% of Americans would welcome a data center near where they live</strong> — making data centers less popular than gas-fired power plants, wind farms, battery storage facilities, and even nuclear power plants. The core dynamic: data centers&apos; benefits are vast yet diffuse (global digital services, tax revenue, economic growth), while negative externalities are largely local (noise, air pollution, strained infrastructure).
        </Para>

        <Para>
          This opposition is driving a geographic shift. As populated East Coast areas resist development, rural Western communities — Arizona, Texas, Nevada, and Georgia — are actively courting data centers. Texas alone has <strong>140 projects under construction</strong>. The Brookings Institution documented how counties receiving their first large data center saw total private employment grow by <strong>2,000–4,000 jobs over six years</strong> — modest relative to investment scale, but meaningful for rural communities.
        </Para>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 6                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section6">6. Economic Benefits: Tax Revenue, Jobs, and Local Development</SectionHeading>

        <Para>
          For communities that successfully attract data center development, the economic benefits can be transformative. In Loudoun County, Virginia, data centers now generate <strong>38% of the county&apos;s General Fund revenue</strong> and nearly half of all property tax revenue. A single data center pays approximately <strong>$26 in taxes for every $1 of public services it consumes</strong> — far exceeding the $4 paid by manufacturing plants. Throughout Virginia, the data center industry paid <strong>$640 million in state taxes and $1 billion in municipal taxes</strong> in 2022.
        </Para>

        <ChartImage
          src="/chart5_economic_benefits.png"
          alt="Data Centers: Exceptional Tax Revenue Generators — Loudoun County, Virginia Example"
          caption="Figure 5: Data centers generate exceptional tax revenue relative to their consumption of public services. Source: JLL Research, Loudoun County data."
        />

        <Para>
          The employment impact extends beyond direct facility jobs. In Loudoun County, approximately <strong>3.5 jobs are created outside data centers for every job within them</strong>. Virginia&apos;s data centers supported approximately <strong>78,000 total jobs with $6.2 billion in pay and benefits</strong> in 2023. Quincy, Washington — a small agricultural town — used data center tax revenue to build a new city hall, fire station, public safety department, and public market, while driving down property tax levy rates.
        </Para>

        <Para>
          However, the economic picture is more nuanced than headline figures suggest. A Brookings Institution analysis found that the standard model of data center development produces <strong>mostly short-term construction jobs</strong> and relatively little long-term, high-value tech activity. Permanent operational employment at individual facilities typically numbers <strong>fewer than 100 per site</strong>. The financial case for communities rests heavily on tax contributions — and those contributions can erode quickly when incentive packages include substantial tax exemptions.
        </Para>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 7                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section7">7. The Efficiency Story: PUE Improvements and Technological Innovation</SectionHeading>

        <Para>
          The data center industry has a genuinely impressive efficiency story that is frequently overlooked in alarmist coverage. Power Usage Effectiveness (PUE), which measures total facility energy divided by IT equipment energy, has improved dramatically. The industry average dropped from <strong>2.5 in 2007 to 1.56 in 2024</strong> — a 38% improvement in overhead energy consumption. Google reports a fleet-wide average PUE of <strong>1.09</strong>, while Meta operates at <strong>1.08</strong>.
        </Para>

        <ChartImage
          src="/chart3_pue_improvement.png"
          alt="Data Center Efficiency: The Remarkable PUE Improvement Journey"
          caption="Figure 6: Power Usage Effectiveness has improved dramatically since 2007, with leading operators now approaching the theoretical limit. Source: Uptime Institute, Google, Meta sustainability reports."
        />

        <Para>
          Over the last decade, the number of data centers has doubled, their floor space has quadrupled, and their energy consumption has increased by only about <strong>6%</strong>. This remarkable decoupling was driven by improvements in server efficiency, greater use of virtualization software, and the migration of workloads to large hyperscale facilities. Server chip efficiency improves at roughly <strong>40% per year</strong>, and a Duke University study estimated that curtailing data center loads for just <strong>0.25% of their uptime</strong> would free up enough capacity to accommodate <strong>76 gigawatts of new load</strong>.
        </Para>

        <Para>
          Cooling innovation is rapidly advancing. Direct liquid cooling reduces energy consumption by <strong>40%</strong> compared to traditional HVAC. Immersion cooling — submerging servers in dielectric fluids — achieves even greater gains. Waste heat recovery systems are increasingly capturing server heat for district heating networks, industrial processes, and agricultural applications.
        </Para>

        <HighlightBox variant="success">
          <strong>Microsoft&apos;s zero-water commitment:</strong> All new Microsoft data centers designed from August 2024 will use closed-loop cooling with <strong>zero water evaporation</strong>, coming online starting in late 2027. xAI&apos;s Memphis facility is building a water treatment plant that will recycle municipal wastewater, technically making it a <strong>net-zero water consumption facility</strong>.
        </HighlightBox>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 8                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section8">8. The Nuclear Pivot: Big Tech&apos;s Carbon-Free Strategy</SectionHeading>

        <Para>
          Faced with securing massive quantities of reliable, carbon-free power, the major tech companies have made a dramatic pivot toward nuclear energy. Over the past 18 months, Big Tech has signed contracts for more than <strong>10 gigawatts of possible new nuclear capacity</strong> in the United States — effectively transforming nuclear power from a declining industry into the centerpiece of AI infrastructure strategy.
        </Para>

        <ChartImage
          src="/chart7_nuclear_deals.png"
          alt="Big Tech Goes Nuclear: Major Data Center Power Deals (bubble size = approximate investment)"
          caption="Figure 7: Major nuclear power purchase agreements signed by Big Tech companies to power AI data centers. Sources: Company announcements, 2024–2025."
        />

        <Para>
          Microsoft committed to a <strong>20-year, $16 billion power purchase agreement</strong> to restart Three Mile Island Unit 1, delivering 835 MW of carbon-free power by 2028. Google signed a deal with Kairos Power for up to <strong>500 MW of small modular reactors (SMRs)</strong>, with the first 50 MW unit targeted for 2030. Amazon invested over <strong>$20 billion</strong> converting the Susquehanna nuclear site into an AI campus and signed a <strong>1.9 GW power purchase agreement</strong> with Talen Energy through 2042. Meta issued a request for proposals targeting <strong>1–4 GW of new nuclear generation</strong>. Oracle plans to build a data center campus powered by three SMRs.
        </Para>

        <Para>
          The economics of this nuclear pivot are complex. Nuclear costs range from <strong>$6,417–$12,681 per kilowatt</strong> compared to $1,290/kW for natural gas — making nuclear economical only when carbon-free requirements are mandatory or when long-term power purchase agreements provide revenue certainty. Goldman Sachs forecasts that <strong>85–90 GW of new nuclear capacity</strong> may be needed globally by 2030 to meet AI demand, yet less than 10% of that capacity is currently available.
        </Para>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 9                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section9">9. Global and EU Regulatory Landscape</SectionHeading>

        <Para>
          Europe has taken the most aggressive regulatory approach to data center sustainability. The EU&apos;s revised Energy Efficiency Directive (EED) mandates that data centers with installed IT power demand of <strong>500 kW or more</strong> must report annually with 24 key performance indicators including PUE, Water Usage Effectiveness (WUE), Energy Reuse Factor (ERF), and Renewable Energy Factor (REF). Germany&apos;s Energieeffizienzgesetz (EnEfG) goes further, requiring new facilities commissioned from July 2026 onward to achieve <strong>PUE of 1.2 within two years</strong> — the strictest data center performance law in the world.
        </Para>

        <div className="overflow-x-auto my-6">
          <table
            className="w-full text-sm rounded-xl overflow-hidden shadow-sm"
            style={{ borderCollapse: 'collapse' }}
          >
            <thead>
              <tr style={{ background: '#1e3a5f', color: 'white' }}>
                <th className="text-left px-4 py-3 font-semibold">Regulation</th>
                <th className="text-left px-4 py-3 font-semibold">Key Requirement</th>
                <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {REGULATORY_ROWS.map(([reg, req, time], i) => (
                <tr
                  key={reg}
                  style={{
                    borderBottom: '1px solid var(--pan-border)',
                    background: i % 2 === 0 ? 'var(--pan-surface)' : 'var(--pan-bg)',
                    color: 'var(--pan-body)',
                  }}
                >
                  <td className="px-4 py-3 font-medium">{reg}</td>
                  <td className="px-4 py-3">{req}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Para>
          The EU is building a comprehensive, harmonized framework with the explicit goal of achieving <strong>carbon-neutral data centers by 2030</strong>. The EU also requires data centers above 1 MW to assess waste heat recovery feasibility, with the potential to contribute an estimated <strong>221 TWh/year of usable heat</strong> — approximately 12% of Europe&apos;s total district heating demand.
        </Para>

        <Para>
          Nordic countries are already leading on waste heat integration. In Sweden, the Stockholm Data Parks initiative aims to use waste heat from data centers to meet <strong>10% of the city&apos;s heating needs by 2035</strong>. In Finland, Microsoft is building a data center region designed to be the world&apos;s largest scheme to recycle waste heat, expected to heat the city of Espoo. Ireland&apos;s Tallaght District Heating Scheme saved <strong>1,100 tonnes of CO&#x2082;</strong> in its first year by redirecting waste heat from an Amazon data center to local buildings.
        </Para>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 10                                                       */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section10">10. Perspective One: The Case That Concerns Are Legitimate</SectionHeading>

        <PerspectiveBox
          variant="concern"
          heading="The Critics' Argument: Local Impacts Are Real, Concentrated, and Insufficiently Addressed"
          headingColor="#dc2626"
        >
          <p className="mb-3">
            Proponents of stricter regulation make several compelling arguments that cannot be dismissed with aggregate statistics. First, <strong>local impacts are genuinely severe in hotspots</strong>. Northern Virginia&apos;s air quality degradation from diesel generators, Ireland&apos;s strain on a grid where data centers consume 22% of national electricity, and Arizona&apos;s water stress in desert communities affect real people&apos;s health, utility bills, and quality of life daily.
          </p>
          <p className="mb-3">
            Second, <strong>the pace of growth is outstripping planning capacity</strong>. Data centers can be operational in 2–3 years, but new power plants and transmission lines can take over a decade to permit and build in the U.S. and EU. PJM&apos;s 833% capacity price increase translates directly to higher electricity bills for all customers in the region.
          </p>
          <p className="mb-3">
            Third, <strong>corporate transparency remains inadequate</strong>. As researcher Hannah Ritchie documented, all the world&apos;s text queries to chatbots account for only about <strong>2% of AI data center electricity consumption</strong> — meaning 98% goes to training, enterprise deployment, and invisible AI integration. Without better disclosure, the public cannot assess whether the benefits justify the costs.
          </p>
          <p>
            Fourth, <strong>the &ldquo;efficiency gains&rdquo; argument has limits</strong>. The industry faces an 18% compound annual growth rate in electricity consumption. As one Harvard Belfer Center analysis warned: &ldquo;For the past two decades, U.S. electricity consumption was essentially flat; AI is now driving that growth rate several times faster.&rdquo;
          </p>
        </PerspectiveBox>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 11                                                       */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section11">11. Perspective Two: The Case That Impacts Are Overblown</SectionHeading>

        <PerspectiveBox
          variant="counter"
          heading="The Counter-Argument: Aggregate Impact Is Small, and Efficiency Trends Are Strong"
          headingColor="#16a34a"
        >
          <p className="mb-3">
            The &ldquo;overblown&rdquo; camp makes several powerful points grounded in hard data. First, <strong>the aggregate footprint remains small</strong>. At 1.5% of global electricity and 4.4% of U.S. electricity, data centers are not among the largest energy-consuming sectors. Residential heating and cooling alone accounts for roughly 12% of U.S. electricity. The chemical industry consumes 32% of French energy.
          </p>
          <p className="mb-3">
            Second, <strong>the water comparison is genuinely lopsided</strong>. AI data centers consume approximately <strong>0.008% of America&apos;s freshwater</strong>. Golf courses use 30 times more water in Arizona alone. The alarm over AI water use, when presented without this context, is statistically misleading.
          </p>
          <p className="mb-3">
            Third, <strong>alarmist predictions have been wrong before</strong>. A peer-reviewed article from 2015 predicted data centers would consume 1,200 TWh by 2020 — a figure that proved completely wrong. DeepSeek&apos;s demonstration that highly capable AI models can be trained far more cheaply than assumed suggests that efficiency gains may constrain demand growth more than current forecasts assume.
          </p>
          <p className="mb-3">
            Fourth, <strong>data centers deliver enormous public value per unit of resource consumed</strong>. A single Google data center serving millions of people worldwide uses the water equivalent of 1.2 golf courses. Data centers in Maricopa County generate 50 times as much tax revenue per gallon of water as golf courses.
          </p>
          <p>
            Fifth, <strong>the industry is proactively addressing concerns</strong>. Microsoft&apos;s zero-water cooling commitment, Google&apos;s 24/7 carbon-free energy goal, the rapid adoption of liquid cooling, and the pivot to nuclear power all demonstrate that major operators are investing heavily in mitigation, often ahead of regulatory requirements.
          </p>
        </PerspectiveBox>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 12                                                       */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section12">12. Perspective Three: The Nuanced Middle Ground</SectionHeading>

        <PerspectiveBox
          variant="nuance"
          heading="The Balanced View: It Depends on Scale, Geography, and Governance"
          headingColor="#d97706"
        >
          <p className="mb-3">
            The most defensible position is that <strong>both perspectives are partially correct</strong> — and the truth depends entirely on the level of analysis and geographic specificity. At the national and global scale, data center resource consumption is genuinely a small fraction of totals and is being addressed through efficiency improvements and clean energy procurement. At the local scale, in communities like Northern Virginia, eastern Washington State, and parts of Arizona, the impacts are concentrated enough to cause genuine harm without proper mitigation.
          </p>
          <p className="mb-3">
            The &ldquo;overblown&rdquo; argument fails when it dismisses local impacts with national averages. A community where data center diesel generators operate 50 hours per year for demand response, emitting NOx at rates <strong>200–600 times higher</strong> than natural gas power plants per unit of electricity, is experiencing a real environmental injustice — even if national totals look modest. Similarly, a rural county where Dominion Energy has proposed rate increases adding <strong>$8.51/month in 2026</strong> to typical household bills faces a concrete economic burden.
          </p>
          <p className="mb-3">
            Conversely, the &ldquo;crisis&rdquo; narrative fails when it ignores the remarkable efficiency gains, small aggregate footprints, and genuine economic benefits. The appropriate response is not a nationwide moratorium but <strong>smart, location-specific governance</strong> — requiring Tier 4 generators, mandating closed-loop cooling in water-stressed regions, ensuring data centers pay their full share of grid costs, and requiring community benefit agreements.
          </p>
          <p>
            Virginia&apos;s new GS-5 rate class, which requires large data centers to pay for at least 85% of contracted demand regardless of actual usage, shows how rate design can protect other customers from speculative load growth. Ohio saw data center requests drop from <strong>30 GW to 13 GW</strong> after adopting similar provisions — suggesting that requiring financial commitment filters out speculative projects while allowing genuine demand to proceed.
          </p>
        </PerspectiveBox>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 13                                                       */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionHeading id="section13">13. Conclusion: Balancing Innovation with Responsibility</SectionHeading>

        <Para>
          The AI data center boom represents one of the most consequential infrastructure build-outs of the early 21st century. The societal and environmental impacts are neither the existential crisis some activists portray nor the trivial externality some industry defenders suggest. They are <strong>real, geographically concentrated, and amenable to smart policy</strong> — but only if policymakers, industry leaders, and communities engage honestly with the trade-offs.
        </Para>

        <Para>
          Several principles emerge from this analysis. <strong>First</strong>, aggregate statistics about national energy or water consumption are poor guides to local policy. A data center in water-rich Finland poses fundamentally different challenges than the same facility in drought-prone Arizona. <strong>Second</strong>, the diesel generator problem is the most underappreciated environmental cost and the most easily addressed through Tier 4 requirements, battery storage alternatives, and restricted demand response participation. <strong>Third</strong>, economic benefits are substantial but contingent on tax structure — communities offering excessive incentives may capture little net revenue. <strong>Fourth</strong>, efficiency gains are genuine and impressive but insufficient to fully offset the scale of AI-driven demand growth.
        </Para>

        {/* Key takeaway */}
        <div className="rounded-xl p-7 my-8" style={{ background: '#1e3a5f' }}>
          <h4 className="font-bold text-base mb-3" style={{ color: '#bfdbfe' }}>Key Takeaway</h4>
          <p className="text-sm leading-7" style={{ color: '#e5e7eb' }}>
            The data center debate needs less rhetoric and more nuance. AI infrastructure is essential for economic competitiveness, scientific progress, and the digital services billions of people rely on daily. It is also imposing real costs on specific communities that deserve protection. The solution is not to stop building data centers or to ignore their impacts, but to build them{' '}
            <strong className="text-white">better, smarter, and more equitably</strong> — with stricter efficiency standards, cleaner backup power, fair rate design, and genuine community engagement. The technology exists. The regulatory models are emerging. What remains is the political will to implement them before the next 700 data centers are built.
          </p>
        </div>

        {/* Methodology */}
        <div
          className="rounded-xl p-7 mt-10 mb-4"
          style={{ background: 'var(--pan-surface)', border: '1px solid var(--pan-border)' }}
        >
          <h3 className="text-base font-bold mb-3" style={{ color: 'var(--pan-body)' }}>
            Methodology and Data Sources
          </h3>
          <p className="text-sm leading-7" style={{ color: 'var(--pan-muted)' }}>
            This report synthesizes data from the International Energy Agency (IEA) Energy and AI Report (2025), Lawrence Berkeley National Laboratory&apos;s U.S. Data Center Energy Usage Report (2024), Goldman Sachs Research, BloombergNEF, the Harvard Belfer Center, UC Riverside public health studies, JLL commercial real estate research, Brookings Institution analyses, and primary regulatory documents from the EU Commission, Virginia State Corporation Commission, and Washington State Department of Ecology. All projections reflect the most recent authoritative estimates available as of June 2026. Where ranges are given, they represent the spread between conservative and aggressive scenarios from recognized analytical bodies.
          </p>
        </div>

      </div>
    </>
  )
}
