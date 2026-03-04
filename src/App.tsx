import { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Preloader from './components/Preloader'
import img4 from './assets/img4.jpg'


const Home = lazy(() => import('./components/Home'))
const Pricing = lazy(() => import('./components/Pricing'))
const FAQ = lazy(() => import('./components/FAQ'))



const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'info'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {type === 'success' ? '✓' : 'ℹ'}
      </div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  )
}


const PlanModal = ({ isOpen, selectedPlanName, onClose, onConfirm }: { isOpen: boolean; selectedPlanName: string; onClose: () => void; onConfirm: () => void }) => {
  if (!isOpen) return null

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-icon">🎉</div>
        <h2 className="modal-title">Отличный выбор!</h2>
        <p className="modal-subtitle">Вы выбрали план <strong>{selectedPlanName}</strong></p>
        <div className="modal-features">
          <p className="modal-text">Получите доступ к эксклюзивным предложениям и персональному сервису</p>
        </div>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={onConfirm}>Начать сейчас</button>
          <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </>
  )
}



function App() {
  const [selectedPlan, setSelectedPlan] = useState<'month' | 'year'>(() => {
    const p = localStorage.getItem('selectedPlan')
    return p === 'year' ? 'year' : 'month'
  })
  const [email, setEmail] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode')
    if (stored === 'true' || stored === 'false') {
      return stored === 'true'
    }
    
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })


  useEffect(() => {
    const stored = localStorage.getItem('wishlist')
    if (stored) {
      try {
        setWishlist(JSON.parse(stored))
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlanName, setSelectedPlanName] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  const navigate = useNavigate()

  
  useLayoutEffect(() => {
    // set attribute before paint to avoid flash
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode ? 'true' : 'false')
  }, [darkMode])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const goTo = (section: string, route?: string) => {
    
    if (section === 'pricing' && location.pathname !== '/') {
      navigate('/pricing')
      return
    }

    if (route && location.pathname !== route) {
      navigate(route)
     
      if (section) {
        setTimeout(() => scrollToSection(section), 300)
      }
    } else if (section) {
      scrollToSection(section)
    }
  }

  const location = useLocation()
  useEffect(() => {
    
    setLoading(true)
    const tid = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(tid)
  }, [location])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

 
  useEffect(() => {
    localStorage.setItem('selectedPlan', selectedPlan)
  }, [selectedPlan])

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type })
  }

  const handlePlanSelect = (planName: string) => {
    setSelectedPlanName(planName)
    setIsModalOpen(true)
  }

  const handleConfirmPlan = () => {
    showToast(`✓ План "${selectedPlanName}" выбран! Оформление подписки...`, 'success')
    setIsModalOpen(false)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      showToast(`✓ Спасибо! Промокод отправлен на ${email}`, 'success')
      setEmail('')
    }
  }

  if (loading) return <Preloader />

  return (
      <div className="app">
        <nav className="navbar">
        <div className="navbar-content">
          <div className="logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            <span className="logo-icon">🛒</span>
            <span className="logo-text">GreenMart</span>
          </div>
          
          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <button className="nav-link" onClick={() => goTo('advantages', '/')}>Преимущества</button>
            <button className="nav-link" onClick={() => goTo('how-it-works', '/')}>Как это работает</button>
            <button className="nav-link" onClick={() => goTo('reviews', '/')}>Отзывы</button>
            <button className="nav-link" onClick={() => goTo('pricing', '/')}>Тарифы</button>
            <button className="nav-link" onClick={() => goTo('faq', '/')}>Вопросы</button>
          </div>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={() => setDarkMode(prev => !prev)}>
              {darkMode ? '🌞' : '🌙'}
            </button>
            <button className="nav-button" onClick={() => goTo('pricing', '/')}>Начать</button>
            <button className={`burger-menu ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* основной контент */}
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route
            path="/"
            element={<Home
              scrollToSection={scrollToSection}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              handlePlanSelect={handlePlanSelect}
            />}
          />
          <Route
            path="/pricing"
            element={<Pricing
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              handlePlanSelect={handlePlanSelect}
            />}
          />
          <Route path="/faq" element={<FAQ />} />
          
        </Routes>
      </Suspense>

     

      
      <section className="cta" style={{ backgroundImage: `url(${img4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 0 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="cta-title">Готов начать экономить?</h2>
          <p className="cta-subtitle">Скидка 20% на первый заказ для новых клиентов</p>
          
          <form className="cta-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Введите ваш email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Получить предложение
            </button>
          </form>
        </div>
      </section>

     
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <span className="logo-icon">🛒</span>
                <span>GreenMart</span>
              </div>
              <p className="footer-desc">Лучший выбор продуктов с доставкой в день заказа</p>
            </div>
            
            <div className="footer-col">
              <h4>Навигация</h4>
              <ul>
                <li><button onClick={() => scrollToSection('home')} className="footer-link">Главная</button></li>
                <li><button onClick={() => scrollToSection('advantages')} className="footer-link">Преимущества</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="footer-link">Тарифы</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Информация</h4>
              <ul>
                <li><button onClick={() => scrollToSection('faq')} className="footer-link">Вопросы</button></li>
                <li><button onClick={() => scrollToSection('reviews')} className="footer-link">Отзывы</button></li>
                <li><a href="#" className="footer-link">Политика конфиденциальности</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Свяжитесь с нами</h4>
              <div className="social-links">
                <a href="#" className="social-link" title="Facebook">📘</a>
                <a href="#" className="social-link" title="Twitter">🐦</a>
                <a href="#" className="social-link" title="Instagram">📷</a>
                <a href="#" className="social-link" title="Telegram">📱</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 GreenMart. Все права защищены.</p>
          </div>
        </div>
      </footer>

     
      <PlanModal 
        isOpen={isModalOpen} 
        selectedPlanName={selectedPlanName}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPlan}
      />
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      </div>
  )
}

export default App
