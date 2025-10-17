import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Type, Minus, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AccessibilityControls() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    // Load saved preferences
    const savedContrast = localStorage.getItem('highContrast') === 'true';
    const savedFontSize = parseInt(localStorage.getItem('fontSize') || '16');
    
    setHighContrast(savedContrast);
    setFontSize(savedFontSize);
    
    if (savedContrast) {
      document.body.classList.add('high-contrast');
    }
    document.documentElement.style.fontSize = `${savedFontSize}px`;
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', String(newValue));
    
    if (newValue) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(14, Math.min(20, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem('fontSize', String(newSize));
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          data-testid="button-accessibility"
          title="Accessibility Options"
        >
          <Eye className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Accessibility</h3>
              
              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">High Contrast</span>
                </div>
                <Button
                  variant={highContrast ? 'default' : 'outline'}
                  size="sm"
                  onClick={toggleHighContrast}
                  data-testid="button-toggle-contrast"
                >
                  {highContrast ? 'On' : 'Off'}
                </Button>
              </div>

              {/* Font Size Adjuster */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Type className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Font Size</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustFontSize(-1)}
                    disabled={fontSize <= 14}
                    data-testid="button-decrease-font"
                  >
                    <Minus className="w-4 h-4" />
                    <span className="ml-1">A</span>
                  </Button>
                  <div className="flex-1 text-center text-sm font-medium">
                    {fontSize}px
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustFontSize(1)}
                    disabled={fontSize >= 20}
                    data-testid="button-increase-font"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="ml-1">A</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
