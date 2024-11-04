import React from 'react';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: number;
  period: string;
  features: PricingFeature[];
  highlighted?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  variant: 'A' | 'B';
  onSelect: () => void;
}

export function PricingCard({ tier, variant, onSelect }: PricingCardProps) {
  const isVariantA = variant === 'A';

  return (
    <div
      className={`
        relative rounded-2xl p-8 h-full
        ${tier.highlighted
          ? 'bg-blue-50 border-2 border-blue-500'
          : 'bg-white border border-gray-200'
        }
        ${isVariantA ? 'hover:scale-105' : 'hover:shadow-xl'}
        transition-all duration-300
      `}
    >
      {tier.highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{tier.name}</h3>
        <div className="flex items-baseline justify-center gap-x-2">
          <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
          <span className="text-gray-500">/{tier.period}</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-x-3">
            <Check
              className={feature.included ? 'text-blue-500' : 'text-gray-300'}
              size={20}
            />
            <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`
          w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200
          ${isVariantA
            ? tier.highlighted
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            : tier.highlighted
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }
        `}
      >
        Get Started
      </button>
    </div>
  );
}