// TODO: Remove mock functionality - this is for prototype only
export interface Issue {
  id: string;
  category: 'potholes' | 'garbage' | 'streetlight' | 'drainage' | 'other';
  description: string;
  photos: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  areaCode: string;
  status: 'submitted' | 'in-progress' | 'resolved';
  severity?: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  reporter: {
    id: string;
    name: string;
    contact: string;
  };
  adminNotes: { note: string; timestamp: string; admin: string }[];
  resolvedPhotoURL?: string | null;
  updateHistory: { timestamp: string; event: string }[];
}

export const mockIssues: Issue[] = [
  {
    id: 'FMC-001',
    category: 'potholes',
    description: 'Large pothole on Main Street causing traffic issues',
    photos: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400'],
    location: { lat: 19.1568, lng: 72.9964, address: '123 Main St, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-1',
    status: 'in-progress',
    severity: 'high',
    createdAt: '2024-10-10T10:00:00Z',
    updatedAt: '2024-10-12T14:30:00Z',
    reporter: { id: 'user1', name: 'John Doe', contact: 'john@example.com' },
    adminNotes: [{ note: 'Repair crew assigned', timestamp: '2024-10-12T14:30:00Z', admin: 'Admin' }],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-10T10:00:00Z', event: 'Report Submitted' },
      { timestamp: '2024-10-12T14:30:00Z', event: 'Status changed to In Progress' },
      { timestamp: '2024-10-12T14:30:00Z', event: 'Admin Note Added: "Repair crew assigned"' }
    ]
  },
  {
    id: 'FMC-002',
    category: 'garbage',
    description: 'Overflowing garbage bins near the park',
    photos: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400'],
    location: { lat: 19.1590, lng: 72.9980, address: '456 Park Ave, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-2',
    status: 'submitted',
    severity: 'medium',
    createdAt: '2024-10-14T09:15:00Z',
    updatedAt: '2024-10-14T09:15:00Z',
    reporter: { id: 'user1', name: 'John Doe', contact: 'john@example.com' },
    adminNotes: [],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-14T09:15:00Z', event: 'Report Submitted' }
    ]
  },
  {
    id: 'FMC-003',
    category: 'streetlight',
    description: 'Streetlight not working on Oak Street',
    photos: [],
    location: { lat: 19.1540, lng: 72.9940, address: '789 Oak St, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-1',
    status: 'resolved',
    severity: 'low',
    createdAt: '2024-10-08T16:45:00Z',
    updatedAt: '2024-10-11T11:20:00Z',
    reporter: { id: 'user2', name: 'Jane Smith', contact: 'jane@example.com' },
    adminNotes: [
      { note: 'Electrician dispatched', timestamp: '2024-10-09T08:00:00Z', admin: 'Admin' },
      { note: 'Light repaired and tested', timestamp: '2024-10-11T11:20:00Z', admin: 'Admin' }
    ],
    resolvedPhotoURL: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
    updateHistory: [
      { timestamp: '2024-10-08T16:45:00Z', event: 'Report Submitted' },
      { timestamp: '2024-10-09T08:00:00Z', event: 'Status changed to In Progress' },
      { timestamp: '2024-10-09T08:00:00Z', event: 'Admin Note Added: "Electrician dispatched"' },
      { timestamp: '2024-10-11T11:20:00Z', event: 'Status changed to Resolved' },
      { timestamp: '2024-10-11T11:20:00Z', event: 'Admin Note Added: "Light repaired and tested"' }
    ]
  },
  {
    id: 'FMC-004',
    category: 'drainage',
    description: 'Blocked drainage causing flooding',
    photos: ['https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400'],
    location: { lat: 19.1580, lng: 72.9970, address: '321 Water St, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-3',
    status: 'in-progress',
    severity: 'high',
    createdAt: '2024-10-13T07:30:00Z',
    updatedAt: '2024-10-15T10:00:00Z',
    reporter: { id: 'user3', name: 'Mike Johnson', contact: 'mike@example.com' },
    adminNotes: [{ note: 'Cleaning scheduled', timestamp: '2024-10-15T10:00:00Z', admin: 'Admin' }],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-13T07:30:00Z', event: 'Report Submitted' },
      { timestamp: '2024-10-15T10:00:00Z', event: 'Status changed to In Progress' },
      { timestamp: '2024-10-15T10:00:00Z', event: 'Admin Note Added: "Cleaning scheduled"' }
    ]
  },
  {
    id: 'FMC-005',
    category: 'other',
    description: 'Damaged park bench needs replacement',
    photos: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'],
    location: { lat: 19.1600, lng: 72.9990, address: '555 Central Park West, Airoli, Navi Mumbai' },
    areaCode: 'Ward-2',
    status: 'submitted',
    severity: 'low',
    createdAt: '2024-10-15T13:00:00Z',
    updatedAt: '2024-10-15T13:00:00Z',
    reporter: { id: 'user1', name: 'John Doe', contact: 'john@example.com' },
    adminNotes: [],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-15T13:00:00Z', event: 'Report Submitted' }
    ]
  },
  {
    id: 'FMC-006',
    category: 'potholes',
    description: 'Multiple potholes on highway exit ramp',
    photos: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400'],
    location: { lat: 19.1520, lng: 72.9920, address: 'Mumbai-Pune Highway Exit 12, Airoli' },
    areaCode: 'Ward-4',
    status: 'submitted',
    severity: 'high',
    createdAt: '2024-10-16T08:00:00Z',
    updatedAt: '2024-10-16T08:00:00Z',
    reporter: { id: 'user4', name: 'Sarah Lee', contact: 'sarah@example.com' },
    adminNotes: [],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-16T08:00:00Z', event: 'Report Submitted' }
    ]
  },
  {
    id: 'FMC-007',
    category: 'garbage',
    description: 'Illegal dumping site near residential area',
    photos: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400'],
    location: { lat: 19.1550, lng: 72.9950, address: '888 Residential Blvd, Airoli, Navi Mumbai' },
    areaCode: 'Ward-3',
    status: 'resolved',
    severity: 'high',
    createdAt: '2024-10-05T14:20:00Z',
    updatedAt: '2024-10-09T16:00:00Z',
    reporter: { id: 'user2', name: 'Jane Smith', contact: 'jane@example.com' },
    adminNotes: [
      { note: 'Investigation started', timestamp: '2024-10-06T09:00:00Z', admin: 'Admin' },
      { note: 'Cleanup completed', timestamp: '2024-10-09T16:00:00Z', admin: 'Admin' }
    ],
    resolvedPhotoURL: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
    updateHistory: [
      { timestamp: '2024-10-05T14:20:00Z', event: 'Report Submitted' },
      { timestamp: '2024-10-06T09:00:00Z', event: 'Status changed to In Progress' },
      { timestamp: '2024-10-06T09:00:00Z', event: 'Admin Note Added: "Investigation started"' },
      { timestamp: '2024-10-09T16:00:00Z', event: 'Status changed to Resolved' },
      { timestamp: '2024-10-09T16:00:00Z', event: 'Admin Note Added: "Cleanup completed"' }
    ]
  },
  {
    id: 'FMC-008',
    category: 'streetlight',
    description: 'Multiple streetlights out on residential street',
    photos: [],
    location: { lat: 19.1570, lng: 72.9960, address: '234 Elm Street, Airoli, Navi Mumbai' },
    areaCode: 'Ward-1',
    status: 'in-progress',
    severity: 'medium',
    createdAt: '2024-10-14T19:30:00Z',
    updatedAt: '2024-10-15T08:45:00Z',
    reporter: { id: 'user3', name: 'Mike Johnson', contact: 'mike@example.com' },
    adminNotes: [{ note: 'Parts ordered', timestamp: '2024-10-15T08:45:00Z', admin: 'Admin' }],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-14T19:30:00Z', event: 'Report Submitted' },
      { timestamp: '2024-10-15T08:45:00Z', event: 'Status changed to In Progress' },
      { timestamp: '2024-10-15T08:45:00Z', event: 'Admin Note Added: "Parts ordered"' }
    ]
  },
  {
    id: 'FMC-009',
    category: 'streetlight',
    description: 'Broken streetlight pole near bus stop creating safety hazard',
    photos: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400'],
    location: { lat: 19.1585, lng: 72.9975, address: '45 Sector 8, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-2',
    status: 'submitted',
    severity: 'high',
    createdAt: '2024-10-16T14:20:00Z',
    updatedAt: '2024-10-16T14:20:00Z',
    reporter: { id: 'user1', name: 'John Doe', contact: 'john@example.com' },
    adminNotes: [],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-16T14:20:00Z', event: 'Report Submitted' }
    ]
  },
  {
    id: 'FMC-010',
    category: 'drainage',
    description: 'Manholes overflowing during monsoon causing waterlogging',
    photos: ['https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400'],
    location: { lat: 19.1595, lng: 72.9985, address: '78 Sector 9, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-2',
    status: 'resolved',
    severity: 'medium',
    createdAt: '2024-09-28T11:15:00Z',
    updatedAt: '2024-10-05T16:45:00Z',
    reporter: { id: 'user1', name: 'John Doe', contact: 'john@example.com' },
    adminNotes: [
      { note: 'Drainage cleaning initiated', timestamp: '2024-10-01T09:00:00Z', admin: 'Admin' },
      { note: 'Issue resolved - drainage cleared', timestamp: '2024-10-05T16:45:00Z', admin: 'Admin' }
    ],
    resolvedPhotoURL: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
    updateHistory: [
      { timestamp: '2024-09-28T11:15:00Z', event: 'Report Submitted' },
      { timestamp: '2024-10-01T09:00:00Z', event: 'Status changed to In Progress' },
      { timestamp: '2024-10-01T09:00:00Z', event: 'Admin Note Added: "Drainage cleaning initiated"' },
      { timestamp: '2024-10-05T16:45:00Z', event: 'Status changed to Resolved' },
      { timestamp: '2024-10-05T16:45:00Z', event: 'Admin Note Added: "Issue resolved - drainage cleared"' }
    ]
  },
  {
    id: 'FMC-011',
    category: 'potholes',
    description: 'Deep potholes on connecting road to railway station',
    photos: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400'],
    location: { lat: 19.1575, lng: 72.9955, address: '12 Station Road, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-1',
    status: 'in-progress',
    severity: 'medium',
    createdAt: '2024-10-12T08:30:00Z',
    updatedAt: '2024-10-14T12:00:00Z',
    reporter: { id: 'user1', name: 'John Doe', contact: 'john@example.com' },
    adminNotes: [
      { note: 'Road inspection scheduled', timestamp: '2024-10-14T12:00:00Z', admin: 'Admin' }
    ],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-12T08:30:00Z', event: 'Report Submitted' },
      { timestamp: '2024-10-14T12:00:00Z', event: 'Status changed to In Progress' },
      { timestamp: '2024-10-14T12:00:00Z', event: 'Admin Note Added: "Road inspection scheduled"' }
    ]
  },
  {
    id: 'FMC-012',
    category: 'garbage',
    description: 'Stray animals spreading garbage from uncovered bins',
    photos: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400'],
    location: { lat: 19.1555, lng: 72.9945, address: '89 Sector 7, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-1',
    status: 'submitted',
    severity: 'low',
    createdAt: '2024-10-17T07:45:00Z',
    updatedAt: '2024-10-17T07:45:00Z',
    reporter: { id: 'user1', name: 'John Doe', contact: 'john@example.com' },
    adminNotes: [],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-17T07:45:00Z', event: 'Report Submitted' }
    ]
  },
  {
    id: 'FMC-013',
    category: 'other',
    description: 'Playground equipment damaged and unsafe for children',
    photos: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'],
    location: { lat: 19.1605, lng: 72.9995, address: '156 Sector 10, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-2',
    status: 'in-progress',
    severity: 'high',
    createdAt: '2024-10-11T15:30:00Z',
    updatedAt: '2024-10-13T10:15:00Z',
    reporter: { id: 'user1', name: 'John Doe', contact: 'john@example.com' },
    adminNotes: [
      { note: 'Safety assessment team assigned', timestamp: '2024-10-13T10:15:00Z', admin: 'Admin' }
    ],
    resolvedPhotoURL: null,
    updateHistory: [
      { timestamp: '2024-10-11T15:30:00Z', event: 'Report Submitted' },
      { timestamp: '2024-10-13T10:15:00Z', event: 'Status changed to In Progress' },
      { timestamp: '2024-10-13T10:15:00Z', event: 'Admin Note Added: "Safety assessment team assigned"' }
    ]
  },
  {
    id: 'FMC-014',
    category: 'streetlight',
    description: 'Flickering streetlight causing visibility issues at night',
    photos: [],
    location: { lat: 19.1545, lng: 72.9935, address: '23 Sector 6, Airoli, Navi Mumbai, Maharashtra' },
    areaCode: 'Ward-1',
    status: 'resolved',
    severity: 'low',
    createdAt: '2024-09-25T20:00:00Z',
    updatedAt: '2024-09-30T14:30:00Z',
    reporter: { id: 'user1', name: 'John Doe', contact: 'john@example.com' },
    adminNotes: [
      { note: 'Electrical maintenance scheduled', timestamp: '2024-09-27T09:00:00Z', admin: 'Admin' },
      { note: 'Light bulb replaced and tested', timestamp: '2024-09-30T14:30:00Z', admin: 'Admin' }
    ],
    resolvedPhotoURL: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
    updateHistory: [
      { timestamp: '2024-09-25T20:00:00Z', event: 'Report Submitted' },
      { timestamp: '2024-09-27T09:00:00Z', event: 'Status changed to In Progress' },
      { timestamp: '2024-09-27T09:00:00Z', event: 'Admin Note Added: "Electrical maintenance scheduled"' },
      { timestamp: '2024-09-30T14:30:00Z', event: 'Status changed to Resolved' },
      { timestamp: '2024-09-30T14:30:00Z', event: 'Admin Note Added: "Light bulb replaced and tested"' }
    ]
  }
];

export const getCategoryColor = (category: Issue['category']) => {
  const colors = {
    potholes: { bg: 'bg-chart-1', text: 'text-chart-1', hex: '#e74c3c' },
    garbage: { bg: 'bg-chart-2', text: 'text-chart-2', hex: '#27ae60' },
    streetlight: { bg: 'bg-chart-3', text: 'text-chart-3', hex: '#f1c40f' },
    drainage: { bg: 'bg-chart-4', text: 'text-chart-4', hex: '#3498db' },
    other: { bg: 'bg-chart-5', text: 'text-chart-5', hex: '#9b59b6' }
  };
  return colors[category];
};

export const getStatusColor = (status: Issue['status']) => {
  const colors = {
    'submitted': { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Submitted' },
    'in-progress': { bg: 'bg-warning/10', text: 'text-warning', label: 'In Progress' },
    'resolved': { bg: 'bg-success/10', text: 'text-success', label: 'Resolved' }
  };
  return colors[status];
};

export const getCategoryLabel = (category: Issue['category']) => {
  const labels = {
    potholes: 'Potholes',
    garbage: 'Garbage',
    streetlight: 'Streetlight',
    drainage: 'Drainage',
    other: 'Other'
  };
  return labels[category];
};

export const getResolutionETA = (category: Issue['category']) => {
  const etas = {
    potholes: 'Estimated resolution: 5-7 business days',
    garbage: 'Estimated resolution: 2 business days',
    streetlight: 'Estimated resolution: 3-5 business days',
    drainage: 'Estimated resolution: 4-6 business days',
    other: 'Estimated resolution: 3-7 business days'
  };
  return etas[category];
};

export const getShareText = (issue: Issue, isResolved: boolean) => {
  const categoryLabel = getCategoryLabel(issue.category);
  const baseUrl = window.location.origin;
  
  if (isResolved) {
    return `Great news! The ${categoryLabel} issue I reported on ${issue.location.address} has been fixed. Thanks to the city! #FixMyCity ${baseUrl}/map`;
  } else {
    return `I just reported a ${categoryLabel} issue on ${issue.location.address} using #FixMyCity. Let's get our community fixed! ${baseUrl}/map`;
  }
};

export const shareIssue = async (issue: Issue) => {
  const shareText = getShareText(issue, issue.status === 'resolved');
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: `FixMyCity - ${getCategoryLabel(issue.category)} Issue`,
        text: shareText,
        url: `${window.location.origin}/map`
      });
      return true;
    } catch (err) {
      console.log('Share cancelled or failed:', err);
      return false;
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      return true;
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      return false;
    }
  }
};
