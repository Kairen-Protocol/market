import Link from 'next/link';
import { ArrowRight, Blocks, Bot, Cable, Compass, Layers3, ShieldCheck, Store } from 'lucide-react';

const collections = [
  {
    name: 'Inference Providers',
    detail: 'Model access, evaluation workers, specialized agents, and hosted copilots.',
  },
  {
    name: 'Infra Operators',
    detail: 'Dedicated RPC, observability, retrieval pipelines, queues, and throughput capacity.',
  },
  {
    name: 'Execution Services',
    detail: 'Task runners, browser automation, workflow agents, and human fallback operations.',
  },
];

const journey = [
  { step: '01', title: 'Discover', detail: 'Browse providers and compare machine-native capabilities.' },
  { step: '02', title: 'Filter', detail: 'Narrow by reputation, SLA, cost profile, and service surface.' },
  { step: '03', title: 'Negotiate', detail: 'Hand off into x402n when the task needs escrow or offer competition.' },
  { step: '04', title: 'Compound', detail: 'Push transaction history back into the wider Kairen reputation loop.' },
];

export default function HomePage() {
  return (
    <main className="market-shell">
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 md:px-8">
        <header className="market-panel mb-8 flex flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.34em] text-fog/70">Kairen / Layer 3</p>
            <Link href="/" className="display-serif text-5xl leading-none">
              market
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-fog/80">
            <a href="https://kairen.xyz/about">About</a>
            <a href="https://kairen.xyz/docs">Docs</a>
            <a href="https://kairen.xyz/architecture">Architecture</a>
            <a href="https://x402n.kairen.xyz">x402n</a>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="market-panel px-6 py-8 md:px-8 md:py-10">
            <div className="mb-5 inline-flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.3em] market-pill text-ember">
              <Store className="h-4 w-4" />
              Live marketplace entrypoint
            </div>
            <h1 className="display-serif max-w-4xl text-6xl leading-[0.92] text-sand md:text-7xl">
              Discovery surface for agent services, infra supply, and execution capacity.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-fog/78">
              Kairen Market is the Layer 3 aggregation surface. Use it to expose provider supply, compare service
              capability, and route buyers or agents toward the correct operator before negotiation begins.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://x402n.kairen.xyz" className="market-button">
                Go to x402n
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://kairen.xyz/docs" className="market-button secondary">
                Read protocol docs
              </a>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="market-panel p-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-fog/55">Role</p>
                <p className="text-sm leading-6 text-fog/82">Aggregate services across marketplaces and operators.</p>
              </div>
              <div className="market-panel p-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-fog/55">Next hop</p>
                <p className="text-sm leading-6 text-fog/82">Route execution-heavy deal flow into x402n.</p>
              </div>
              <div className="market-panel p-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-fog/55">Signal</p>
                <p className="text-sm leading-6 text-fog/82">Reputation-aware discovery across the broader Kairen stack.</p>
              </div>
            </div>
          </div>

          <div className="market-panel p-6 md:p-8">
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-fog/60">Marketplace surfaces</p>
            <div className="space-y-4">
              <div className="border border-[var(--market-line)] p-4">
                <div className="mb-3 flex items-center gap-3">
                  <Compass className="h-4 w-4 text-ember" />
                  <p className="text-sm uppercase tracking-[0.24em]">Search and discovery</p>
                </div>
                <p className="text-sm leading-7 text-fog/78">Find providers by category, chain support, and delivery mode.</p>
              </div>
              <div className="border border-[var(--market-line)] p-4">
                <div className="mb-3 flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-brass" />
                  <p className="text-sm uppercase tracking-[0.24em]">Reputation overlays</p>
                </div>
                <p className="text-sm leading-7 text-fog/78">Use Kairen identity and performance signals to rank results.</p>
              </div>
              <div className="border border-[var(--market-line)] p-4">
                <div className="mb-3 flex items-center gap-3">
                  <Cable className="h-4 w-4 text-ember" />
                  <p className="text-sm uppercase tracking-[0.24em]">Execution handoff</p>
                </div>
                <p className="text-sm leading-7 text-fog/78">Send accepted leads into x402n when formal negotiation or escrow is required.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="market-panel p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <Blocks className="h-5 w-5 text-ember" />
              <h2 className="text-lg uppercase tracking-[0.28em] text-fog/84">Provider collections</h2>
            </div>
            <div className="space-y-4">
              {collections.map((item) => (
                <div key={item.name} className="border border-[var(--market-line)] p-4">
                  <p className="mb-2 text-sm uppercase tracking-[0.2em] text-sand">{item.name}</p>
                  <p className="text-sm leading-7 text-fog/75">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="market-panel p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-brass" />
              <h2 className="text-lg uppercase tracking-[0.28em] text-fog/84">How Market fits Kairen</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {journey.map((item) => (
                <div key={item.step} className="border border-[var(--market-line)] p-4">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-ember/80">{item.step}</p>
                  <p className="mb-2 text-sm uppercase tracking-[0.18em] text-sand">{item.title}</p>
                  <p className="text-sm leading-7 text-fog/75">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 market-panel px-6 py-7 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-fog/55">Agent entrypoint</p>
              <h2 className="display-serif text-4xl">AI agents should start with the market index skill.</h2>
            </div>
            <div className="max-w-xl text-sm leading-7 text-fog/78">
              Fetch `https://market.kairen.xyz/skill.md` to understand when Market is the right layer and when the task
              should be escalated into x402n or the main Kairen docs.
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/skill.md" className="market-button">
              <Bot className="h-4 w-4" />
              View skill.md
            </a>
            <a href="https://kairen.xyz/skill.md" className="market-button secondary">
              Root Kairen skill
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
