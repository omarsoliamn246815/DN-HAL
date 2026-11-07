import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import type { Session } from '@supabase/supabase-js'
import App from './App'
import Auth from './Auth'
import { supabase } from './supabase'
import './style.css'

function Root() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        else setSession(data.session)
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'حدث خطأ في الاتصال')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  if (error) {
    return (
      <div dir="rtl" style={{ background: '#100d18', color: '#fff', minHeight: '100vh', padding: 25 }}>
        <h2 style={{ color: '#e5bd69' }}>DN-HALO</h2>
        <p>حصل خطأ أثناء التشغيل:</p>
        <p>{error}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#100d18', color: '#e5bd69' }}>
        جاري التحميل...
      </div>
    )
  }

  return session ? <App /> : <Auth onLogin={() => {}} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
