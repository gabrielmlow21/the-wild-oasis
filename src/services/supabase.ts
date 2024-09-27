import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://diwsijpzoodlepnjnixt.supabase.co";
// Row Level Security enabled API key
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpd3NpanB6b29kbGVwbmpuaXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4MzcxMTgsImV4cCI6MjA0MjQxMzExOH0.hcyLgvGje6SEgjJECfR85BI73tu_BsptwqEgGU81T84";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
