'use client'

import { useState, useEffect, useCallback } from 'react'
import { getSupabase } from '@/lib/supabase'

export interface User {
  id: string
  email: string
  name?: string
  avatarUrl?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabase()
    
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email || '',
          name: data.session.user.user_metadata?.name || undefined,
          avatarUrl: data.session.user.user_metadata?.avatar_url || undefined,
        })
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser({
          id: session?.user.id || '',
          email: session?.user.email || '',
          name: session?.user.user_metadata?.name || undefined,
          avatarUrl: session?.user.user_metadata?.avatar_url || undefined,
        })
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase()
    
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' }
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      return { success: false, error: error.message }
    }

    if (data.session?.user) {
      setUser({
        id: data.session.user.id,
        email: data.session.user.email || '',
        name: data.session.user.user_metadata?.name || undefined,
        avatarUrl: data.session.user.user_metadata?.avatar_url || undefined,
      })
    }

    return { success: true }
  }, [])

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    const supabase = getSupabase()
    
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (data.session?.user) {
      setUser({
        id: data.session.user.id,
        email: data.session.user.email || '',
        name: data.session.user.user_metadata?.name || name || undefined,
        avatarUrl: data.session.user.user_metadata?.avatar_url || undefined,
      })
    }

    return { success: true }
  }, [])

  const signOut = useCallback(async () => {
    const supabase = getSupabase()
    
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' }
    }

    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { success: false, error: error.message }
    }

    setUser(null)
    return { success: true }
  }, [])

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  }
}