import React from 'react';
import { useExperiment } from '../contexts/ExperimentContext';
import { PricingCard } from './PricingCard';

const pricingTiers = [
  {
    name: 'Starter',
    price: 29,
    period: 'month',
    features: [
      { text: '5 Team Members', included: true },
      { text: 'Basic Analytics', included: true },
      { text: '24/7 Support', included: true },
      { text: 'Custom Domain', included: false },
      { text: 'Advanced Security', included: false },
    ],
  },
  {
    name: 'Professional',
    price: 79,
    period: 'month',
    highlighted: true,
    features: [
      { text: 'Unlimited Team Members', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Custom Domain', included: true },
      { text: 'Advanced Security', included: true },
    ],
  },
  {
    name: 'Enterprise',
    price: 199,
    period: 'month',
    features: [
      { text: 'Unlimited Everything', included: true },
      { text: 'Custom Analytics', included: true },
      { text: 'Dedicated Support', included: true },
      { text: 'Multiple Domains', included: true },
      { text: 'Enterprise Security', included: true },
    ],
  },
];

export function PricingPage() {
  const { variants, trackEvent } = useExperiment();
  const variant = variants['pricing-layout'];

  const handleSelect = (tierName: string) => {
    trackEvent('pricing_selected', {
      tier: tierName,
      variant,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your team's needs
          </p>
        </div>

        <div className={`
          grid gap-8 max-w-7xl mx-auto
          ${variant === 'A'
            ? 'md:grid-cols-3'
            : 'lg:grid-cols-3 md:grid-cols-2'
          }
        `}>
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              variant={variant}
              onSelect={() => handleSelect(tier.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}