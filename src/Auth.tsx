import { useState } from 'react'
import { supabase } from './supabase'

type Props = {
  onLogin: () => void
}

export default function Auth({ onLogin }: Props) {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name }
          }
        })

        if (error) throw error

        setMessage('تم إنشاء الحساب. راجع بريدك الإلكتروني لتأكيد الحساب إذا طُلب منك ذلك.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) throw error

        onLogin()
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'حدث خطأ، حاول مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page" dir="rtl">
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 20px;
          background: #100d18;
          color: white;
          font-family: Arial, sans-serif;
        }
        .auth-card {
          width: 100%;
          max-width: 420px;
          padding: 28px;
          background: #1c1725;
          border: 1px solid #7653a0;
          border-radius: 22px;
        }
        .auth-card h1 {
          color: #e5bd69;
          text-align: center;
        }
        .auth-card input {
          width: 100%;
          padding: 13px;
          margin: 8px 0;
          color: white;
          background: #110e18;
          border: 1px solid #51405e;
          border-radius: 10px;
          box-sizing: border-box;
        }
        .auth-card button {
          width: 100%;
          padding: 13px;
          margin-top: 12px;
          color: white;
          background: linear-gradient(110deg,#7650a8,#b18a45);
          border: 0;
          border-radius: 12px;
          cursor: pointer;
        }
        .auth-card .switch {
          background: #292033;
        }
        .auth-message {
          color: #e5bd69;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }
      `}</style>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>✦ DN-HALO ✦</h1>
        <p style={{ textAlign: 'center', color: '#c5bdce' }}>
          {isSignup ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
        </p>

        {isSignup && (
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور (8 أحرف على الأقل)"
          value={password}
          onChange={event => setPassword(event.target.value)}
          minLength={8}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'جاري التنفيذ...' : isSignup ? 'إنشاء الحساب' : 'دخول'}
        </button>

        <button
          type="button"
          className="switch"
          onClick={() => {
            setIsSignup(!isSignup)
            setMessage('')
          }}
        >
          {isSignup ? 'عندي حساب بالفعل' : 'إنشاء حساب جديد'}
        </button>

        {message && <p className="auth-message">{message}</p>}
      </form>
    </main>
  )
      }
