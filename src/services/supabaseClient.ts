import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpvwqmysflumpikgguua.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdndxbXlzZmx1bXBpa2dndXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjA0MzgsImV4cCI6MjA1OTI5NjQzOH0.u7VJ1W3WQ9_jYcKW_0X5DGtd_sPbqlygZJiLILkfC7E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
