import React from 'react'


interface PricingProps {
  selectedPlan: 'month' | 'year'
  setSelectedPlan: React.Dispatch<React.SetStateAction<'month' | 'year'>>
  handlePlanSelect: (planName: string) => void
}

const Pricing: React.FC<PricingProps> = ({ selectedPlan, setSelectedPlan, handlePlanSelect }) => {
  const plans = [
    { name: 'Доступный', priceMonth: 0, priceYear: 0, features: ['Регистрация бесплатная', 'Доставка +99 ₽', 'Базовый каталог'], popular: false },
    { name: 'Премиум', priceMonth: 299, priceYear: 2392, features: ['Свободная доставка', 'Приоритетный сервис', 'Личный помощник', 'Скидка 10% всегда'], popular: true },
    { name: 'VIP', priceMonth: 599, priceYear: 4792, features: ['Свободная доставка 24/7', 'Консьерж сервис', 'Скидка 20% всегда', 'Подарки каждый месяц'], popular: false },
  ]

  const [selectedCard, setSelectedCard] = React.useState<string | null>(null)

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Выбери свой план</h2>
        
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
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card ${plan.popular ? 'popular' : ''} ${selectedCard === plan.name ? 'selected' : ''}`}
              onClick={() => {
                setSelectedCard(plan.name)
                handlePlanSelect(plan.name)
              }}
            >
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
  )
}

export default Pricing
