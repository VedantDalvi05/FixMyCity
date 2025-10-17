import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import type { Issue } from '@/lib/mockData';

interface HeatmapLayerProps {
  issues: Issue[];
  intensity?: number;
}

// Extend the Leaflet module to include heatLayer
declare module 'leaflet' {
  function heatLayer(
    latlngs: [number, number, number][],
    options?: any
  ): any;
}

export default function HeatmapLayer({ issues, intensity = 0.6 }: HeatmapLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Convert issues to heatmap data points [lat, lng, intensity]
    const heatData: [number, number, number][] = issues.map(issue => [
      issue.location.lat,
      issue.location.lng,
      intensity
    ]);

    // Create heatmap layer
    const heat = L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: {
        0.0: 'blue',
        0.5: 'yellow',
        0.7: 'orange',
        1.0: 'red'
      }
    }).addTo(map);

    // Cleanup on unmount
    return () => {
      map.removeLayer(heat);
    };
  }, [map, issues, intensity]);

  return null;
}
