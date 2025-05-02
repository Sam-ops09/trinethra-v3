import { supabase } from './supabase.ts';
import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class SupabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { data } = await supabase
        .from('users_trinethra')
        .select()
        .eq('id', id)
        .single();
    return data || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data } = await supabase
        .from('users_trinethra')
        .select()
        .eq('username', username)
        .single();
    return data || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { data, error } = await supabase
        .from('users_trinethra')
        .insert(insertUser)
        .select()
        .single();

    if (error) throw error;
    return data;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const { data, error } = await supabase
        .from('contact_submissions_trinethra')
        .insert({
          ...submission,
          submitted_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) throw error;
    return data;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const { data, error } = await supabase
        .from('contact_submissions_trinethra')
        .select()
        .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

export const storage = new SupabaseStorage();
