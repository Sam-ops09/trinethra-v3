import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Get environment variables for Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Verify that environment variables are defined
if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        'Missing required environment variables: SUPABASE_URL and/or SUPABASE_ANON_KEY are not defined. ' +
        'Please check your environment configuration.'
    );
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
