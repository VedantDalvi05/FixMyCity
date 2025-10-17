import { type User, type InsertUser, type Issue, type InsertIssue, type UpdateIssue } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Issue CRUD operations
  getAllIssues(): Promise<Issue[]>;
  getIssue(id: string): Promise<Issue | undefined>;
  getIssuesByReporter(reporterId: string): Promise<Issue[]>;
  createIssue(issue: InsertIssue): Promise<Issue>;
  updateIssue(id: string, updates: UpdateIssue): Promise<Issue | undefined>;
  deleteIssue(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private issues: Map<string, Issue>;

  constructor() {
    this.users = new Map();
    this.issues = new Map();
    this.seedMockIssues();
  }

  private seedMockIssues() {
    const mockIssues: Issue[] = [
      {
        id: 'FMC-001',
        category: 'potholes',
        description: 'Large pothole on Main Street causing traffic issues',
        photos: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400'],
        location: { lat: 19.1568, lng: 72.9964, address: '123 Main St, Airoli, Navi Mumbai, Maharashtra' },
        areaCode: 'Ward-1',
        status: 'in-progress',
        severity: 'high',
        createdAt: new Date('2024-10-10T10:00:00Z'),
        updatedAt: new Date('2024-10-12T14:30:00Z'),
        reporterId: 'user1',
        reporterName: 'John Doe',
        reporterContact: 'john@example.com',
        adminNotes: [{ note: 'Repair crew assigned', timestamp: '2024-10-12T14:30:00Z', admin: 'Admin' }],
        resolvedPhotoURL: null,
        updateHistory: [
          { timestamp: '2024-10-10T10:00:00Z', event: 'Report Submitted' },
          { timestamp: '2024-10-12T14:30:00Z', event: 'Status changed to In Progress' },
          { timestamp: '2024-10-12T14:30:00Z', event: 'Admin Note Added: "Repair crew assigned"' }
        ]
      }
    ];
    
    mockIssues.forEach(issue => this.issues.set(issue.id, issue));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllIssues(): Promise<Issue[]> {
    return Array.from(this.issues.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getIssue(id: string): Promise<Issue | undefined> {
    return this.issues.get(id);
  }

  async getIssuesByReporter(reporterId: string): Promise<Issue[]> {
    return Array.from(this.issues.values())
      .filter(issue => issue.reporterId === reporterId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createIssue(insertIssue: InsertIssue): Promise<Issue> {
    const id = `FMC-${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
    const now = new Date();
    const issue: Issue = {
      ...insertIssue,
      id,
      photos: insertIssue.photos as string[],
      status: insertIssue.status || 'submitted',
      severity: insertIssue.severity || null,
      createdAt: now,
      updatedAt: now,
      adminNotes: (insertIssue.adminNotes || []) as Array<{ note: string; timestamp: string; admin: string }>,
      resolvedPhotoURL: insertIssue.resolvedPhotoURL || null,
      updateHistory: [
        ...(insertIssue.updateHistory || []) as Array<{ timestamp: string; event: string }>,
        { timestamp: now.toISOString(), event: 'Report Submitted' }
      ]
    };
    this.issues.set(id, issue);
    return issue;
  }

  async updateIssue(id: string, updates: UpdateIssue): Promise<Issue | undefined> {
    const issue = this.issues.get(id);
    if (!issue) return undefined;

    const updatedIssue: Issue = {
      ...issue,
      ...updates,
      updatedAt: new Date(),
      status: updates.status || issue.status,
      severity: updates.severity !== undefined ? updates.severity : issue.severity,
      photos: (updates.photos || issue.photos) as string[],
      adminNotes: (updates.adminNotes || issue.adminNotes) as Array<{ note: string; timestamp: string; admin: string }>,
      updateHistory: (updates.updateHistory || issue.updateHistory) as Array<{ timestamp: string; event: string }>,
      resolvedPhotoURL: updates.resolvedPhotoURL !== undefined ? updates.resolvedPhotoURL : issue.resolvedPhotoURL
    };
    
    this.issues.set(id, updatedIssue);
    return updatedIssue;
  }

  async deleteIssue(id: string): Promise<boolean> {
    return this.issues.delete(id);
  }
}

export const storage = new MemStorage();
