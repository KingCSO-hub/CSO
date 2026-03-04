import { permits, type Permit, type InsertPermit } from "@shared/schema";

export interface IStorage {
  getPermit(id: number): Promise<Permit | undefined>;
}

export class MemStorage implements IStorage {
  private permits: Map<number, Permit>;

  constructor() {
    this.permits = new Map();
    this.permits.set(1, {
      id: 1,
      permitNumber: "1895",
      company: "شلمبرجر",
      issueDate: "2026-02-01",
      expiryDate: "2027-01-27",
      pdfUrl: "#",
    });
  }

  async getPermit(id: number): Promise<Permit | undefined> {
    return this.permits.get(id);
  }
}

export const storage = new MemStorage();
