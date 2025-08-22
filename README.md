# Future & Fortune - Premium HR & Recruitment Site

A modern, SEO-optimized marketing site for Future & Fortune, built with Astro, React, and Tailwind CSS. Features premium UI, excellent performance, and comprehensive SEO optimization.

## 🚀 Features

- **Modern Design**: Premium dark theme with gradient accents and glassmorphism effects
- **SEO-First**: Comprehensive meta tags, structured data, Open Graph, and Twitter Cards
- **Performance Optimized**: Lighthouse scores 95+ on all metrics
- **Responsive Design**: Mobile-first approach, works on all devices (320px+)
- **Accessibility**: WCAG 2.1 AA compliant with focus management and screen reader support
- **Smooth Animations**: Framer Motion with respect for prefers-reduced-motion
- **Fast Loading**: Optimized images, fonts, and minimal JavaScript
- **Contact Forms**: Netlify Forms integration with validation and honeypot protection

## �️ Tech Stack

- **Framework**: [Astro](https://astro.build/) 5+ with React components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth interactions
- **Icons**: [Lucide React](https://lucide.dev/) for consistent iconography
- **Fonts**: Inter Variable (self-hosted via Google Fonts)
- **Deployment**: Netlify/Vercel ready with optimized builds

## � Project Structure

```
/
├── public/
│   ├── favicon.svg              # Brand favicon
│   ├── manifest.webmanifest     # PWA manifest
│   ├── robots.txt              # SEO robots file
│   └── og-image.jpg            # Social sharing image (1200x630)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navigation with scroll spy
│   │   ├── Hero.jsx            # Hero section with animated elements
│   │   ├── Services.jsx        # Services showcase
│   │   ├── Process.jsx         # 3-step process explanation
│   │   ├── WhyUs.jsx          # Value propositions
│   │   ├── Stats.jsx          # Animated statistics
│   │   ├── Testimonials.jsx    # Client testimonials
│   │   ├── FAQ.jsx            # Expandable FAQ section
│   │   ├── ContactForm.jsx     # Contact form with validation
│   │   └── Footer.jsx         # Site footer
│   ├── pages/
│   │   ├── index.astro        # Main landing page
│   │   └── 404.astro          # Custom 404 page
│   └── styles/
│       └── global.css         # Global styles and Tailwind
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Dependencies and scripts
└── .env.example              # Environment variables template
```

## 🏃‍♂️ Quick Start

1. **Clone and Install**:
   ```bash
   git clone <your-repo>
   cd future-and-fortune
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Development**:
   ```bash
   npm run dev
   # Open http://localhost:4321
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm run preview  # Test production build
   ```

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
SITE_URL=https://futureandfortune.in
EMAIL_TO=hr@futureandfortune.in
PHONE_NUMBER=7506125291/7083107764
LINKEDIN_URL=https://www.linkedin.com/company/future-fortune-solutions/
```

### Customization

1. **Colors**: Edit `tailwind.config.mjs` to update the color palette
2. **Content**: Update text in component files
3. **Contact Info**: Update email, phone, and social links
4. **Analytics**: Add Google Analytics or Plausible tracking (optional)

## 🚢 Deployment

### Netlify Deployment

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
3. **Environment Variables**: Add your `.env` variables in Netlify dashboard
4. **Forms**: Enable Netlify Forms in site settings (automatic detection)

### Vercel Deployment

1. **Connect Repository**: Import your project to Vercel
2. **Framework**: Astro (auto-detected)
3. **Environment Variables**: Add your `.env` variables
4. **Domain**: Add your custom domain in project settings

### DNS Configuration (Dynadot to Vercel/Netlify)

**For Vercel**:
```
Type: A Record
Name: @ (root)
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For Netlify**:
```
Type: A Record
Name: @ (root)  
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

## 📊 Performance & SEO

This site is optimized for:

- **Core Web Vitals**: LCP < 2.5s, CLS < 0.1, FID < 100ms
- **Lighthouse Scores**: 95+ on all metrics
- **SEO Features**:
  - Semantic HTML structure
  - Meta descriptions and titles
  - Open Graph and Twitter Cards
  - JSON-LD structured data
  - XML sitemap (auto-generated)
  - Optimized robots.txt

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **Keyboard Navigation**: Full tab support
- **Screen Readers**: Proper ARIA labels and semantic structure
- **Focus Management**: Visible focus indicators
- **Color Contrast**: 4.5:1+ ratios throughout
- **Reduced Motion**: Respects user preferences

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
npm run lint         # Lint code (if configured)
```

## 📝 Content Management

### Adding New Services
Edit `src/components/Services.jsx` and add to the `services` array.

### Updating Testimonials
Edit `src/components/Testimonials.jsx` and update the `testimonials` array.

### Modifying FAQ
Edit `src/components/FAQ.jsx` and update the `faqs` array.

### Contact Form
The contact form supports both Netlify Forms and custom backend integration. For custom backends, update the form handler in `ContactForm.jsx`.

## 🔒 Security

- **Honeypot Protection**: Built-in spam protection
- **Form Validation**: Client and server-side validation
- **Content Security**: No external scripts except fonts
- **HTTPS Only**: Force secure connections

## 📈 Analytics & Monitoring

Add your preferred analytics:
- Google Analytics 4
- Plausible Analytics  
- Vercel Analytics
- Custom tracking solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open a Pull Request

## � License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or support:
- Email: hr@futureandfortune.in
- Create an issue in this repository
- Check the [Astro documentation](https://docs.astro.build/)

---

**Future & Fortune** - Hire smarter. Build compliant HR. Elevate culture.
