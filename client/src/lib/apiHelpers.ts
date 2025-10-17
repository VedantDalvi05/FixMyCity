import type { Issue as BackendIssue } from '@shared/schema';
import type { Issue as FrontendIssue } from './mockData';

export function convertBackendIssue(backendIssue: BackendIssue): FrontendIssue {
  return {
    id: backendIssue.id,
    category: backendIssue.category as FrontendIssue['category'],
    description: backendIssue.description,
    photos: backendIssue.photos,
    location: backendIssue.location,
    areaCode: backendIssue.areaCode,
    status: backendIssue.status as FrontendIssue['status'],
    severity: backendIssue.severity as FrontendIssue['severity'],
    createdAt: typeof backendIssue.createdAt === 'string' ? backendIssue.createdAt : backendIssue.createdAt.toISOString(),
    updatedAt: typeof backendIssue.updatedAt === 'string' ? backendIssue.updatedAt : backendIssue.updatedAt.toISOString(),
    reporter: {
      id: backendIssue.reporterId,
      name: backendIssue.reporterName,
      contact: backendIssue.reporterContact
    },
    adminNotes: backendIssue.adminNotes,
    resolvedPhotoURL: backendIssue.resolvedPhotoURL || null,
    updateHistory: backendIssue.updateHistory
  };
}

export function convertToBackendIssue(frontendIssue: Partial<FrontendIssue> & {
  category: string;
  description: string;
  location: { lat: number; lng: number; address: string };
  areaCode: string;
}): any {
  return {
    category: frontendIssue.category,
    description: frontendIssue.description,
    photos: frontendIssue.photos || [],
    location: frontendIssue.location,
    areaCode: frontendIssue.areaCode,
    status: frontendIssue.status || 'submitted',
    severity: frontendIssue.severity || null,
    reporterId: frontendIssue.reporter?.id || 'user1', // TODO: get from auth context
    reporterName: frontendIssue.reporter?.name || 'Unknown',
    reporterContact: frontendIssue.reporter?.contact || '',
    adminNotes: frontendIssue.adminNotes || [],
    resolvedPhotoURL: frontendIssue.resolvedPhotoURL || null,
    updateHistory: frontendIssue.updateHistory || []
  };
}

export async function submitIssue(issueData: {
  category: string;
  description: string;
  address: string;
  photos: string[];
  reporterId: string;
  reporterName: string;
  reporterContact: string;
}) {
  // Mock lat/lng for now - in real app, would use geocoding API
  const location = {
    lat: 19.1568 + (Math.random() - 0.5) * 0.01, // Slight random variation around Airoli
    lng: 72.9964 + (Math.random() - 0.5) * 0.01,
    address: issueData.address
  };

  const backendData = {
    category: issueData.category,
    description: issueData.description,
    photos: issueData.photos,
    location,
    areaCode: 'Ward-1', // Default area code
    reporterId: issueData.reporterId,
    reporterName: issueData.reporterName,
    reporterContact: issueData.reporterContact
  };

  const response = await fetch('/api/issues', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(backendData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit issue');
  }

  return response.json();
}

export async function fetchUserIssues(reporterId: string) {
  const response = await fetch(`/api/issues/reporter/${reporterId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch issues');
  }
  const backendIssues = await response.json();
  return backendIssues.map(convertBackendIssue);
}
