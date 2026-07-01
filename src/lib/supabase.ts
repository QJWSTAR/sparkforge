import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabaseClient: SupabaseClient | null = null
let supabaseAdminClient: SupabaseClient | null = null
let clientValidated = false
let adminClientValidated = false

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

async function validateConnection(client: SupabaseClient, clientType: string): Promise<boolean> {
  try {
    await client.from('Signal').select('id').limit(1)
    console.log(`[Supabase] ${clientType} connection validated successfully`)
    return true
  } catch (error) {
    console.error(`[Supabase] ${clientType} connection validation failed:`, error)
    return false
  }
}

async function getOrCreateClientWithRetry(url: string, key: string, clientType: string, isAdmin: boolean): Promise<SupabaseClient | null> {
  if (!url || !key) {
    console.warn(`[Supabase] ${clientType} URL or key not configured`)
    return null
  }

  const existingClient = isAdmin ? supabaseAdminClient : supabaseClient
  const existingValidated = isAdmin ? adminClientValidated : clientValidated

  if (existingClient && existingValidated) {
    return existingClient
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[Supabase] Creating ${clientType} client (attempt ${attempt}/${MAX_RETRIES})`)
      const client = createClient(url, key, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
        global: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      })

      if (await validateConnection(client, clientType)) {
        if (isAdmin) {
          supabaseAdminClient = client
          adminClientValidated = true
        } else {
          supabaseClient = client
          clientValidated = true
        }
        return client
      }
    } catch (error) {
      console.error(`[Supabase] Failed to create ${clientType} client (attempt ${attempt}):`, error)
    }

    if (attempt < MAX_RETRIES) {
      console.log(`[Supabase] Retrying ${clientType} connection in ${RETRY_DELAY_MS}ms...`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
    }
  }

  console.error(`[Supabase] Failed to create ${clientType} client after ${MAX_RETRIES} attempts`)
  return null
}

export function getSupabase(): SupabaseClient | null {
  if (supabaseClient && clientValidated) return supabaseClient
  
  const client = getOrCreateClientWithRetry(
    supabaseUrl || '', 
    supabaseAnonKey || '', 
    'anon', 
    false
  )
  
  return supabaseClient || null
}

export async function getSupabaseAdmin(): Promise<SupabaseClient | null> {
  if (supabaseAdminClient && adminClientValidated) return supabaseAdminClient
  
  return getOrCreateClientWithRetry(
    supabaseUrl || '', 
    supabaseServiceKey || '', 
    'admin', 
    true
  )
}

export function isDbAvailable(): boolean {
  return adminClientValidated || clientValidated
}

export function invalidateDbConnection(): void {
  supabaseClient = null
  supabaseAdminClient = null
  clientValidated = false
  adminClientValidated = false
  console.log('[Supabase] Database connections invalidated')
}