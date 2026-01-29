# Niti's Portfolio Website

A calm, confident portfolio built with the "Quiet Confidence" philosophy.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety
- **GSAP** (optional) - Advanced animations

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── globals.css    # Design system & Tailwind
│   ├── layout.tsx     # Root layout with SEO
│   └── page.tsx       # Home page
├── components/
│   ├── Navigation.tsx # Sticky nav with section detection
│   ├── Hero.tsx       # Hero with entrance animations
│   ├── About.tsx      # About section
│   ├── Projects.tsx   # Project cards
│   ├── Contact.tsx    # Contact & footer
│   └── NitiGPT.tsx    # Toggleable assistant panel
└── lib/
    ├── projects.ts    # Project data
    └── nitigpt-content.ts # Assistant content
```

## Design Philosophy

- **Quiet Confidence**: Restraint as a statement
- **Typography-forward**: Words carry weight
- **Measured motion**: Every animation has purpose
- **40%+ whitespace**: Intentional negative space

## Customization

1. Edit `tailwind.config.ts` for colors/typography
2. Update `src/lib/projects.ts` with your projects
3. Modify `src/lib/nitigpt-content.ts` for assistant messages
