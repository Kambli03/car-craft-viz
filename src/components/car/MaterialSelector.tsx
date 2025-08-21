import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MaterialSelectorProps {
  selectedMaterial: 'metallic' | 'matte' | 'glossy';
  onMaterialChange: (material: 'metallic' | 'matte' | 'glossy') => void;
}

const materials = [
  {
    type: 'metallic' as const,
    name: 'Metallic',
    description: 'Premium metallic finish with deep shine',
    icon: '✨',
    gradient: 'from-slate-300 to-slate-500'
  },
  {
    type: 'matte' as const,
    name: 'Matte',
    description: 'Sophisticated non-reflective surface',
    icon: '🎯',
    gradient: 'from-gray-400 to-gray-600'
  },
  {
    type: 'glossy' as const,
    name: 'Glossy',
    description: 'High-gloss mirror-like finish',
    icon: '💎',
    gradient: 'from-blue-300 to-blue-500'
  }
];

export function MaterialSelector({ selectedMaterial, onMaterialChange }: MaterialSelectorProps) {
  return (
    <div className="control-panel">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Paint Finish</h3>
      <div className="space-y-3">
        {materials.map((material) => (
          <Card
            key={material.type}
            className={`p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              selectedMaterial === material.type
                ? 'ring-2 ring-primary shadow-automotive bg-primary/10'
                : 'hover:ring-1 hover:ring-primary/50 bg-card/80'
            }`}
            onClick={() => onMaterialChange(material.type)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${material.gradient} shadow-lg flex items-center justify-center text-lg`}>
                {material.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{material.name}</h4>
                <p className="text-sm text-muted-foreground">{material.description}</p>
              </div>
              {selectedMaterial === material.type && (
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}