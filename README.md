Here is a clean, professional `README.md` for your weather app. It highlights the retro-pixel aesthetic and the seamless UI components you've built.

---

# 🌦️ Intissar Weather Dashboard

A stylish, retro-modern weather dashboard featuring a unique **pixel-art aesthetic**. This project uses custom CSS layouts to create a seamless, non-scrolling interface with a vertical sidebar and a decorative "cloud" footer.

## 🎨 Design Features

* **Pixel-Art Typography:** Powered by the `Silkscreen` font for a classic gaming feel.
* **Seamless Cloud Pattern:** A custom-engineered footer where cloud images are stitched together with zero gaps.
* **Dynamic Layout:** Uses **CSS Grid** for a three-column structure (Sidebar | Main Weather | Stats).
* **Overlapping UI:** Advanced absolute positioning allows weather condition images (like the Sunflower Cat) to overlap text for a layered look.

## 📁 Project Structure

```text
├── index.html       # Structure of the dashboard
├── style.css        # Custom layout and theme variables
└── images/          # Compressed asset folder
    ├── img4.webp    # Seamless cloud pattern
    ├── img5.webp    # Decorative music icon
    └── img6.webp    # Main weather condition image

```

## 🛠️ Technical Implementation

### CSS Grid Architecture

The app uses a fixed-height layout to ensure it fits perfectly on any screen without scrolling:

```css
grid-template-columns: 80px 1fr 200px;

```

### Gapless Image Stitching

To achieve the footer seen in the design, the cloud images use `display: block` and a calculated width to eliminate "ghost spaces" or baseline gaps:

```css
.weather-footer__image {
    width: 20%;      /* For 5 repeating images */
    display: block;  /* Removes inline gaps */
}

```

## 🚀 How to Run

1. Ensure all images are placed in the `images/` directory.
2. Open `index.html` in any modern web browser.
3. The layout is optimized for desktop viewports to maintain the pixel-perfect alignment.
