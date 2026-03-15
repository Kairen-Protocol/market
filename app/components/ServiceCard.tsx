'use client';

import { Award, Clock, ShieldCheck, Star, TrendingUp } from 'lucide-react';

type ServiceCardProps = {
  service: {
    id: string;
    name: string;
    description?: string;
    base_price_usdc?: string | number;
    avg_rating?: string | number;
    provider_name?: string;
    provider_agent_name?: string;
    supported_chains?: string[];
    verified?: boolean;
    featured_category?: string;
    created_at?: string;
    updated_at?: string;
  };
  badges?: string[];
  trending?: boolean;
  featured?: boolean;
  onClick?: () => void;
};

export default function ServiceCard({ service, badges, trending, featured, onClick }: ServiceCardProps) {
  const formatPrice = (price?: string | number) => {
    if (!price) return 'n/a';
    const amount = Number(price);
    if (!Number.isFinite(amount)) return String(price);
    return `${amount.toFixed(4)} USDC`;
  };

  const formatRating = (rating?: string | number) => {
    if (!rating) return null;
    const score = Number(rating);
    if (!Number.isFinite(score)) return null;
    return score.toFixed(1);
  };

  const rating = formatRating(service.avg_rating);

  return (
    <article className={`service-card ${featured ? 'featured' : ''} ${trending ? 'trending' : ''}`} onClick={onClick}>
      <div className="service-card-header">
        <div className="service-card-title">
          <h3>{service.name || service.id || 'unnamed service'}</h3>
          {service.verified && (
            <ShieldCheck className="h-4 w-4 verified-badge" aria-label="Verified Provider" />
          )}
        </div>
        <div className="service-card-badges">
          {trending && (
            <span className="badge badge-trending">
              <TrendingUp className="h-3 w-3" />
              Trending
            </span>
          )}
          {featured && service.featured_category && (
            <span className={`badge badge-${service.featured_category}`}>
              <Award className="h-3 w-3" />
              {service.featured_category}
            </span>
          )}
        </div>
      </div>

      <p className="service-description">{service.description || 'No description provided.'}</p>

      <div className="service-metadata">
        <div className="metadata-row">
          <span className="label">Provider:</span>
          <span className="value">{service.provider_name || service.provider_agent_name || 'n/a'}</span>
        </div>
        <div className="metadata-row">
          <span className="label">Price:</span>
          <span className="value price">{formatPrice(service.base_price_usdc)}</span>
        </div>
        {rating && (
          <div className="metadata-row">
            <Star className="h-4 w-4 star-icon" />
            <span className="value rating">{rating}</span>
          </div>
        )}
        <div className="metadata-row">
          <span className="label">Chains:</span>
          <span className="value chains">{(service.supported_chains || []).join(', ') || 'n/a'}</span>
        </div>
      </div>

      {badges && badges.length > 0 && (
        <div className="provider-badges">
          {badges.map((badge) => (
            <span key={badge} className={`provider-badge badge-${badge}`}>
              {badge}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
