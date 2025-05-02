
import { createClient } from '@supabase/supabase-js';

// For development only - replace with your actual values
// TODO: Remove hard-coded values before deployment
const supabaseUrl = process.env.SUPABASE_URL || 'https://nftyaacmcmiyrwkxlins.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdHlhYWNtY21peXJ3a3hsaW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNTQyMjAsImV4cCI6MjA2MDgzMDIyMH0.s1gRenx7ANH19VE5-DZwNzVtcY-BZzC_1SDCHPVw5oQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
