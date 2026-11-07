import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Auth from './Auth'
import { supabase } from './supabase'
import './style.css'

function Root() {
  const [session, setSession] = React.useState(
    () => supabase.auth.getSession()
  )
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setSession(Promise.resolve(data.session))
        setReady(true)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(Promise.resolve(currentSession))
        setReady(true)
      }
    )

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const [currentSession, setCurrentSession] =
    React.useState<Awaited<typeof session> | null>(null)

  React.useEffect(() => {
    session.then(value => setCurrentSession(value))
  }, [session])

  if (!ready) {
    return <div style={{ color: 'white', padding: 30 }}>جاري التحميل...</div>
  }

  return currentSession ? (
    <App />
  ) : (
    <Auth onLogin={() => {}} />
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
