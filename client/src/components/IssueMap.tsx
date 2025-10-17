import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Issue } from '@/lib/mockData';
import { getCategoryColor, getCategoryLabel } from '@/lib/mockData';
import StatusBadge from './StatusBadge';
import CategoryBadge from './CategoryBadge';

interface IssueMapProps {
  issues: Issue[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (issue: Issue) => void;
}

export default function IssueMap({ 
  issues, 
  center = [19.1568, 72.9964],
  zoom = 12,
  onMarkerClick 
}: IssueMapProps) {
  
  const createMarkerIcon = (category: Issue['category']) => {
    const { hex } = getCategoryColor(category);
    const svgIcon = `
      <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26s16-15 16-26C32 7.163 24.837 0 16 0z" 
              fill="${hex}" stroke="white" stroke-width="2"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
      </svg>
    `;
    
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -42]
    });
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      className="w-full h-full rounded-lg z-0"
      data-testid="map-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.location.lat, issue.location.lng]}
          icon={createMarkerIcon(issue.category)}
          eventHandlers={{
            click: () => onMarkerClick?.(issue)
          }}
        >
          <Popup className="custom-popup">
            <div className="p-2 min-w-[250px]" data-testid={`popup-issue-${issue.id}`}>
              {issue.photos.length > 0 && (
                <img 
                  src={issue.photos[0]} 
                  alt={issue.description}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="font-semibold text-sm mb-2">{issue.description}</h3>
              <div className="flex gap-2 mb-2">
                <CategoryBadge category={issue.category} />
                <StatusBadge status={issue.status} />
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                📍 {issue.location.address}
              </p>
              <p className="text-xs text-muted-foreground">
                ID: {issue.id}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
