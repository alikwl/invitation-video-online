# VideoInvitation.online | Custom Animated Video Cards

🌐 **Live Website:** [https://videoinvitation.online/](https://videoinvitation.online/)  
📲 **WhatsApp Booking Hotline:** [+92 300 4846929](https://wa.me/923004846929)  
🎨 **Creative Director & Animator:** Malik Waseem

---

## 🌟 About The Project
**VideoInvitation.online** is a modern, luxury web platform showcasing custom animated video invitations and digital business cards crafted by Malik Waseem. 

### Key Features:
- **11 Curated Real Samples:** Full HD 1080p vertical video samples for Weddings (Barat, Walima, Mehndi), Digital Visiting Cards, Kids Birthdays, Islamic Aqiqah, Corporate Grand Openings, and 3D Motion Graphics.
- **Fast-Loading Architecture:** Pre-generated lightweight poster thumbnails in `assets/thumbnails/` prevent heavy video buffering on initial page load.
- **Single Video Playback Engine:** Auto-pauses background videos when one is played.
- **Hero Video Sound Toggle:** Interactive unmute/mute button with pulsing animation.
- **Video Preview Lightbox Modal:** Full-screen vertical video player with direct WhatsApp ordering.
- **100% Mobile Responsive:** Tested across compact mobile screens (320px–360px), tablets, and 4K displays.
- **Instant WhatsApp Order Builder:** Interactive form that pre-populates selected sample styles, duration packages, audio preferences, and event details.
- **SEO & Social Sharing Ready:** Open Graph tags, Twitter Card meta tags, and high-res vector SVG branding.

---

## 📁 Project Structure
```text
invitation-card-website/
├── CNAME                         # Configured for videoinvitation.online
├── index.html                    # Main responsive webpage
├── style.css                     # Luxury black & gold design system
├── script.js                     # Interactive player, filters & WhatsApp builder
├── README.md                     # Documentation
├── .gitignore                    # Git ignore file
└── assets/
    ├── logo.svg                  # Brand vector logo
    ├── favicon.svg               # Browser favicon
    ├── thumbnails/               # High-res poster preview images
    └── videos/                   # 11 vertical MP4 video cards
```

---

## 🚀 GitHub Pages & Custom Domain Setup
This repository is configured for deployment on **GitHub Pages** with custom domain `videoinvitation.online`.

### DNS Settings for `videoinvitation.online`:
Add the following DNS records in your domain registrar (e.g., Spaceship, Namecheap, Cloudflare):

1. **A Records** (Pointing apex domain `@` to GitHub Pages IPs):
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

2. **CNAME Record** (for `www` subdomain):
   - **Type:** `CNAME`
   - **Host / Name:** `www`
   - **Target / Value:** `alikwl.github.io.`

3. In GitHub Repository:
   - Go to **Settings** -> **Pages**
   - Source: **Deploy from a branch** (`main` / root `/`)
   - Custom domain: `videoinvitation.online`
   - Check **Enforce HTTPS**

---

© 2026 VideoInvitation.online by Malik Waseem. All Rights Reserved.
