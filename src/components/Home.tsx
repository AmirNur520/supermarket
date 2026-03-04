import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import FAQItem from './FAQItem'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'

interface HomeProps {
  scrollToSection: (id: string) => void
  wishlist: number[]
  toggleWishlist: (id: number) => void
  selectedPlan: 'month' | 'year'
  setSelectedPlan: React.Dispatch<React.SetStateAction<'month' | 'year'>>
  handlePlanSelect: (planName: string) => void
}

const Home: React.FC<HomeProps> = ({
  scrollToSection,
  wishlist,
  toggleWishlist,
  selectedPlan,
  setSelectedPlan,
  handlePlanSelect,
}) => {
  const advantages = [
    { icon: '📦', title: 'Широкий ассортимент', desc: 'Тысячи товаров на любой вкус' },
    { icon: '⚡', title: 'Молнисонная доставка', desc: 'Заказы уже на следующий день' },
    { icon: '🌿', title: 'Экологичные продукты', desc: 'Только сертифицированные поставщики' },
    { icon: '💳', title: 'Удобная оплата', desc: 'Любой способ — карта, наличные, онлайн' },
    { icon: '📞', title: 'Поддержка 24/7', desc: 'Наш оператор всегда на связи' },
    { icon: '🔁', title: 'Гибкие возвраты', desc: 'Обмен и возврат без проблем' },
  ]

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        <div className="hero-grid">
          <div className="hero-dots"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <span className="hero-badge">
                <span className="badge-dot"></span> Онлайн‑гипермаркет
              </span>
              <h1 className="hero-title">
                Ваш <span className="gradient-text">лучший</span> выбор продуктов
              </h1>
              <p className="hero-subtitle">
                Быстрая доставка, супер‑цены и тысячи товаров — всё для вашего удобства.
              </p>
              <ul className="hero-benefits">
                <li><span className="benefit-check">✓</span> Бесплатная регистрация</li>
                <li><span className="benefit-check">✓</span> Доставка за 24 часа</li>
                <li><span className="benefit-check">✓</span> Экологичные продукты</li>
              </ul>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={() => scrollToSection('pricing')}>Начать</button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('faq')}>Подробнее</button>
              </div>
              <div className="hero-social">
                <div className="avatars">
                  <div className="avatar avatar-1">А</div>
                  <div className="avatar avatar-2">Б</div>
                  <div className="avatar avatar-3">В</div>
                </div>
                <div className="social-text">+12&nbsp;000 довольных клиентов</div>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-image-wrapper">
                <div className="hero-blob-bg"></div>
                <div className="hero-image">
                  <img src={img1} className="image-placeholder" alt="hero" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-section">
        <div className="marquee">
          <div className="marquee-content">
            {['Скидки до 70% на орехи', 'Доставка в любую точку города', 'Премиум план с бонусами', 'Экологичные продукты', 'Круглосуточная поддержка', 'Новые товары каждый день'].map((text, i) => (
              <div key={i} className="marquee-item">{text}</div>
            ))}
            
            {['Скидки до 70% на орехи', 'Доставка в любую точку города', 'Премиум план с бонусами', 'Экологичные продукты', 'Круглосуточная поддержка', 'Новые товары каждый день'].map((text, i) => (
              <div key={"dup" + i} className="marquee-item">{text}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="advantages" id="advantages">
        <div className="container">
          <h2 className="section-title"><span className="section-icon">🌟</span> Почему именно мы</h2>
          <div className="advantages-grid">
            {advantages.map((adv, i) => (
              <div key={i} className="advantage-card animated-card">
                <button
                  className="advantage-wishlist"
                  onClick={() => toggleWishlist(i)}
                >
                  {wishlist.includes(i) ? '❤️' : '🤍'}
                </button>
                <div className="advantage-icon">{adv.icon}</div>
                <h3 className="advantage-title">{adv.title}</h3>
                <p className="advantage-desc">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats" id="stats">
        <div className="container">
          <AnimatedCounter value={12000} label="заказов" />
          <AnimatedCounter value={5000} label="клиентов" />
          <AnimatedCounter value={99} label="доставка" />
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <h2 className="section-title"><span className="section-icon">⚙️</span> Как это работает</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '60px' }}>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-icon">🛒</div>
                <h3 className="step-title">Выбираете товар</h3>
                <p className="step-desc">Просматривайте каталог и добавляйте всё, что нужно.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-icon">📝</div>
                <h3 className="step-title">Оформляете заказ</h3>
                <p className="step-desc">Указываете адрес и способ доставки за пару кликов.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-icon">🚚</div>
                <h3 className="step-title">Получаете посылку</h3>
                <p className="step-desc">Курьер привозит покупку прямо к вашему порогу.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={img2} alt="How it works" style={{ maxWidth: '100%', borderRadius: '20px', boxShadow: 'var(--shadow)' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="reviews" id="reviews">
        <div className="container">
          <h2 className="section-title"><span className="section-icon">💬</span> Отзывы клиентов</h2>
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <img src={img3} alt="Reviews showcase" style={{ maxWidth: '100%', borderRadius: '20px', boxShadow: 'var(--shadow)', maxHeight: '300px', objectFit: 'cover' }} />
          </div>
          <div className="reviews-grid">
            {[
              { initials: 'АК', name: 'Анна Карпенко', text: 'Обожаю ваш гипермаркет! Доставка молниеносная, товары свежие, цены отличные. Буду заказывать постоянно!' },
              { initials: 'МВ', name: 'Максим Варенко', text: 'Самое удобное мобильное приложение, которое когда-либо видел. Заказываю все необходимое за минуту. Спасибо!' },
              { initials: 'СП', name: 'Светлана Павленко', text: 'Качество товаров на высоте! Экологичные продукты, хороший выбор органической еды. Это то, что нужно!' },
            ].map((review, i) => (
              <div key={i} className="review-card">
                <div className="review-quotes">❝</div>
                <p className="review-text">{review.text}</p>
                <div className="review-footer">
                  <div className="review-avatar">{review.initials}</div>
                  <div>
                    <div className="review-name">{review.name}</div>
                    <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="rating" id="rating">
        <div className="container">
          <h2 className="section-title"><span className="section-icon">⭐</span> Рейтинг гипермаркета</h2>
          <div className="rating-content" style={{ textAlign: 'center', fontSize: '24px', margin: '20px 0' }}>
            <span>⭐⭐⭐⭐☆</span> <span style={{ fontWeight: 700 }}>4.8/5</span>
            <p style={{ color: 'var(--text-gray)', marginTop: '8px' }}>Средняя оценка от клиентов</p>
          </div>
        </div>
      </section>

      
      <section className="pricing" id="pricing">
        <div className="container">
          <h2 className="section-title"><span className="section-icon">💳</span> Выбери свой план</h2>
          
          <div className="pricing-toggle">
            <button 
              className={`toggle-btn ${selectedPlan === 'month' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('month')}
            >
              Месяц
            </button>
            <button 
              className={`toggle-btn ${selectedPlan === 'year' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('year')}
            >
              Год <span className="discount-badge">-20%</span>
            </button>
          </div>

          <div className="pricing-grid">
            {[
              { name: 'Доступный', priceMonth: 0, priceYear: 0, features: ['Регистрация бесплатная', 'Доставка +99 ₽', 'Базовый каталог'], popular: false },
              { name: 'Премиум', priceMonth: 299, priceYear: 2392, features: ['Свободная доставка', 'Приоритетный сервис', 'Личный помощник', 'Скидка 10% всегда'], popular: true },
              { name: 'VIP', priceMonth: 599, priceYear: 4792, features: ['Свободная доставка 24/7', 'Консьерж сервис', 'Скидка 20% всегда', 'Подарки каждый месяц'], popular: false },
            ].map((plan, i) => (
              <div key={i} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Популярный</div>}
                <h3 className="pricing-name">{plan.name}</h3>
                <div className="pricing-price">
                  {selectedPlan === 'month' ? (
                    plan.priceMonth === 0 ? (
                      <span className="free">Бесплатный</span>
                    ) : (
                      <>
                        <span className="price-value">{plan.priceMonth}</span>
                        <span className="price-currency">₽</span>
                      </>
                    )
                  ) : (
                    plan.priceYear === 0 ? (
                      <span className="free">Бесплатный</span>
                    ) : (
                      <>
                        <span className="price-value">{plan.priceYear}</span>
                        <span className="price-currency">₽</span>
                      </>
                    )
                  )}
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, j) => (
                    <li key={j}>✓ {feature}</li>
                  ))}
                </ul>
                <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handlePlanSelect(plan.name)}>
                  Выбрать сейчас
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="faq" id="faq">
        <div className="container">
          <h2 className="section-title"><span className="section-icon">❓</span> Часто задаваемые вопросы</h2>
          <div className="faq-container">
            {[
              { q: 'Какой минимальный заказ?', a: 'Нет минимального заказа. Вы можете заказать даже один товар, и мы доставим его быстро и безопасно.' },
              { q: 'Как часто обновляется каталог?', a: 'Каталог обновляется ежедневно. Каждый день появляются новые товары и актуальные акции.' },
              { q: 'Есть ли возврат товара?', a: 'Да, 30 дней гарантия на все товары. Если не подошло, вернём деньги полностью.' },
              { q: 'Как получить скидку?', a: 'Подпишитесь на Премиум план и получите 10% скидку на все покупки, плюс ежемесячные бонусы.' },
              { q: 'Доставляете ли вы за город?', a: 'Да, доставляем в радиусе 50 км от города. Стоимость доставки рассчитывается индивидуально.' },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
