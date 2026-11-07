
import React, { useState } from 'react'

type Tab = 'home' | 'rooms' | 'family' | 'pirate' | 'wallet' | 'friends'

const rooms = [
  { name: 'سهرة النجوم ⭐', host: 'MO', users: 28 },
  { name: 'لمة الأصدقاء ❤️', host: 'MERO', users: 16 },
  { name: 'عالم التحديات 🎮', host: 'SULTAN', users: 12 },
  { name: 'VIP Lounge 👑', host: 'NOOR', users: 35 },
]

const styles = `
*{box-sizing:border-box}
body{margin:0;background:#100d18;color:#fff;font-family:Arial,sans-serif}
.app{max-width:1100px;margin:auto;padding:18px 14px 90px}
header{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.logo{font-size:27px;font-weight:900;color:#e5bd69}
.balance{background:#241b31;border:1px solid #7653a0;padding:10px 14px;border-radius:15px;color:#f4d58b}
nav{display:flex;gap:8px;overflow-x:auto;margin:22px 0;padding-bottom:8px}
button{cursor:pointer;border:0;color:white;background:#292033;border-radius:12px;padding:12px 15px;font-size:14px}
button.active,.primary{background:linear-gradient(110deg,#7650a8,#b18a45)}
h1{font-size:25px;color:#f0d18b}
h2{font-size:19px;color:#e8c77f}
p{color:#c5bdce;line-height:1.7}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:13px}
.card{background:#1c1725;border:1px solid #382a49;border-radius:18px;padding:17px;margin-bottom:13px}
.hero{background:linear-gradient(120deg,#392451,#171321 70%);border:1px solid #78569b;border-radius:22px;padding:25px;margin:15px 0}
.big{font-size:35px;font-weight:bold;color:#f0cf85}
.muted{font-size:12px;color:#aaa0b4}
.row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
input,select{width:100%;background:#110e18;border:1px solid #51405e;color:white;border-radius:10px;padding:12px;margin:7px 0}
button:disabled{opacity:.5}
footer{position:fixed;bottom:0;left:0;right:0;background:#17121f;border-top:1px solid #392b48;padding:10px;text-align:center;color:#aaa;font-size:12px}
.pill{display:inline-block;padding:6px 10px;background:#342643;border-radius:20px;color:#e9cb8a;font-size:12px}
`
 
