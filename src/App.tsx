import { useState } from 'react';

const rooms = [
  { name: 'سهرة الأصدقاء', users: 28, icon: '🎙️' },
  { name: 'عالم الموسيقى', users: 16, icon: '🎵' },
  { name: 'ملتقى DN-HALO', users: 35, icon: '👑' },
];

const games = [
  { name: 'مزرعتي', icon: '🌱', desc: 'ازرع واحصد واجمع النقاط' },
  { name: 'عجلة الجوائز', icon: '🎡', desc: 'جوائز مجانية ونقاط افتراضية' },
  { name: 'تحدي الأصدقاء', icon: '🏆', desc: 'نافس أصدقاءك' },
];

export default function App() {
  const [page, setPage] = useState('الرئيسية');
  const [welcome, setWelcome] = useState(true);
  const [diamonds] = useState(2500);

  const menu = ['الرئيسية', 'الغرف', 'الألعاب', 'المتجر', 'حسابي'];

  return (
    <div className="app" dir="rtl">
      <header className="topbar">
        <div className="brand">
          <span>✦</span>
          <div>
            <h1>DN-HALO</h1>
            <small>عالمك.. أصحابك.. لحظاتك</small>
          </div>
        </div>
        <div className="balance">💎 {diamonds.toLocaleString()}</div>
      </header>

      <nav className="navigation">
        {menu.map(item => (
          <button
            key={item}
            className={page === item ? 'active' : ''}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="content">
        {page === 'الرئيسية' && (
          <>
            {welcome && (
              <section className="welcome">
                <h2>🎁 أهلاً بك في DN-HALO</h2>
                <p>هدية ترحيبية مجانية للمستخدمين الجدد</p>
                <div>✨ دخولية ترحيبية + إطار خاص</div>
                <button onClick={() => setWelcome(false)}>
                  استلم هديتك
                </button>
              </section>
            )}

            <section className="hero">
              <span>مرحباً بك في عالمك الجديد</span>
              <h2>اجمع أصحابك واصنع لحظاتك</h2>
              <p>غرف صوتية وألعاب وهدايا ومجتمع يجمع الأصدقاء.</p>
              <button onClick={() => setPage('الغرف')}>
                اكتشف الغرف
              </button>
            </section>

            <h2 className="section-title">الغرف المميزة 🎙️</h2>
            <div className="cards">
              {rooms.map(room => (
                <article className="room-card" key={room.name}>
                  <span>{room.icon}</span>
                  <h3>{room.name}</h3>
                  <p>👥 {room.users} متصل</p>
                  <button onClick={() => setPage('الغرف')}>استكشف</button>
                </article>
              ))}
            </div>

            <h2 className="section-title">اكتشف الألعاب 🎮</h2>
            <div className="cards">
              {games.map(game => (
                <article className="game-card" key={game.name}>
                  <span>{game.icon}</span>
                  <h3>{game.name}</h3>
                  <p>{game.desc}</p>
                  <button onClick={() => setPage('الألعاب')}>اكتشف</button>
                </article>
              ))}
            </div>
          </>
        )}

        {page === 'الغرف' && (
          <>
            <h2 className="section-title">الغرف الصوتية 🎙️</h2>
            <div className="cards">
              {rooms.map(room => (
                <article className="room-card" key={room.name}>
                  <span>{room.icon}</span>
                  <h3>{room.name}</h3>
                  <p>👥 {room.users} متصل</p>
                  <button onClick={() => alert('الغرف الصوتية قيد التجهيز')}>
                    دخول الغرفة
                  </button>
                </article>
              ))}
            </div>
          </>
        )}

        {page === 'الألعاب' && (
          <>
            <h2 className="section-title">منطقة الألعاب 🎮</h2>
            <div className="cards">
              {games.map(game => (
                <article className="game-card" key={game.name}>
                  <span>{game.icon}</span>
                  <h3>{game.name}</h3>
                  <p>{game.desc}</p>
                  <button onClick={() => alert('اللعبة قيد التجهيز')}>
                    دخول اللعبة
                  </button>
                </article>
              ))}
            </div>
          </>
        )}

        {page === 'المتجر' && (
          <>
            <h2 className="section-title">متجر DN-HALO 💎</h2>
            <div className="cards">
              <article className="store-card">
                <span>✨</span>
                <h3>الدخوليات</h3>
                <p>تأثيرات دخول مميزة للغرف.</p>
              </article>
              <article className="store-card">
                <span>💠</span>
                <h3>الإطارات</h3>
                <p>إطارات متناسقة مع الدخوليات.</p>
              </article>
              <article className="store-card">
                <span>👑</span>
                <h3>VIP</h3>
                <p>مميزات خاصة لمدة ثلاثة أشهر.</p>
              </article>
            </div>
          </>
        )}

        {page === 'حسابي' && (
          <section className="profile">
            <div className="profile-avatar">👤</div>
            <h2>ملفي الشخصي</h2>
            <p>مستخدم DN-HALO</p>
            <p>💎 {diamonds.toLocaleString()} ماسة</p>
            <div>✨ دخولية المستخدم الجديد</div>
            <div>💠 إطار ترحيبي مجاني</div>
          </section>
        )}
      </main>

      <footer>
        <strong>DN-HALO</strong>
        <p>© جميع الحقوق محفوظة</p>
        <small>★𓄂ᬼ𝐌𝐎𓆃★⁩</small>
      </footer>
    </div>
  );
}
