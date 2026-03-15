import React, { useEffect } from 'react'
import Navbar from './components/Nav/Navbar.jsx'
import CartSidebar from './components/Cart/CartSidebar.jsx'
import Modal from './components/Modal/Modal.jsx'
import Drawer from './components/Drawer/Drawer.jsx'
import Toast from './components/Toast.jsx'
import Hero from './components/Hero/Hero.jsx'
import InfoStrip from './components/InfoStrip.jsx'
import CoffeeSection from './components/sections/Coffee/CoffeeSection.jsx'
import TeaSection from './components/sections/Tea/TeaSection.jsx'
import FoodSection from './components/sections/Food/FoodSection.jsx'
import PastaSection from './components/sections/Pasta/PastaSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import { SILOGS, OTHERS } from './data/menuData.js'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <CartSidebar />
      <Modal />
      <Drawer />
      <Toast />

      <Hero />
      <InfoStrip />

      <CoffeeSection />

      <section className="section section-parchment" id="noncoffee">
        <div className="sec-hdr">
          <div className="sec-tag" style={{ color: 'var(--gold)' }}>
            <span className="sec-tag-line" />For Everyone<span className="sec-tag-line" />
          </div>
          <h2 className="sec-title">🥤 Non-Coffee <em style={{ fontStyle: 'italic' }}>Drinks</em></h2>
          <p className="sec-sub">Rich, creamy, and absolutely indulgent. Perfect for the whole family.</p>
        </div>
        <div className="flip-grid" id="nonCoffeeGrid" />
      </section>

      <TeaSection />

      <FoodSection
        id="silog"
        tag="Filipino Breakfast"
        title="🍚 Silog"
        titleEm="Meals"
        sub="The soul of Filipino morning dining. Sinangag + itlog + your favorite protein."
        items={SILOGS}
        gridId="silogGrid"
        bg="section-parchment"
      />

      <PastaSection />

      <FoodSection
        id="others"
        tag="Café Bites"
        title="🍟 Snacks &"
        titleEm="Desserts"
        sub="The perfect companions to your coffee or tea. Simple, done right."
        items={OTHERS}
        gridId="othersGrid"
        bg="section-parchment"
      />

      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