export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [diamonds, setDiamonds] = useState(2500)
  const [roomSeats, setRoomSeats] = useState(8)
  const [familyName, setFamilyName] = useState('عائلة النجوم')
  const [familyLevel] = useState('برونزي')
  const [familySpent, setFamilySpent] = useState(0)
  const [transferAmount, setTransferAmount] = useState('')
  const [receipt, setReceipt] = useState('')
  const [message, setMessage] = useState('')
  const [pirate, setPirate] = useState(false)

  const spend = (amount: number) => {
    if (diamonds < amount) {
      setMessage('رصيد الماسات غير كافٍ.')
      return
    }
    setDiamonds(diamonds - amount)
    setFamilySpent(familySpent + amount)
    setMessage('تم تسجيل العملية في النموذج التجريبي.')
  }

  const show = (name: Tab) => {
    setTab(name)
    setMessage('')
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header>
          <div>
            <div className="logo">✦ DN-HALO ✦</div>
            <div className="muted">عالمك، أصدقاؤك، وحكايتك</div>
          </div>
          <div className="balance">💎 {diamonds.toLocaleString('en-US')}</div>
        </header>

        <nav>
          {([
            ['home','الرئيسية'],
            ['rooms','الغرف'],
            ['family','العائلات'],
            ['pirate','القرصان'],
            ['wallet','شحن الماسات'],
            ['friends','أصدقائي'],
          ] as [Tab,string][]).map(([id,label]) => (
            <button key={id} className={tab===id?'active':''} onClick={()=>show(id)}>{label}</button>
          ))}
        </nav>

        {message && <div className="card">{message}</div>}

        {tab==='home' && <>
          <div className="hero">
            <span className="pill">مرحبًا بك في DN-HALO</span>
            <h1>عالم يجمع الأصدقاء 💜</h1>
            <p>ادخل الغرف، قابل أصدقاء جدد، كوّن عائلتك، واستمتع بالتجربة.</p>
            <button className="primary" onClick={()=>show('rooms')}>اكتشف الغرف</button>
          </div>
          <div className="grid">
            <div className="card"><h2>💎 محفظتي</h2><div className="big">{diamonds.toLocaleString('en-US')}</div><p>رصيد الماسات التجريبي</p><button onClick={()=>show('wallet')}>تفاصيل الشحن</button></div>
            <div className="card"><h2>👑 عائلتي</h2><div className="big">{familyLevel}</div><p>{familyName}</p><button onClick={()=>show('family')}>دخول العائلة</button></div>
            <div className="card"><h2>🏴‍☠️ القرصان</h2><p>إيموشانات وإطار ودخولية مميزة.</p><button onClick={()=>show('pirate')}>اكتشف المميزات</button></div>
          </div>
        </>}

        {tab==='rooms' && <>
          <h1>🎙️ الغرف الصوتية</h1>
          <div className="card">
            <h2>إعداد مقاعد الغرفة</h2>
            <p>الاختيار الافتراضي 8 مقاعد. يمكنك تجربة تخطيطات أخرى.</p>
            <div className="row">
              {[8,12,2].map(n=><button key={n} className={roomSeats===n?'active':''} onClick={()=>setRoomSeats(n)}>{n===2?'كرسيان متجاوران':`${n} كرسي`}</button>)}
            </div>
            <p>التخطيط المختار: <b>{roomSeats===2?'كرسيان متجاوران':`${roomSeats} كرسي`}</b></p>
            <div className="grid">
              {Array.from({length:roomSeats},(_,i)=><div className="card" key={i} style={{textAlign:'center',margin:0}}>🎤<p>مقعد {i+1}</p></div>)}
            </div>
            <p className="muted">المقاعد هنا للعرض التجريبي فقط، وليست اتصالًا صوتيًا حقيقيًا.</p>
          </div>
          <div className="grid">
            {rooms.map(room=><div className="card" key={room.name}>
              <h2>{room.name}</h2>
              <p>المضيف: {room.host}</p>
              <p>👥 {room.users} مستخدم</p>
              <button className="primary" onClick={()=>setMessage('دخول الغرفة الصوتية يحتاج إلى خادم صوتي.')}>دخول الغرفة</button>
            </div>)}
          </div>
        </>}

        {tab==='family' && <>
          <h1>👑 نظام العائلات</h1>
          <div className="card">
            <label>اسم العائلة</label>
            <input value={familyName} onChange={e=>setFamilyName(e.target.value)} />
            <div className="row"><span>مستوى العائلة</span><span className="pill">{familyLevel}</span></div>
            <h2>💎 إجمالي الماسات المصروفة</h2>
            <div className="big">{familySpent.toLocaleString('en-US')}</div>
            <p>تُجمع مساهمات جميع أفراد العائلة في النظام النهائي.</p>
          </div>
          <div className="grid">
            {['ماسي 💎','فضي 🥈','برونزي 🥉','تاجي 👑','ذهبي 🏆'].map(level=><div className="card" key={level}><h2>{level}</h2><p>مستوى من مستويات العائلات.</p></div>)}
          </div>
          <div className="card">
            <h2>مساهمات أفراد العائلة</h2>
            <p>الهدايا المرسلة للأشخاص والصناديق داخل روم العائلة تدخل في حساب التقدم.</p>
            <p className="muted">عرض مساهمات كل عضو وتحديث المستوى يحتاجان إلى قاعدة بيانات مشتركة.</p>
          </div>
        </>}

        {tab==='pirate' && <>
          <div className="hero">
            <div className="big">🏴‍☠️ القرصان</div>
            <h1>عضوية القرصان</h1>
            <div className="big">360,000 💎</div>
            <p>اشتراك لمدة 30 يومًا، والتجديد اختياري كل شهر.</p>
            <button className="primary" onClick={()=>spend(360000)} disabled={pirate}>تفعيل تجريبي</button>
            {pirate && <span className="pill">تم التفعيل في النموذج التجريبي</span>}
          </div>
          <div className="grid">
            <div className="card"><h2>✨ إيموشانات الغرف</h2><p>تأثيرات خاصة تظهر داخل الغرف.</p></div>
            <div className="card"><h2>👀 مشاهدات الملف</h2><p>عرض سجل من شاهد ملفك الشخصي، وفق إعدادات الخصوصية.</p></div>
            <div className="card"><h2>🖼️ إطار حصري</h2><p>إطار مميز للملف الشخصي.</p></div>
            <div className="card"><h2>🌟 دخولية حصرية</h2><p>تأثير دخول متحرك للغرف.</p></div>
          </div>
          <p className="muted">التفعيل هنا تجريبي، ولا يوجد خصم أو اشتراك حقيقي حتى ربط الخادم.</p>
        </>}

        {tab==='wallet' && <>
          <h1>💎 شحن الماسات</h1>
          <div className="card">
            <h2>فودافون كاش</h2>
            <p>رقم استقبال التحويل:</p>
            <div className="big">01041170314</div>
            <button onClick={()=>navigator.clipboard?.writeText('01041170314')}>نسخ الرقم</button>
            <p className="muted">تأكد من ملكية المحفظة وموافقة صاحبها قبل استقبال أي تحويلات.</p>
          </div>
          <div className="card">
            <h2>إرسال طلب شحن</h2>
            <label>المبلغ المحوّل بالجنيه</label>
            <input type="number" min="1" value={transferAmount} onChange={e=>setTransferAmount(e.target.value)} placeholder="اكتب المبلغ" />
            <label>رقم العملية أو مرجع التحويل</label>
            <input value={receipt} onChange={e=>setReceipt(e.target.value)} placeholder="اكتب رقم مرجع التحويل" />
            <button className="primary" onClick={()=>setMessage(transferAmount && receipt ? 'تم تجهيز طلب الشحن التجريبي. لا يتم اعتماد الدفع أو إضافة الماسات تلقائيًا في هذه النسخة.' : 'اكتب المبلغ ورقم مرجع التحويل أولًا.')}>إرسال طلب الشحن</button>
          </div>
          <p className="muted">لا توجد باقات أو أسعار شحن مضافة هنا؛ نحتاج جدول الأسعار المتفق عليه، وربط مزود دفع آمن ومراجعة الطلبات قبل إضافة الماسات.</p>
        </>}

        {tab==='friends' && <>
          <h1>👥 أصدقائي</h1>
          <div className="card">
            <h2>الشخصيات الذكية</h2>
            <p>شخصيات افتراضية للدردشة باللهجة المصرية، مع توضيح أنها ذكاء اصطناعي وليست أشخاصًا حقيقيين.</p>
            <button className="primary" onClick={()=>setMessage('قسم الشخصيات الذكية يحتاج إلى ربط نموذج محادثة وخادم.')}>ابدأ محادثة تجريبية</button>
          </div>
          <div className="card">
            <h2>🛡️ الأمان والمخالفات</h2>
            <p>نظام آلي لمراجعة المحتوى المخالف، مع سجل للأسباب وإمكانية الاعتراض على القرارات.</p>
            <p className="muted">لا يتم تطبيق حظر فعلي في هذه الواجهة. يلزم نظام مراجعة خلفي واختبار دقة الكشف قبل التشغيل.</p>
          </div>
        </>}
      </div>
      <footer>DN-HALO © تجربة أولية — المزايا والخدمات الحقيقية تحتاج إلى خادم</footer>
    </>
  )
      }
