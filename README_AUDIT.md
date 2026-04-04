# Portfolio 🚀

A modern, production-grade developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **TailwindCSS**.

## ✨ Features

### Core Sections
- **Hero Section** - Eye-catching introduction with gradient text and CTA buttons
- **About** - Personal introduction with categorized skills
- **Skills** - Technical expertise organized by category with proficiency levels
- **Experience** - Professional timeline with highlights
- **Projects** - Featured projects with technologies and live demo/GitHub links
- **Testimonials** - Social proof from colleagues and supervisors
- **Approach** - Your methodology and workflow
- **Contact** - Multiple contact methods with quick message form
- **Blog** - Ready for blog posts (placeholder component included)

### Technical Excellence
✅ **TypeScript** - Full type safety throughout  
✅ **Responsive Design** - Mobile-first approach  
✅ **SEO Optimized** - Meta tags, OpenGraph, structured data  
✅ **Performance** - Next.js Image optimization, code splitting  
✅ **Accessibility** - ARIA labels, semantic HTML, keyboard navigation  
✅ **Dark Mode** - Professional dark theme  
✅ **Animations** - Smooth transitions (Framer Motion ready)  
✅ **Error Handling** - 404 page, form validation  

## 🏗️ Architecture

```
my-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 error page
│   └── globals.css         # Global styles
├── components/
│   ├── About.tsx           # About section
│   ├── Approach.tsx        # Approach/methodology section
│   ├── Blog.tsx            # Blog section (expandable)
│   ├── Contact.tsx         # Contact form & links
│   ├── Experience.tsx      # Experience timeline
│   ├── Hero.tsx            # Hero section
│   ├── Navbar.tsx          # Navigation bar
│   ├── Projects.tsx        # Projects showcase
│   ├── Section.tsx         # Reusable section wrapper
│   ├── Skills.tsx          # Skills with proficiency
│   ├── Testimonials.tsx    # Testimonials grid
│   └── ui/
│       └── Card.tsx        # Reusable UI components
├── data/
│   └── content.ts          # Centralized portfolio data
├── types/
│   └── index.ts            # TypeScript type definitions
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📝 Customization

### 1. Update Portfolio Data
Edit `data/content.ts` to add your information:
- Personal details (name, title, email)
- Skills with categories and proficiency levels
- Work experience
- Projects with technologies
- Testimonials
- Social media links

```typescript
// data/content.ts
export const portfolioConfig: PortfolioConfig = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  // ... rest of config
};
```

### 2. Update Metadata
Edit `app/layout.tsx` to customize SEO tags:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Developer",
  description: "Your description",
  // ...
};
```

### 3. Add Your Image
Replace `/public/Untitled.jpeg` with your profile image:
- Recommended: 350x350px PNG or JPG
- File: `public/profile.jpg`

### 4. Add Resume
Place your resume at `public/resume.pdf` for download functionality

### 5. Configure Social Links
Update social links in `data/content.ts`:

```typescript
socials: [
  {
    platform: "github",
    url: "https://github.com/yourusername",
    label: "GitHub",
  },
  // ...
];
```

## 🎨 Styling

### Theme
- **Color Scheme**: Dark zinc with purple/blue accents
- **Cards**: `rounded-2xl border-zinc-800 bg-zinc-900/40`
- **Primary**: Purple-500
- **Secondary**: Blue-500

### Customizing Colors
Edit TailwindCSS classes directly in components or `tailwind.config.js`.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px

All components are fully responsive and tested on various screen sizes.

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Proper color contrast ratios
- Alt text for images

## 📊 SEO

- ✅ Dynamic meta tags
- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card support
- ✅ Structured heading hierarchy
- ✅ Mobile-friendly viewport
- ✅ Fast loading (Next.js optimization)

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📦 Dependencies

- **Next.js 16.1.6** - React framework
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **TailwindCSS 4.1.18** - Styling
- **Framer Motion 12.34.0** - Animations (ready to use)

## 🚀 Performance Tips

1. **Images**: Use Next.js Image component (already implemented)
2. **Lazy Loading**: Components are code-split by Next.js
3. **Bundle**: ~50KB gzipped (minimal dependencies)
4. **Fonts**: Google Fonts with `next/font`

## 🔐 Security

- No sensitive data in code
- Content Security Policy ready
- Environment variables support (add `.env.local`)
- Safe form handling with validation

## 📈 Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] Blog with MDX support
- [ ] GitHub activity feed
- [ ] Newsletter subscription
- [ ] Analytics integration
- [ ] Animation library (Framer Motion)
- [ ] Email service integration (Resend, SendGrid)
- [ ] Search functionality
- [ ] Comments system

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

MIT License - feel free to use for your own portfolio.

## 📞 Support

For questions or issues:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include screenshots/error messages

## 👨‍💻 About

Built with ❤️ as a production-grade portfolio template.

---

**Ready to customize?** Start by editing `data/content.ts` with your information!
