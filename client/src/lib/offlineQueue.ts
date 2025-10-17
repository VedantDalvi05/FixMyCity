import type { Issue } from './mockData';

const PENDING_REPORTS_KEY = 'pendingReports';

export interface PendingReport {
  tempId: string;
  category: Issue['category'];
  description: string;
  photos: string[]; // base64 encoded
  address: string;
  timestamp: string;
}

export const savePendingReport = (report: Omit<PendingReport, 'tempId' | 'timestamp'>) => {
  const pending = getPendingReports();
  const newReport: PendingReport = {
    ...report,
    tempId: `PENDING-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  pending.push(newReport);
  localStorage.setItem(PENDING_REPORTS_KEY, JSON.stringify(pending));
  return newReport;
};

export const getPendingReports = (): PendingReport[] => {
  try {
    const stored = localStorage.getItem(PENDING_REPORTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const clearPendingReport = (tempId: string) => {
  const pending = getPendingReports();
  const filtered = pending.filter(r => r.tempId !== tempId);
  localStorage.setItem(PENDING_REPORTS_KEY, JSON.stringify(filtered));
};

export const clearAllPendingReports = () => {
  localStorage.setItem(PENDING_REPORTS_KEY, JSON.stringify([]));
};

export const isOnline = () => navigator.onLine;

export const useOnlineStatus = (callback: (online: boolean) => void) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};
