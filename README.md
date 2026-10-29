# 💍 Sahana & Sameep — Royal 3D Wedding Website

An immersive, production-ready, mobile-first 3D digital wedding invitation crafted exclusively for **Sahana & Sameep**.

- **Wedding Date**: Monday, 8 February 2027
- **Venue**: Vishwa Maanava Sabha Bhavana, Ripponpete, Shivamogga, Karnataka 577426
- **Google Maps Location**: [https://maps.app.goo.gl/Wdodm9NvCD5Bpccz8](https://maps.app.goo.gl/Wdodm9NvCD5Bpccz8)

---

## 📱 Mobile-First 3D Experience & Key Innovations

### 1. Dedicated S & S Wedding Brand Monogram (Crystal-Sharp Vector Asset)
- Replaced ordinary typed text with an intertwined calligraphic **S & S** master identity logo.
- Symmetrical, balanced luxury Indian wedding aesthetic with a delicate champagne-gold circular frame and blooming lotus crown.
- **Zero Raster Blur**: Uses pure vector geometry (`shape-rendering="geometricPrecision"`) with hardware-accelerated transforms.
- Standardized across:
  - Loading Screen
  - 3D Wax Seal on the Envelope
  - Emerging Invitation Card
  - Floating Mobile Navbar
  - Thank You Section & Footer
  - RSVP Confirmation Screen
  - Browser Favicon (`/public/favicon.svg`)
- Master vector files: [`src/assets/ss-monogram.svg`](file:///d:/sahana_wedding/src/assets/ss-monogram.svg) and [`src/assets/SSMonogram.jsx`](file:///d:/sahana_wedding/src/assets/SSMonogram.jsx).

### 2. Grand & Unique 3D Reversible Envelope Opening
- Built with true physical layers:
  1. **Layer 1: Back Wall & Gold Shimmer Damask Lining** (`z-10`)
  2. **Layer 2: Emerging Invitation Card** (`z-12` inside pocket, `z-35` when emerged)
  3. **Layer 3: Front Envelope Pocket Folds** (`z-20`, SVG polygon folds)
  4. **Layer 4 & 5: Top 3D Triangular Flap & Embossed Wax Seal** (`z-30` closed, `z-11` open)
- **State Machine**: `CLOSED` → `OPENING` → `OPEN` → `CLOSING` → `CLOSED`
- **Opening Flow**:
  1. **Tap the Golden Wax Seal**: Plays an acoustic chime and triggers a radiant gold sparkle burst (`canvas-confetti`).
  2. **3D Flap Unfolds**: Top triangular flap rotates backward around its upper hinge in true 3D (`rotateX(-180deg)`), revealing the golden damask lining.
  3. **Invitation Card Emerges**: The card glides smoothly out of the pocket, elevates, and settles into crystal-sharp focus.
  4. **Displays Exact Copy**:
     - *“TOGETHER WITH THEIR FAMILIES”*
     - *“SAHANA & SAMEEP”*
     - *“Invite you to celebrate their wedding.”*
     - *“Monday, 8 February 2027”*
     - *“Vishwa Maanava Sabha Bhavana, Ripponpete”*
  5. **Actions**: *“Explore Wedding Website”*, *“Fold & Close”*, and *“Directions”*.
- **Reverse Closing**: Tapping **“Fold & Close”** reverses the animation—the card glides back into the pocket, the top flap folds down, and the wax seal reseals.

### 3. Floating 3D Interlocking Wedding Rings (Three.js)
- Procedural Three.js 3D scene featuring two intertwined metallic gold bands (Sahana's champagne gold band with a faceted solitaire diamond + Sameep's rose gold band).
- Metallic specular reflections (`metalness: 0.95`, `roughness: 0.15`), multi-point studio lighting, and smooth slow vertical rotation.
- **Battery-Friendly**: Automatically pauses WebGL rendering via `IntersectionObserver` when scrolled off-screen.
- Caption: *“TWO HEARTS. ONE PROMISE.”*

### 4. Sacred Thread / Mangalsutra Kinetic Detail
- Elegant auspicious jewellery section featuring draped gold chain, obsidian black beads, traditional dual filigree cups (*wati*), and drop pearls.
- Subtle pendular physics sway animation on an ivory background.

### 5. Strict Smartphone-First Architecture
- Designed intentionally for phone viewports: 320px, 360px, 375px, 390px, 402px, and 430px.
- Zero horizontal overflow; all typography uses fluid `clamp()` sizing.
- Generous tap targets with minimum 44px–48px touch heights for thumb navigation.
- Safe-area support via `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
- On wider desktop screens, it maintains an elegant centered mobile presentation on an ambient dark espresso canvas.

---

## 🚀 Quick Run Instructions

```bash
# In the project workspace
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser and switch to Mobile Device Viewport (iPhone 14/15/16 Pro, Galaxy S23, Pixel 8).

### Test Guest Personalization
```
http://localhost:5173/?guest=Rahul%20%26%20Priya
```
The invitation card will display: **Specially Invited: Rahul & Priya**, and the RSVP form will pre-populate their name.

### Test Production Build
```bash
npm run build
```
Creates an optimized static bundle in `/dist` with split chunks for Three.js and Framer Motion.

---

## 🎨 Centralized Wedding Configuration

All wedding details are editable from one file: [`src/config/wedding.js`](file:///d:/sahana_wedding/src/config/wedding.js).
- Couple names and monogram
- Date: `Monday, 8 February 2027`
- Venue: `Vishwa Maanava Sabha Bhavana, Ripponpete`
- Google Maps link: `https://maps.app.goo.gl/Wdodm9NvCD5Bpccz8`
- Story timeline milestones
- Gallery photos and captions
- Dress code and color palettes
- Google Sheets RSVP endpoint (`VITE_RSVP_ENDPOINT`)
