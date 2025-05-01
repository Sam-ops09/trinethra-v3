import { users, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  userCurrentId: number;
  contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactCurrentId++;
    const now = new Date();
    
    const contactSubmission: ContactSubmission = {
      ...submission,
      id,
      submittedAt: now,
      // Handle optional fields
      phone: submission.phone || null,
      confidential: submission.confidential || false
    };
    
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => {
        // Handle the possibility of null dates (though this shouldn't happen in our implementation)
        const dateA = a.submittedAt ? a.submittedAt.getTime() : 0;
        const dateB = b.submittedAt ? b.submittedAt.getTime() : 0;
        return dateB - dateA;
      }
    );
  }
}

export const storage = new MemStorage();
