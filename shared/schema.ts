import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const permits = pgTable("permits", {
  id: serial("id").primaryKey(),
  permitNumber: text("permit_number").notNull(),
  company: text("company").notNull(),
  issueDate: text("issue_date").notNull(),
  expiryDate: text("expiry_date").notNull(),
  pdfUrl: text("pdf_url").notNull(),
});

export const insertPermitSchema = createInsertSchema(permits).omit({ id: true });

export type Permit = typeof permits.$inferSelect;
export type InsertPermit = z.infer<typeof insertPermitSchema>;
