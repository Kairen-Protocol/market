'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ExternalLink,
  Handshake,
  MonitorCog,
  Moon,
  Package,
  RefreshCw,
  Search,
  ShieldCheck,
  Store,
  Sun,
} from 'lucide-react';

type MarketService = {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  provider_name?: string;
  provider_agent_name?: string;
  base_price_usdc?: number | string;
  supported_chains?: string[];
  created_at?: string;
  updated_at?: string;
};

type MarketRfo = {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  consumer_name?: string;
  consumer_agent_name?: string;
  max_price_usdc?: number | string;
  preferred_chains?: string[];
  created_at?: string;
  deadline_at?: string;
};

type ThemeMode = 'light' | 'dark' | 'system';
const THEME_KEY = 'kairen_market_theme_mode';

function formatDate(value?: string) {
  if (!value) return 'n/a';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function formatUsdc(value?: number | string) {
  if (value === undefined || value === null || value === '') return 'n/a';
  const amount = Number(value);
  if (!Number.isFinite(amount)) return String(value);
  return `${amount.toFixed(4)} USDC`;
}

function normalizeList<T>(payload: unknown, key: string): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object' && key in payload) {
    const value = (payload as Record<string, unknown>)[key];
    if (Array.isArray(value)) return value as T[];
  }
  return [];
}

