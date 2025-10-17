import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import IssueMap from '@/components/IssueMap';
import HeatmapLayer from '@/components/HeatmapLayer';
import { mockIssues, getCategoryLabel } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, X, Map as MapIcon, Flame } from 'lucide-react';
import type { Issue } from '@/lib/mockData';
import 'leaflet/dist/leaflet.css';

export default function PublicMap() {
  const [selectedCategories, setSelectedCategories] = useState<Issue['category'][]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'markers' | 'heatmap'>('markers');

  const categories: Issue['category'][] = ['potholes', 'garbage', 'streetlight', 'drainage', 'other'];
  
  const filteredIssues = selectedCategories.length > 0
    ? mockIssues.filter(issue => selectedCategories.includes(issue.category))
    : mockIssues;

  const toggleCategory = (category: Issue['category']) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="relative h-screen">
      {/* Map */}
      {viewMode === 'markers' ? (
        <IssueMap 
          issues={filteredIssues}
          onMarkerClick={(issue) => console.log('Issue clicked:', issue.id)}
        />
      ) : (
        <MapContainer
          center={[19.1568, 72.9964]}
          zoom={12}
          className="w-full h-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <HeatmapLayer issues={filteredIssues} />
        </MapContainer>
      )}

      {/* Floating Filter Card */}
      <div className="absolute top-4 left-4 z-[1000]">
        <Card className="shadow-lg">
          <CardContent className="p-4 space-y-3">
            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'markers' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('markers')}
                className="flex-1"
                data-testid="button-markers-view"
              >
                <MapIcon className="w-4 h-4 mr-2" />
                Markers
              </Button>
              <Button
                variant={viewMode === 'heatmap' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('heatmap')}
                className="flex-1"
                data-testid="button-heatmap-view"
              >
                <Flame className="w-4 h-4 mr-2" />
                Heatmap
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full"
              data-testid="button-toggle-filters"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {selectedCategories.length > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedCategories.length}
                </span>
              )}
            </Button>

            {showFilters && (
              <div className="mt-4 space-y-2 min-w-[200px]">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer hover-elevate p-2 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 accent-primary"
                      data-testid={`checkbox-category-${category}`}
                    />
                    <span className="text-sm">{getCategoryLabel(category)}</span>
                  </label>
                ))}
                {selectedCategories.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategories([])}
                    className="w-full"
                    data-testid="button-clear-filters"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-3">Legend</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${category === 'potholes' ? 'bg-chart-1' : category === 'garbage' ? 'bg-chart-2' : category === 'streetlight' ? 'bg-chart-3' : category === 'drainage' ? 'bg-chart-4' : 'bg-chart-5'}`} />
                  <span>{getCategoryLabel(category)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
