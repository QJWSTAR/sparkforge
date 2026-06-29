import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabaseClient: SupabaseClient | null = null
let supabaseAdminClient: SupabaseClient | null = null

function getOrCreateClient(url: string, key: string): SupabaseClient | null {
  if (!url || !key) {
    console.warn('Supabase URL or key not configured')
    return null
  }
  
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export function getSupabase(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient
  supabaseClient = getOrCreateClient(supabaseUrl || '', supabaseAnonKey || '')
  return supabaseClient
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (supabaseAdminClient) return supabaseAdminClient
  supabaseAdminClient = getOrCreateClient(supabaseUrl || '', supabaseServiceKey || '')
  return supabaseAdminClient
}

export const supabase = getSupabase()
export const supabaseAdmin = getSupabaseAdmin()