import React, { useState } from 'react'

type Tab = 'home' | 'rooms' | 'family' | 'pirate' | 'wallet' | 'friends'

const rooms = [
  { name: 'سهرة النجوم ⭐', host: 'MO', users: 28 },
  { name: 'لمة الأصدقاء ❤️', host: 'MERO', users: 16 },
  { name: 'عالم التحديات 🎮', host: 'SULTAN', users: 12 },
  { name: 'VIP Lounge 👑', host: 'NOOR', users: 35 },
]

const styles = `
*{box-sizing:border-box}
body{margin:0;background:#100d18;color:#fff;font-family:Arial,sans-serif}
.app{max-width:1100px;margin:auto;padding:18px 14px 90px}
header{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.logo{font-size:27px;font-weight:900;color:#e5bd69}
.balance{background:#241b31;border:1px solid #7653a0;padding:10px 14px;border-radius:15px;color:#f4d58b}
nav{display:flex;gap:8px;overflow-x:auto;margin:22px 0;padding-bottom:8px}
button{cursor:pointer;border:0;color:white;background:#292033;border-radius:12px;padding:12px 15px;font-size:14px}
button.active,.primary{background:linear-gradient(110deg,#7650a8,#b18a45)}
h1{font-size:25px;color:#f0d18b}
h2{font-size:19px;color:#e8c77f}
p{color:#c5bdce;line-height:1.7}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:13px}
.card{background:#1c1725;border:1px solid #382a49;border-radius:18px;padding:17px;margin-bottom:13px}
.hero{background:linear-gradient(120deg,#392451,#171321 70%);border:1px solid #78569b;border-radius:22px;padding:25px;margin:15px 0}
.big{font-size:35px;font-weight:bold;color:#f0cf85}
.muted{font-size:12px;color:#aaa0b4}
.row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
input,select{width:100%;background:#110e18;border:1px solid #51405e;color:white;border-radius:10px;padding:12px;margin:7px 0}
button:disabled{opacity:.5}
footer{position:fixed;bottom:0;left:0;right:0;background:#17121f;border-top:1px solid #392b48;padding:10px;text-align:center;color:#aaa;font-size:12px}
.pill{display:inline-block;padding:6px 10px;background:#342643;border-radius:20px;color:#e9cb8a;font-size:12px}
`
 
