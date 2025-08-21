import React, { useState } from 'react';
import { Car3D } from './Car3D';
import { ColorPicker } from './ColorPicker';
import { MaterialSelector } from './MaterialSelector';
import { EnvironmentSelector } from './EnvironmentSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export function CarCustomizer() {
  const [carColor, setCarColor] = useState('#dc2626');
  const [material, setMaterial] = useState<'metallic' | 'matte' | 'glossy'>('metallic');
  const [environment, setEnvironment] = useState('studio');

  const handleSaveConfiguration = () => {
    const config = {
      color: carColor,
      material,
      environment,
      timestamp: new Date().toISOString()
    };
    
    // In a real app, this would save to a database
    localStorage.setItem('carConfiguration', JSON.stringify(config));
    toast("Configuration saved successfully!", {
      description: "Your custom car design has been saved."
    });
  };

  const handleShare = () => {
    const configUrl = `${window.location.origin}?color=${encodeURIComponent(carColor)}&material=${material}&env=${environment}`;
    navigator.clipboard.writeText(configUrl);
    toast("Share link copied!", {
      description: "Share this link to show your car design."
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-metallic bg-clip-text text-transparent">
                CarCraft Viz
              </h1>
              <p className="text-muted-foreground">Premium 3D Car Customization Platform</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="btn-metallic"
              >
                Share Design
              </Button>
              <Button 
                onClick={handleSaveConfiguration}
                className="btn-premium"
              >
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* 3D Viewport - Disabled */}
        <div className="flex-1 relative bg-muted/20 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-2">3D View Disabled</h3>
            <p className="text-sm">The 3D car visualization has been stopped</p>
          </div>
          
          {/* Floating Controls */}
          <div className="absolute top-6 left-6 z-10">
            <Card className="p-4 bg-card/90 backdrop-blur-lg border-border/50">
              <div className="text-sm text-muted-foreground mb-2">Current Configuration</div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: carColor }}
                  />
                  <span className="font-medium">Color: {carColor}</span>
                </div>
                <div>Material: <span className="font-medium capitalize">{material}</span></div>
                <div>Environment: <span className="font-medium capitalize">{environment}</span></div>
              </div>
            </Card>
          </div>
        </div>

        {/* Customization Panel */}
        <div className="w-80 bg-card/50 backdrop-blur-lg border-l border-border/50 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">Customize Your Vehicle</h2>
              <p className="text-sm text-muted-foreground">
                Select colors, materials, and environment to create your perfect car design.
              </p>
            </div>

            <Separator className="bg-border/50" />

            <ColorPicker 
              selectedColor={carColor}
              onColorChange={setCarColor}
            />

            <MaterialSelector 
              selectedMaterial={material}
              onMaterialChange={setMaterial}
            />

            <EnvironmentSelector 
              selectedEnvironment={environment}
              onEnvironmentChange={setEnvironment}
            />

            <Separator className="bg-border/50" />

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setCarColor('#dc2626');
                    setMaterial('metallic');
                    setEnvironment('studio');
                  }}
                  className="btn-metallic"
                >
                  Reset
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const colors = ['#dc2626', '#2563eb', '#059669', '#ea580c', '#7c3aed'];
                    const materials: Array<'metallic' | 'matte' | 'glossy'> = ['metallic', 'matte', 'glossy'];
                    setCarColor(colors[Math.floor(Math.random() * colors.length)]);
                    setMaterial(materials[Math.floor(Math.random() * materials.length)]);
                  }}
                  className="btn-metallic"
                >
                  Random
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}