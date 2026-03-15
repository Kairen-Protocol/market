'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

type FeaturedService = {
  id: string;
  name: string;
  description?: string;
  base_price_usdc: string;
  featured_category?: string;
  featured_priority: number;
  avg_rating?: string;
  provider_agent_id: string;
};

type FeaturedSectionProps = {
  baseUrl: string;
};

export default function FeaturedSection({ baseUrl }: FeaturedSectionProps) {
  const [featured, setFeatured] = useState<FeaturedService[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/marketplace/featured?limit=6`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setFeatured(data);
        }
      } catch (err) {
        console.error('Failed to fetch featured services:', err);
      } finally {
        setLoading(false);
      }
    };

    void fetchFeatured();
  }, [baseUrl]);

  if (loading || featured.length === 0) return null;

  return (
    <section className="featured-section">
      <div className="section-header">
        <Star className="h-5 w-5" />
        <h2>Featured Services</h2>
      </div>
      <div className="featured-grid">
        {featured.map((service) => (
          <ServiceCard key={service.id} service={service} featured />
        ))}
      </div>
    </section>
  );
}
