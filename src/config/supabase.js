import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qxuzsuvvfihysqozzgxr.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// console.log(supabaseKey);
export {supabase,supabaseUrl}
