import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EnvironmentSelectorProps {
  selectedEnvironment: string;
  onEnvironmentChange: (environment: string) => void;
}

const environments = [
  {
    value: 'studio',
    name: 'Studio',
    description: 'Professional photography lighting',
    icon: '📸',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-300'
  },
  {
    value: 'city',
    name: 'Urban',
    description: 'Modern city environment',
    icon: '🏙️',
    preview: 'bg-gradient-to-br from-blue-200 to-slate-400'
  },
  {
    value: 'sunset',
    name: 'Sunset',
    description: 'Golden hour lighting',
    icon: '🌅',
    preview: 'bg-gradient-to-br from-orange-300 to-pink-400'
  },
  {
    value: 'forest',
    name: 'Nature',
    description: 'Natural outdoor setting',
    icon: '🌲',
    preview: 'bg-gradient-to-br from-green-300 to-green-500'
  }
];

export function EnvironmentSelector({ selectedEnvironment, onEnvironmentChange }: EnvironmentSelectorProps) {
  return (
    <div className="control-panel">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Environment</h3>
      <div className="grid grid-cols-2 gap-3">
        {environments.map((env) => (
          <Card
            key={env.value}
            className={`p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              selectedEnvironment === env.value
                ? 'ring-2 ring-primary shadow-automotive'
                : 'hover:ring-1 hover:ring-primary/50'
            }`}
            onClick={() => onEnvironmentChange(env.value)}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-8 rounded ${env.preview} shadow-lg flex items-center justify-center text-lg`}>
                {env.icon}
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-sm text-foreground">{env.name}</h4>
                <p className="text-xs text-muted-foreground">{env.description}</p>
              </div>
              {selectedEnvironment === env.value && (
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}