# ☕ Razon's Cafe — Source Code

A fully interactive Filipino café menu website built with **Vite + React**.

## 🚀 Quick Start

```bash
npm install
npm run dev
```
Then open: http://localhost:5173

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🗂 Project Structure

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Root component
│
├── data/
│   ├── menuData.js       # All 27 menu items (COFFEE, NON_COFFEE, TEAS, SILOGS, PASTAS, OTHERS)
│   ├── icons.js          # 3D SVG food icons (base64 data URIs)
│   └── logo.js           # Cafe logo (base64)
│
├── store/
│   └── useStore.js       # Global state — cart, modal, drawer, toast
│
├── styles/
│   └── global.css        # Full CSS (3D design system, all components)
│
├── components/
│   ├── Nav/Navbar.jsx            # Fixed navbar with dropdown + mobile menu
│   ├── Hero/Hero.jsx             # Full-screen hero section
│   ├── Cart/CartSidebar.jsx      # Slide-in cart with photo thumbnails
│   ├── Modal/Modal.jsx           # Food detail popup (Silog + Others)
│   ├── Drawer/Drawer.jsx         # Side panel (Pasta — 4 tabs, spice, addons)
│   ├── Toast.jsx                 # Toast notification
│   ├── InfoStrip.jsx             # Marquee info strip
│   ├── AboutSection.jsx          # About the cafe
│   ├── ContactSection.jsx        # Contact info cards
│   ├── Footer.jsx                # Footer with links
│   └── sections/
│       ├── Coffee/
│       │   ├── CoffeeSection.jsx # Coffee + Non-Coffee sections
│       │   └── FlipCard.jsx      # 3D flip card (front photo + back details)
│       ├── Tea/
│       │   └── TeaSection.jsx    # Fruit tea expandable cards
│       ├── Food/
│       │   └── FoodSection.jsx   # Reusable food grid (Silog + Others)
│       └── Pasta/
│           └── PastaSection.jsx  # Pasta cards with drawer trigger
```

## ✨ Features

| Section | Interaction |
|---------|-------------|
| ☕ Coffee / 🥤 Non-Coffee | **3D flip card** — photo front, details back |
| 🍹 Fruit Tea | **Expandable card** — meters, hot/cold toggle, slider |
| 🍚 Silog Meals | **Modal popup** — protein select, sawsawan, nutrition |
| 🍝 Pasta | **Side drawer** — 4 tabs, spice level, addons |
| 🍟 Others + Dessert | **Modal popup** — sauce selector, richness dots |
| 🛒 Cart | **Slide-in sidebar** — thumbnails, qty controls, checkout |

## 🎨 Design

- **Fonts:** Cormorant Garamond (headings) + DM Sans (body)
- **Colors:** Espresso dark theme with gold accents
- **Icons:** Hand-crafted 3D SVG illustrations for all 27 items
- **Effects:** Film grain, floating orbs, multi-layer 3D shadows, specular highlights

## 📝 Customization

Edit `src/data/menuData.js` to update menu items, prices, or descriptions.
All 27 food icons are in `src/data/icons.js` as SVG data URIs — replace with real photos if preferred.
