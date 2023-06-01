
import { env } from '$env/dynamic/public'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;