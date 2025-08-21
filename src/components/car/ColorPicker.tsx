import React from 'react';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const carColors = [
  { name: 'Arctic White', value: '#ffffff', gradient: 'from-gray-100 to-white' },
  { name: 'Midnight Black', value: '#000000', gradient: 'from-gray-900 to-black' },
  { name: 'Racing Red', value: '#dc2626', gradient: 'from-red-600 to-red-700' },
  { name: 'Electric Blue', value: '#2563eb', gradient: 'from-blue-600 to-blue-700' },
  { name: 'Forest Green', value: '#059669', gradient: 'from-green-600 to-green-700' },
  { name: 'Sunset Orange', value: '#ea580c', gradient: 'from-orange-600 to-orange-700' },
  { name: 'Royal Purple', value: '#7c3aed', gradient: 'from-purple-600 to-purple-700' },
  { name: 'Chrome Silver', value: '#64748b', gradient: 'from-slate-400 to-slate-600' },
];

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="control-panel">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Paint Colors</h3>
      <div className="grid grid-cols-2 gap-3">
        {carColors.map((color) => (
          <Button
            key={color.value}
            variant={selectedColor === color.value ? "default" : "outline"}
            className={`h-16 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 ${
              selectedColor === color.value 
                ? 'ring-2 ring-primary shadow-automotive' 
                : 'hover:ring-1 hover:ring-primary/50'
            }`}
            onClick={() => onColorChange(color.value)}
          >
            <div 
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${color.gradient} shadow-lg`}
              style={{ backgroundColor: color.value }}
            />
            <span className="text-xs font-medium">{color.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}