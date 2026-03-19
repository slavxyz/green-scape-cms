

# Landscaping Website - Implementation Plan

## Overview
A multi-page landscaping business website with Home, Projects, Blog, About Us pages and an Admin Panel. Static/demo version with localStorage persistence for admin data. No authentication for now. Placeholder company name and phone number.

## Color Scheme
Natural, garden-inspired palette:
- Primary: Forest green (`142 50% 35%`)
- Secondary: Warm earth/sand (`38 40% 90%`)
- Accent: Soft gold (`45 80% 55%`)
- Background: Off-white (`60 20% 98%`)
- Text: Dark charcoal

## Pages & Components

### 1. Shared Layout
- **Navbar**: Logo + company name, links (Home, Projects, Blog, About Us), phone number displayed prominently, mobile hamburger menu
- **Footer**: Contact info, quick links, copyright

### 2. Home Page (`/`)
- Hero carousel/slider with landscaping images (placeholder images from Unsplash)
- Services section with 5 cards: mowing, subscription maintenance, planting, seeding/turf, irrigation
- CTA section

### 3. Projects Page (`/projects`)
- Grid of project cards (newest at top), each with image and description
- Data sourced from a local store (localStorage-backed)

### 4. Blog Page (`/blog`)
- List of article cards with title, date, excerpt, and thumbnail
- Individual blog post view (`/blog/:id`)

### 5. About Us Page (`/about`)
- Company story, team section, experience highlights

### 6. Admin Panel (`/admin`)
- Dashboard with tabs: Services, Projects, Blog, About
- CRUD forms for each section
- Data persisted to localStorage

## Technical Approach
- **State management**: React context + localStorage for demo data
- **Routing**: React Router (already set up)
- **Carousel**: Custom implementation or embla-carousel (already available via shadcn)
- **Images**: Unsplash placeholder URLs for landscaping imagery
- **Responsive**: Tailwind breakpoints, mobile-first

## File Structure
```text
src/
├── data/
│   └── siteData.ts          # Default data + localStorage helpers
├── contexts/
│   └── SiteDataContext.tsx   # Context provider for site data
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroCarousel.tsx
│   │   └── ServicesSection.tsx
│   ├── projects/
│   │   └── ProjectCard.tsx
│   ├── blog/
│   │   └── BlogCard.tsx
│   └── admin/
│       ├── AdminServices.tsx
│       ├── AdminProjects.tsx
│       ├── AdminBlog.tsx
│       └── AdminAbout.tsx
├── pages/
│   ├── Index.tsx             # Home page
│   ├── Projects.tsx
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   ├── About.tsx
│   └── Admin.tsx
└── App.tsx                   # Updated routes
```

## Implementation Order
1. Data layer (default content + context)
2. Layout (Navbar + Footer)
3. Home page (hero carousel + services)
4. Projects page
5. Blog page + individual post view
6. About Us page
7. Admin panel with CRUD for all sections
8. Responsive polish

