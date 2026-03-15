'use client';

import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

type TrendingService = {
  id: string;
  name: string;
  provider_agent_id: string;
  base_price_usdc: string;
  avg_rating?: string;
  trending_score: number;
  requests_7d: number;
  revenue_7d: string;
};

type TrendingSectionProps = {
  baseUrl: string;
};

export default function TrendingSection({ baseUrl }: TrendingSectionProps) {
  const [trending, setTrending] = useState<TrendingService[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/marketplace/trending?limit=6`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setTrending(data);
        }
      } catch (err) {
        console.error('Failed to fetch trending services:', err);
      } finally {
        setLoading(false);
      }
    };

    void fetchTrending();
  }, [baseUrl]);

  if (loading || trending.length === 0) return null;

  return (
    <section className="trending-section">
      <div className="section-header">
        <TrendingUp className="h-5 w-5" />
        <h2>Trending This Week</h2>
      </div>
      <div className="trending-grid">
        {trending.map((service) => (
          <ServiceCard key={service.id} service={service} trending />
        ))}
      </div>
    </section>
  );
}
