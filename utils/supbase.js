import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const project_url = 'https://ksdzgtlkzgjjvnxqjegy.supabase.co';
const public_anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZHpndGxremdqanZueHFqZWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMjU5MjUsImV4cCI6MjA1NzYwMTkyNX0.qxL0c8CTR1tQ90Rkqg-fWcgSKs3V7rjEHi6b1EFtRlc';
export const supabase = createClient( project_url, public_anon_key);