export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [diamonds, setDiamonds] = useState(2500)
  const [roomSeats, setRoomSeats] = useState(8)
  const [familyName, setFamilyName] = useState('عائلة النجوم')
  const [familyLevel] = useState('برونزي')
  const [familySpent, setFamilySpent] = useState(0)
  const [transferAmount, setTransferAmount] = useState('')
  const [receipt, setReceipt] = useState('')
  const [message, setMessage] = useState('')
  const [pirate, setPirate] = useState(false)

  const spend = (amount: number) => {
    if (diamonds < amount) {
      setMessage('رصيد الماسات غير كافٍ.')
      return
    }
    setDiamonds(diamonds - amount)
    setFamilySpent(familySpent + amount)
    setMessage('تم تسجيل العملية في النموذج التجريبي.')
  }

  const show = (name: Tab) => {
    setTab(name)
    setMessage('')
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header>
          <div>
            <div className="logo">✦ DN-HALO ✦</div>
            <div className="muted">عالمك، أصدقاؤك، وحكايتك</div>
          </div>
          <div className="balance">💎 {diamonds.toLocaleString('en-US')}</div>
        </header>

        <nav>
          {([
            ['home','الرئيسية'],
            ['rooms','الغرف'],
            ['family','العائلات'],
            ['pirate','القرصان'],
            ['wallet','شحن الماسات'],
            ['friends','أصدقائي'],
          ] as [Tab,string][]).map(([id,label]) => (
            <button key={id} className={tab===id?'active':''} onClick={()=>show(id)}>{label}</button>
          ))}
        </nav>

        {message && <div className="card">{message}</div>}

        {tab==='home' && <>
          <div className="hero">
            <span className="pill">مرحبًا بك في DN-HALO</span>
            <h1>عالم يجمع الأصدقاء 💜</h1>
            <p>ادخل الغرف، قابل أصدقاء جدد، كوّن عائلتك، واستمتع بالتجربة.</p>
            <button className="primary" onClick={()=>show('rooms')}>اكتشف الغرف</button>
          </div>
          <div className="grid">
            <div className="card"><h2>💎 محفظتي</h2><div className="big">{diamonds.toLocaleString('en-US')}</div><p>رصيد الماسات التجريبي</p><button onClick={()=>show('wallet')}>تفاصيل الشحن</button></div>
            <div className="card"><h2>👑 عائلتي</h2><div className="big">{familyLevel}</div><p>{familyName}</p><button onClick={()=>show('family')}>دخول العائلة</button></div>
            <div className="card"><h2>🏴‍☠️ القرصان</h2><p>إيموشانات وإطار ودخولية مميزة.</p><button onClick={()=>show('pirate')}>اكتشف المميزات</button></div>
          </div>
        </>}

        {tab==='rooms' && <>
          <h1>🎙️ الغرف الصوتية</h1>
          <div className="card">
            <h2>إعداد مقاعد الغرفة</h2>
            <p>الاختيار الافتراضي 8 مقاعد. يمكنك تجربة تخطيطات أخرى.</p>
            <div className="row">
              {[8,12,2].map(n=><button key={n} className={roomSeats===n?'active':''} onClick={()=>setRoomSeats(n)}>{n===2?'كرسيان متجاوران':`${n} كرسي`}</button>)}
            </div>
            <p>التخطيط المختار: <b>{roomSeats===2?'كرسيان متجاوران':`${roomSeats} كرسي`}</b></p>
            <div className="grid">
              {Array.from({length:roomSeats},(_,i)=><div className="card" key={i} style={{textAlign:'center',margin:0}}>🎤<p>مقعد {i+1}</p></div>)}
            </div>
            <p className="muted">المقاعد هنا للعرض التجريبي فقط، وليست اتصالًا صوتيًا حقيقيًا.</p>
          </div>
          <div className="grid">
            {rooms.map(room=><div className="card" key={room.name}>
              <h2>{room.name}</h2>
              <p>المضيف: {room.host}</p>
              <p>👥 {room.users} مستخدم</p>
              <button className="primary" onClick={()=>setMessage('دخول الغرفة الصوتية يحتاج إلى خادم صوتي.')}>دخول الغرفة</button>
            </div>)}
          </div>
        </>}

        {tab==='family' && <>
          <h1>👑 نظام العائلات</h1>
          <div className="card">
            <label>اسم العائلة</label>
            <input value={familyName} onChange={e=>setFamilyName(e.target.value)} />
            <div className="row"><span>مستوى العائلة</span><span className="pill">{familyLevel}</span></div>
            <h2>💎 إجمالي الماسات المصروفة</h2>
            <div className="big">{familySpent.toLocaleString('en-US')}</div>
            <p>تُجمع مساهمات جميع أفراد العائلة في النظام النهائي.</p>
          </div>
          <div className="grid">
            {['ماسي 💎','فضي 🥈','برونزي 🥉','تاجي 👑','ذهبي 🏆'].map(level=><div className="card" key={level}><h2>{level}</h2><p>مستوى من مستويات العائلات.</p></div>)}
          </div>
          <div className="card">
            <h2>مساهمات أفراد العائلة</h2>
            <p>الهدايا المرسلة للأشخاص والصناديق داخل روم العائلة تدخل في حساب التقدم.</p>
            <p className="muted">عرض مساهمات كل عضو وتحديث المستوى يحتاجان إلى قاعدة بيانات مشتركة.</p>
          </div>
        </>}

        {tab==='pirate' && <>
          <div className="hero">
            <div className="big">🏴‍☠️ القرصان</div>
            <h1>عضوية القرصان</h1>
            <div className="big">360,000 💎</div>
            <p>اشتراك لمدة 30 يومًا، والتجديد اختياري كل شهر.</p>
            <button className="primary" onClick={()=>spend(360000)} disabled={pirate}>تفعيل تجريبي</button>
            {pirate && <span className="pill">تم التفعيل في النموذج التجريبي</span>}
          </div>
          <div className="grid">
            <div className="card"><h2>✨ إيموشانات الغرف</h2><p>تأثيرات خاصة تظهر داخل الغرف.</p></div>
            <div className="card"><h2>👀 مشاهدات الملف</h2><p>عرض سجل من شاهد ملفك الشخصي، وفق إعدادات الخصوصية.</p></div>
            <div className="card"><h2>🖼️ إطار حصري</h2><p>إطار مميز للملف الشخصي.</p></div>
            <div className="card"><h2>🌟 دخولية حصرية</h2><p>تأثير دخول متحرك للغرف.</p></div>
          </div>
          <p className="muted">التفعيل هنا تجريبي، ولا يوجد خصم أو اشتراك حقيقي حتى ربط الخادم.</p>
        </>}

        {tab==='wallet' && <>
          <h1>💎 شحن الماسات</h1>
          <div className="card">
            <h2>فودافون كاش</h2>
            <p>رقم استقبال التحويل:</p>
            <div className="big">01041170314</div>
            <button onClick={()=>navigator.clipboard?.writeText('01041170314')}>نسخ الرقم</button>
            <p className="muted">تأكد من ملكية المحفظة وموافقة صاحبها قبل استقبال أي تحويلات.</p>
          </div>
          <div className="card">
            <h2>إرسال طلب شحن</h2>
            <label>المبلغ المحوّل بالجنيه</label>
            <input type="number" min="1" value={transferAmount} onChange={e=>setTransferAmount(e.target.value)} placeholder="اكتب المبلغ" />
            <label>رقم العملية أو مرجع التحويل</label>
            <input value={receipt} onChange={e=>setReceipt(e.target.value)} placeholder="اكتب رقم مرجع التحويل" />
            <button className="primary" onClick={()=>setMessage(transferAmount && receipt ? 'تم تجهيز طلب الشحن التجريبي. لا يتم اعتماد الدفع أو إضافة الماسات تلقائيًا في هذه النسخة.' : 'اكتب المبلغ ورقم مرجع التحويل أولًا.')}>إرسال طلب الشحن</button>
          </div>
          <p className="muted">لا توجد باقات أو أسعار شحن مضافة هنا؛ نحتاج جدول الأسعار المتفق عليه، وربط مزود دفع آمن ومراجعة الطلبات قبل إضافة الماسات.</p>
        </>}

        {tab==='friends' && <>
          <h1>👥 أصدقائي</h1>
          <div className="card">
            <h2>الشخصيات الذكية</h2>
            <p>شخصيات افتراضية للدردشة باللهجة المصرية، مع توضيح أنها ذكاء اصطناعي وليست أشخاصًا حقيقيين.</p>
            <button className="primary" onClick={()=>setMessage('قسم الشخصيات الذكية يحتاج إلى ربط نموذج محادثة وخادم.')}>ابدأ محادثة تجريبية</button>
          </div>
          <div className="card">
            <h2>🛡️ الأمان والمخالفات</h2>
            <p>نظام آلي لمراجعة المحتوى المخالف، مع سجل للأسباب وإمكانية الاعتراض على القرارات.</p>
            <p className="muted">لا يتم تطبيق حظر فعلي في هذه الواجهة. يلزم نظام مراجعة خلفي واختبار دقة الكشف قبل التشغيل.</p>
          </div>
        </>}
      </div>
      <footer>DN-HALO © تجربة أولية — المزايا والخدمات الحقيقية تحتاج إلى خادم</footer>
    </>
  )
}
