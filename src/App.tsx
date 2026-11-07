
import React, { useState } from 'react'

const rooms = [
  { name: 'سهرة النجوم ⭐', host: 'MO', users: 28, tag: 'نشطة الآن', color: '#7045b8' },
  { name: 'لمة الأصدقاء ❤️', host: 'MERO', users: 16, tag: 'دردشة', color: '#a33c70' },
  { name: 'عالم التحديات 🎮', host: 'SULTAN', users: 12, tag: 'ألعاب', color: '#286b83' },
  { name: 'VIP Lounge 👑', host: 'NOOR', users: 35, tag: 'VIP', color: '#98732d' },
]

const games = ['🎲 لودو', '🎱 بلياردو', '🌾 المزرعة', '🎡 عجلة الحظ']

export default function App() {
  const [tab, setTab] = useState('الرئيسية')
  const [joined, setJoined] = useState('')
  const [liked, setLiked] = useState(false)

  return (
    <div className="app">
      <style>{`
        *{box-sizing:border-box}
        body{margin:0;background:#090811;color:#fff;font-family:Arial,sans-serif}
        button{font:inherit;cursor:pointer}
        .app{max-width:520px;min-height:100vh;margin:auto;background:#100e1b;padding-bottom:85px;overflow:hidden}
        .top{padding:20px 17px 15px;background:linear-gradient(130deg,#211637,#11101d);border-bottom:1px solid #342449}
        .toprow{display:flex;justify-content:space-between;align-items:center}
        .logo{font-size:25px;font-weight:900;color:#f5d58b;letter-spacing:1px}
        .sub{font-size:11px;color:#b8a9ca;margin-top:5px}
        .coins{background:#2b2039;border:1px solid #71518d;padding:10px 13px;border-radius:22px;color:#f5d58b;font-weight:bold}
        .profile{display:flex;align-items:center;gap:12px;margin-top:20px}
        .avatar{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(140deg,#b78b43,#5e347f);border:2px solid #e9c778;font-weight:bold}
        .muted{color:#a99db7;font-size:12px}
        .section{padding:17px}
        .heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .heading h3{margin:0;font-size:17px}
        .gold{color:#f3ce82}
        .banner{padding:20px;border-radius:18px;background:linear-gradient(120deg,#392052,#17182d 70%,#594022);border:1px solid #76518c;position:relative;overflow:hidden}
        .banner h2{margin:0 0 8px;font-size:22px}
        .banner p{font-size:12px;color:#d0c2dc;margin:0 0 15px}
        .action{border:0;border-radius:20px;padding:10px 17px;background:linear-gradient(100deg,#e9c77c,#a87835);color:#24182a;font-weight:bold}
        .bannerIcon{position:absolute;right:15px;top:22px;font-size:60px;opacity:.8}
        .quick{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:15px}
        .quick button{background:#201a2d;border:1px solid #392c4b;border-radius:14px;padding:13px 3px;color:white;font-size:12px}
        .quick span{display:block;font-size:24px;margin-bottom:7px}
        .room{display:flex;align-items:center;gap:12px;padding:12px;background:#1c1828;border:1px solid #30253e;border-radius:15px;margin-bottom:10px}
        .roomart{width:57px;height:57px;border-radius:13px;display:grid;place-items:center;font-size:25px;flex-shrink:0}
        .roominfo{flex:1;min-width:0}
        .roominfo b{font-size:14px}
        .roominfo small{display:block;color:#a99db7;margin-top:7px;font-size:11px}
        .join{background:#30213f;color:#f4d58e;border:1px solid #77558b;border-radius:20px;padding:9px 13px;font-size:12px}
        .chips{display:flex;gap:8px;overflow:auto;padding-bottom:5px}
        .chip{white-space:nowrap;background:#211b2e;border:1px solid #3a2d4b;color:#d6c7e5;border-radius:18px;padding:9px 14px;font-size:12px}
        .gamegrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
        .game{background:linear-gradient(140deg,#29203a,#171522);border:1px solid #40304f;border-radius:15px;padding:18px 12px;text-align:center;font-weight:bold}
        .game span{font-size:32px;display:block;margin-bottom:9px}
        .bottom{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:520px;background:#171321;border-top:1px solid #443451;display:flex;justify-content:space-around;padding:11px 4px calc(11px + env(safe-area-inset-bottom));z-index:5}
        .nav{background:none;border:0;color:#968ba5;font-size:10px;min-width:54px}
        .nav span{display:block;font-size:21px;margin-bottom:5px}
        .nav.active{color:#f0cb7d}
        .notice{background:#251d32;border:1px solid #604778;color:#e5d4f1;border-radius:12px;padding:12px;font-size:12px;margin-top:12px}
        .empty{text-align:center;padding:45px 15px;color:#b6a9c3}
      `}</style>

      <header className="top">
        <div className="toprow">
          <div>
            <div className="logo">👑 DN-HALO</div>
            <div className="sub">عالمك.. أصدقاءك.. لحظاتك</div>
          </div>
          <div className="coins">💎 2,500</div>
        </div>
        <div className="profile">
          <div className="avatar">MO</div>
          <div>
            <b>أهلاً بك في DN-HALO</b>
            <div className="muted">مستوى 1 · عضو جديد</div>
          </div>
          <div style={{marginLeft:'auto',fontSize:23}}>🔔</div>
        </div>
      </header>

      {tab === 'الرئيسية' && <>
        <section className="section">
          <div className="banner">
            <div className="bannerIcon">👑</div>
            <h2>عالمك يبدأ من هنا</h2>
            <p>ادخل غرفتك المفضلة وتعرف على أصدقاء جدد</p>
            <button className="action" onClick={() => setTab('الغرف')}>اكتشف الغرف ←</button>
          </div>
          <div className="quick">
            <button onClick={() => setTab('الغرف')}><span>🎙️</span>الغرف</button>
            <button onClick={() => setTab('الألعاب')}><span>🎮</span>الألعاب</button>
            <button onClick={() => setTab('المتجر')}><span>🎁</span>الهدايا</button>
            <button onClick={() => setTab('أصدقائي')}><span>👥</span>الأصدقاء</button>
          </div>
        </section>

        <section className="section">
          <div className="heading"><h3>🔥 الغرف المميزة</h3><span className="muted">عرض الكل</span></div>
          {rooms.slice(0,3).map(room => <div className="room" key={room.name}>
            <div className="roomart" style={{background:room.color}}>🎙️</div>
            <div className="roominfo"><b>{room.name}</b><small>👑 {room.host} · 👥 {room.users} متصل</small></div>
            <button className="join" onClick={() => {setJoined(room.name);setTab('الغرف')}}>دخول</button>
          </div>)}
        </section>

        <section className="section">
          <div className="heading"><h3>🎮 منطقة الألعاب</h3><span className="muted">اكتشف</span></div>
          <div className="gamegrid">{games.map(g=><button className="game" key={g} onClick={()=>setTab('الألعاب')}>{g}</button>)}</div>
        </section>
      </>}

      {tab === 'الغرف' && <section className="section">
        <div className="heading"><h3>🎙️ الغرف الصوتية</h3><span className="gold">مباشر الآن</span></div>
        <div className="chips">{['الكل','دردشة','ألعاب','VIP','أصدقاء'].map(x=><button className="chip" key={x}>{x}</button>)}</div>
        {rooms.map(room=><div className="room" key={room.name}>
          <div className="roomart" style={{background:room.color}}>🎙️</div>
          <div className="roominfo"><b>{room.name}</b><small>👑 {room.host} · 👥 {room.users} متصل · {room.tag}</small></div>
          <button className="join" onClick={()=>setJoined(room.name)}>دخول</button>
        </div>)}
        {joined && <div className="notice">اخترت غرفة: {joined}. واجهة الغرفة الصوتية التفصيلية هنبنيها في الخطوة التالية.</div>}
      </section>}

      {tab === 'الألعاب' && <section className="section">
        <div className="heading"><h3>🎮 الألعاب والمرح</h3></div>
        <div className="gamegrid">{games.map(g=><button className="game" key={g} onClick={()=>setJoined(g)}>{g}<small className="muted" style={{display:'block',marginTop:8}}>قريباً</small></button>)}</div>
        <div className="notice">الألعاب دي واجهات مبدئية، ولسه هنبرمج اللعب الحقيقي والاتصال بين الأصدقاء.</div>
      </section>}

      {tab === 'المتجر' && <section className="section">
        <div className="heading"><h3>🎁 متجر DN-HALO</h3></div>
        <div className="banner"><h2>متجر الماسات</h2><p>هدايا وإطارات ودخوليات مميزة</p><div className="gold">💎 رصيدك التجريبي: 2,500</div></div>
        {['🎁 الهدايا','🖼️ الإطارات','✨ الدخوليات','👑 عضوية VIP'].map(x=><div className="room" key={x}><b>{x}</b><span className="muted" style={{marginLeft:'auto'}}>قريباً</span></div>)}
      </section>}

      {tab === 'أصدقائي' && <section className="section">
        <div className="heading"><h3>👥 أصدقائي</h3></div>
        <div className="empty">👥<h3>قائمة أصدقائك</h3><p>هنا هتظهر قائمة أصدقائك وحالة اتصالهم.</p></div>
      </section>}

      {tab === 'حسابي' && <section className="section">
        <div className="empty"><div className="avatar" style={{margin:'auto',width:75,height:75}}>MO</div><h2>ملفي الشخصي</h2><p>مستوى 1 · عضو DN-HALO</p><p className="gold">💎 2,500 ماسة تجريبية</p><button className="action" onClick={()=>setLiked(!liked)}>{liked?'⭐ تمت الإضافة':'⭐ إضافة للمفضلة'}</button></div>
      </section>}

      <nav className="bottom">
        {[['الرئيسية','🏠'],['الغرف','🎙️'],['الألعاب','🎮'],['المتجر','🎁'],['حسابي','👤']].map(([name,emoji])=><button key={name} className={'nav '+(tab===name?'active':'')} onClick={()=>setTab(name)}><span>{emoji}</span>{name}</button>)}
      </nav>
    </div>
  )
}