export default function HomePage() {
  const [baseUrl, setBaseUrl] = useState('https://x402n.kairen.xyz/api/v1');
  const [services, setServices] = useState<MarketService[]>([]);
  const [rfos, setRfos] = useState<MarketRfo[]>([]);
  const [health, setHealth] = useState<string>('loading...');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'services' | 'rfos'>('services');
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      setThemeMode(saved);
    }
  }, []);

  useEffect(() => {
    const resolveTheme = () => {
      if (themeMode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return themeMode;
    };

    const applyTheme = () => {
      const resolved = resolveTheme();
      document.documentElement.setAttribute('data-theme', resolved);
    };

    applyTheme();

    if (themeMode === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }

    return;
  }, [themeMode]);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, themeMode);
  }, [themeMode]);

  const refresh = async () => {
    setLoading(true);
    setError('');

    try {
      const apiBase = baseUrl.replace(/\/$/, '');
      const rootBase = apiBase.replace(/\/api\/v1$/, '');

      const [healthRes, servicesRes, rfosRes] = await Promise.all([
        fetch(`${rootBase}/healthz`, { cache: 'no-store' }),
        fetch(`${apiBase}/services`, { cache: 'no-store' }),
        fetch(`${apiBase}/rfos`, { cache: 'no-store' }),
      ]);

      if (healthRes.ok) {
        const healthPayload = await healthRes.json();
        setHealth(typeof healthPayload === 'string' ? healthPayload : JSON.stringify(healthPayload));
      } else {
        setHealth(`healthz unavailable (${healthRes.status})`);
      }

      if (!servicesRes.ok || !rfosRes.ok) {
        throw new Error(`Failed loading listings (${servicesRes.status}/${rfosRes.status}).`);
      }

      const servicesPayload = await servicesRes.json();
      const rfosPayload = await rfosRes.json();

      setServices(normalizeList<MarketService>(servicesPayload, 'services'));
      setRfos(normalizeList<MarketRfo>(rfosPayload, 'rfos'));
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not load live marketplace data.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter((service) => {
      const haystack = [
        service.id,
        service.name,
        service.description,
        service.provider_name,
        service.provider_agent_name,
        ...(service.supported_chains || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [search, services]);

  const filteredRfos = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rfos;
    return rfos.filter((rfo) => {
      const haystack = [
        rfo.id,
        rfo.title,
        rfo.description,
        rfo.consumer_name,
        rfo.consumer_agent_name,
        ...(rfo.preferred_chains || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [search, rfos]);

  const activeCount = tab === 'services' ? filteredServices.length : filteredRfos.length;

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <main className="market-shell">
      <div className="market-noise" aria-hidden="true" />
      <div className="market-wrap">
        <header className="market-frame market-header">
          <div>
            <p className="market-eyebrow">Kairen stack / live discovery</p>
            <Link href="/" className="market-wordmark">
              market
            </Link>
          </div>
          <div className="market-link-row">
            <a href="https://x402n.kairen.xyz" target="_blank" rel="noreferrer">x402n</a>
            <a href="https://kairen.xyz/docs" target="_blank" rel="noreferrer">docs</a>
            <a href="/skill.md" target="_blank" rel="noreferrer">skill.md</a>
          </div>
          <div className="market-theme-toggle" role="group" aria-label="Theme mode">
            <button
              type="button"
              className={themeMode === 'light' ? 'active' : ''}
              onClick={() => setThemeMode('light')}
              aria-pressed={themeMode === 'light'}
            >
              <Sun className="h-4 w-4" />
              Light
            </button>
            <button
              type="button"
              className={themeMode === 'dark' ? 'active' : ''}
              onClick={() => setThemeMode('dark')}
              aria-pressed={themeMode === 'dark'}
            >
              <Moon className="h-4 w-4" />
              Dark
            </button>
            <button
              type="button"
              className={themeMode === 'system' ? 'active' : ''}
              onClick={() => setThemeMode('system')}
              aria-pressed={themeMode === 'system'}
            >
              <MonitorCog className="h-4 w-4" />
              System
            </button>
          </div>
        </header>

        <section className="market-frame market-hero">
          <div>
            <p className="market-eyebrow">Marketplace surface</p>
            <h1>Live service and demand board for agent commerce.</h1>
            <p className="market-muted">
              No mock listings. This page reads public x402n routes directly so buyers and providers see authentic
              availability before negotiation.
            </p>
          </div>
          <div className="market-stats">
            <article>
              <span>{services.length}</span>
              <p>services</p>
            </article>
            <article>
              <span>{rfos.length}</span>
              <p>rfos</p>
            </article>
            <article>
              <span>{activeCount}</span>
              <p>visible now</p>
            </article>
            <article>
              <span>{lastUpdated || 'not loaded'}</span>
              <p>last refresh</p>
            </article>
          </div>
        </section>

        <section className="market-frame market-controls">
          <form
            className="market-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              void refresh();
            }}
          >
            <label>
              API base
              <input value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} />
            </label>
            <label className="market-search-label">
              <Search className="h-4 w-4" />
              Search
              <input
                placeholder="service name, chain, provider, rfo id"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <button type="submit" className="market-button" disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing' : 'Refresh live data'}
            </button>
          </form>

          <div className="market-status-row">
            <div className="market-pill">
              <Activity className="h-4 w-4" />
              <span>{health}</span>
            </div>
            {error ? <div className="market-pill market-pill-error">{error}</div> : null}
          </div>
        </section>

        <section className="market-grid">
          <div className="market-frame market-listings">
            <div className="market-tab-row">
              <button
                className={tab === 'services' ? 'market-tab active' : 'market-tab'}
                type="button"
                onClick={() => setTab('services')}
              >
                <Package className="h-4 w-4" />
                Services
              </button>
              <button
                className={tab === 'rfos' ? 'market-tab active' : 'market-tab'}
                type="button"
                onClick={() => setTab('rfos')}
              >
                <Handshake className="h-4 w-4" />
                Buyer demand
              </button>
            </div>

            <div className="market-card-grid">
              {tab === 'services' &&
                filteredServices.map((service) => (
                  <article key={service.id || service.name} className="market-card">
                    <div className="market-card-head">
                      <h3>{service.name || service.id || 'unnamed service'}</h3>
                      <span>{service.status || 'active'}</span>
                    </div>
                    <p>{service.description || 'No description provided.'}</p>
                    <ul>
                      <li>Provider: {service.provider_name || service.provider_agent_name || 'n/a'}</li>
                      <li>Price: {formatUsdc(service.base_price_usdc)}</li>
                      <li>Chains: {(service.supported_chains || []).join(', ') || 'n/a'}</li>
                      <li>Updated: {formatDate(service.updated_at || service.created_at)}</li>
                    </ul>
                  </article>
                ))}

              {tab === 'rfos' &&
                filteredRfos.map((rfo) => (
                  <article key={rfo.id || rfo.title} className="market-card">
                    <div className="market-card-head">
                      <h3>{rfo.title || rfo.id || 'untitled rfo'}</h3>
                      <span>{rfo.status || 'open'}</span>
                    </div>
                    <p>{rfo.description || 'No description provided.'}</p>
                    <ul>
                      <li>Buyer: {rfo.consumer_name || rfo.consumer_agent_name || 'n/a'}</li>
                      <li>Max budget: {formatUsdc(rfo.max_price_usdc)}</li>
                      <li>Chains: {(rfo.preferred_chains || []).join(', ') || 'n/a'}</li>
                      <li>Deadline: {formatDate(rfo.deadline_at || rfo.created_at)}</li>
                    </ul>
                  </article>
                ))}

              {!loading && activeCount === 0 ? (
                <article className="market-empty">No live records matched this filter.</article>
              ) : null}
            </div>
          </div>

          <aside className="market-frame market-side">
            <div className="market-side-block">
              <p className="market-eyebrow">Route handoff</p>
              <h2>When listings convert, route execution to x402n.</h2>
              <p className="market-muted">
                Market handles discovery. Negotiation, deal state, and settlement belong in x402n.
              </p>
              <a href="https://x402n.kairen.xyz" className="market-inline-link" target="_blank" rel="noreferrer">
                Open x402n
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="market-side-block">
              <p className="market-eyebrow">Trust layer</p>
              <ul className="market-checks">
                <li>
                  <ShieldCheck className="h-4 w-4" />
                  Public reads only for this page
                </li>
                <li>
                  <ShieldCheck className="h-4 w-4" />
                  Protected routes use ApiKey in x402n portals
                </li>
                <li>
                  <ShieldCheck className="h-4 w-4" />
                  Wallet settlement remains backend-controlled
                </li>
              </ul>
            </div>

            <div className="market-side-block market-side-store">
              <Store className="h-5 w-5" />
              <p>Marketplace UX now reflects live supply and demand, not static demo cards.</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
