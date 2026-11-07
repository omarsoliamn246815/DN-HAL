
import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from './supabase'

type Props = {
  onLogin: () => void
}

type Mode = 'login' | 'signup' | 'forgot' | 'recovery'

function getErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return String(error || 'حدث خطأ غير معروف')
  }

  const e = error as {
    message?: string
    code?: string
    status?: number
    name?: string
    details?: string
    hint?: string
  }

  const messages: Record<string, string> = {
    email_not_confirmed: 'البريد الإلكتروني غير مؤكد.',
    invalid_credentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    over_email_send_rate_limit: 'تم تجاوز حد إرسال البريد. انتظر قبل المحاولة مرة أخرى.',
    over_request_rate_limit: 'طلبات كثيرة جدًا. انتظر قليلًا ثم حاول.',
    email_exists: 'هذا البريد مسجل بالفعل.',
    signup_disabled: 'إنشاء الحسابات متوقف حاليًا.',
    weak_password: 'كلمة المرور ضعيفة. استخدم 8 أحرف على الأقل.',
    same_password: 'اختر كلمة مرور مختلفة عن القديمة.',
  }

  const friendly = e.code ? messages[e.code] : undefined

  return [
    friendly,
    e.message,
    e.code ? `رمز الخطأ: ${e.code}` : '',
    e.status ? `الحالة: ${e.status}` : '',
    e.details || '',
    e.hint || '',
  ].filter(Boolean).join('\n')
}

export default function Auth({ onLogin }: Props) {
  const [mode, setMode] = useState<Mode>(() =>
    new URLSearchParams(window.location.search).get('recovery') === '1'
      ? 'recovery'
      : 'login'
  )

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setMode('recovery')
          setMessage('اكتب كلمة المرور الجديدة.')
          setIsError(false)
        }
      })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setIsError(false)

    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/DN-HAL/?recovery=1`,
        })

        if (error) throw error

        setMessage('تم إرسال طلب الاستعادة. راجع بريدك الإلكتروني.')
      } else if (mode === 'recovery') {
        const { error } = await supabase.auth.updateUser({ password })

        if (error) throw error

        setMessage('تم تغيير كلمة المرور بنجاح. يمكنك تسجيل الدخول.')
        setPassword('')
        setMode('login')
        window.history.replaceState({}, '', '/DN-HAL/')
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name },
            emailRedirectTo: `${window.location.origin}/DN-HAL/`,
          },
        })

        if (error) throw error

        setMessage('تم إرسال طلب التسجيل. راجع بريدك الإلكتروني.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        onLogin()
      }
    } catch (error) {
      console.error('DN-HALO Auth Error:', error)
      setMessage(getErrorMessage(error))
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  const heading: Record<Mode, string> = {
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب جديد',
    forgot: 'استعادة كلمة المرور',
    recovery: 'كلمة مرور جديدة',
  }

  return (
    <main className="auth-page" dir="rtl">
      <style>{`
        .auth-page {
          min-height:100vh;
          display:grid;
          place-items:center;
          padding:20px;
          box-sizing:border-box;
          background:#100d18;
          color:white;
          font-family:Arial,sans-serif;
        }
        .auth-card {
          width:100%;
          max-width:420px;
          padding:28px;
          box-sizing:border-box;
          background:#1c1725;
          border:1px solid #7653a0;
          border-radius:22px;
        }
        .auth-card h1 {
          color:#e5bd69;
          text-align:center;
        }
        .auth-card input {
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0;
          color:white;
          background:#110e18;
          border:1px solid #51405e;
          border-radius:10px;
        }
        .auth-card button {
          width:100%;
          padding:13px;
          margin-top:12px;
          color:white;
          background:linear-gradient(110deg,#7650a8,#b18a45);
          border:0;
          border-radius:12px;
          cursor:pointer;
        }
        .auth-card button:disabled {
          opacity:.6;
        }
        .auth-card .switch {
          background:#292033;
        }
        .auth-message {
          padding:12px;
          border-radius:10px;
          background:#292033;
          color:#e5bd69;
          white-space:pre-wrap;
          overflow-wrap:anywhere;
          line-height:1.7;
        }
        .auth-message.error {
          border:1px solid #c65b68;
          color:#ffb4bd;
        }
      `}</style>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>✦ DN-HALO ✦</h1>
        <p style={{ textAlign:'center', color:'#c5bdce' }}>
          {heading[mode]}
        </p>

        {mode === 'signup' && (
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        )}

        {mode !== 'recovery' && (
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        )}

        {mode !== 'forgot' && (
          <input
            type="password"
            placeholder={
              mode === 'recovery'
                ? 'كلمة المرور الجديدة'
                : 'كلمة المرور'
            }
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            required
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'جاري التنفيذ...' :
            mode === 'forgot' ? 'إرسال رابط الاستعادة' :
            mode === 'recovery' ? 'حفظ كلمة المرور الجديدة' :
            mode === 'signup' ? 'إنشاء الحساب' : 'دخول'}
        </button>

        {mode === 'login' && (
          <>
            <button type="button" className="switch"
              onClick={() => {
                setMode('forgot')
                setMessage('')
              }}>
              نسيت كلمة المرور؟
            </button>

            <button type="button" className="switch"
              onClick={() => {
                setMode('signup')
                setMessage('')
              }}>
              إنشاء حساب جديد
            </button>
          </>
        )}

        {mode !== 'login' && (
          <button type="button" className="switch"
            onClick={() => {
              setMode('login')
              setMessage('')
              setIsError(false)
            }}>
            العودة لتسجيل الدخول
          </button>
        )}

        {message && (
          <div className={`auth-message ${isError ? 'error' : ''}`}>
            {message}
          </div>
        )}
      </form>
    </main>
  )
      }
