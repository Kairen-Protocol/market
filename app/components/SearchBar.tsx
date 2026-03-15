'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

export type SearchFilters = {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  chain?: string;
  verifiedOnly: boolean;
};

type SearchBarProps = {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
};

export default function SearchBar({ filters, onFiltersChange, onSearch }: SearchBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="search-bar-wrapper">
      <form onSubmit={handleSubmit} className="search-bar">
        <div className="search-input-group">
          <Search className="h-5 w-5" />
          <input
            type="text"
            placeholder="Search services, providers, categories..."
            value={filters.query}
            onChange={(e) => onFiltersChange({ ...filters, query: e.target.value })}
            className="search-input"
          />
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`filter-toggle ${showAdvanced ? 'active' : ''}`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {showAdvanced && (
          <div className="advanced-filters">
            <div className="filter-row">
              <label>
                Min Price (USDC)
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={filters.minPrice || ''}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })
                  }
                />
              </label>
              <label>
                Max Price (USDC)
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="100.00"
                  value={filters.maxPrice || ''}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
                  }
                />
              </label>
              <label>
                Blockchain
                <select value={filters.chain || ''} onChange={(e) => onFiltersChange({ ...filters, chain: e.target.value || undefined })}>
                  <option value="">All Chains</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="base">Base</option>
                  <option value="polygon">Polygon</option>
                  <option value="arbitrum">Arbitrum</option>
                  <option value="optimism">Optimism</option>
                  <option value="solana">Solana</option>
                </select>
              </label>
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={(e) => onFiltersChange({ ...filters, verifiedOnly: e.target.checked })}
              />
              <span>Verified providers only</span>
            </label>
            <button
              type="button"
              onClick={() =>
                onFiltersChange({ query: '', verifiedOnly: false })
              }
              className="clear-filters"
            >
              <X className="h-4 w-4" />
              Clear filters
            </button>
          </div>
        )}

        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
}
