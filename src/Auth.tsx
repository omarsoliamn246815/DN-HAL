
import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type Props = {
  onLogin: () => void
}

type Mode = 'login' | 'signup' | 'forgot' | 'recovery'

export default function Auth({ onLogin }: Props) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setMode('recovery')
          setMessage('اكتب كلمة المرور الجديدة')
        }
      })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/DN-HAL/?recovery=1`,
        })
        if (error) throw error
        setMessage('إذا كان البريد مسجلاً، سيصلك رابط استعادة كلمة المرور.')
      } else if (mode === 'recovery') {
        const { error } = await supabase.auth.updateUser({ password })
        if (error) throw error
        setMessage('تم تحديث كلمة المرور. يمكنك تسجيل الدخول الآن.')
        setMode('login')
        setPassword('')
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: name } },
        })
        if (error) throw error
        setMessage('تم إرسال طلب إنشاء الحساب. راجع بريدك الإلكتروني.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
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

  const heading = {
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب جديد',
    forgot: 'استعادة كلمة المرور',
    recovery: 'كلمة مرور جديدة',
  }[mode]

  return (
    <main className="auth-page" dir="rtl">
      <style>{`
        .auth-page {
          min-height:100vh; display:grid; place-items:center;
          padding:20px; background:#100d18; color:white;
          font-family:Arial,sans-serif;
        }
        .auth-card {
          width:100%; max-width:420px; padding:28px;
          background:#1c1725; border:1px solid #7653a0;
          border-radius:22px; box-sizing:border-box;
        }
        .auth-card h1 { color:#e5bd69; text-align:center; }
        .auth-card p { text-align:center; color:#c5bdce; }
        .auth-card input {
          width:100%; box-sizing:border-box; padding:13px;
          margin:8px 0; color:white; background:#110e18;
          border:1px solid #51405e; border-radius:10px;
        }
        .auth-card button {
          width:100%; padding:13px; margin-top:12px;
          color:white; background:linear-gradient(110deg,#7650a8,#b18a45);
          border:0; border-radius:12px; cursor:pointer;
        }
        .auth-card .switch { background:#292033; }
        .auth-message { color:#e5bd69 !important; overflow-wrap:anywhere; }
      `}</style>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>✦ DN-HALO ✦</h1>
        <p>{heading}</p>

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
            placeholder={mode === 'recovery' ? 'كلمة المرور الجديدة' : 'كلمة المرور'}
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

        {mode !== 'login' && (
          <button type="button" className="switch"
            onClick={() => { setMode('login'); setMessage('') }}>
            العودة لتسجيل الدخول
          </button>
        )}

        {mode === 'login' && (
          <>
            <button type="button" className="switch"
              onClick={() => { setMode('forgot'); setMessage('') }}>
              نسيت كلمة المرور؟
            </button>
            <button type="button" className="switch"
              onClick={() => { setMode('signup'); setMessage('') }}>
              إنشاء حساب جديد
            </button>
          </>
        )}

        {message && <p className="auth-message">{message}</p>}
      </form>
    </main>
  )
      }
