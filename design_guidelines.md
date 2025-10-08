# Design Guidelines: 2025 Trend-Forward Website Foundation

## Design Approach: Modern Minimalism (2025)
**Philosophy:** Embrace 2025's shift toward warm, grounded aesthetics with bold typography and strategic simplicity. The design balances generous whitespace with purposeful elements, creating an elevated yet approachable experience.

## Core Design Elements

### A. Color Palette (Earthy 2025 Trend)

**Light Mode:**
- Primary: Mocha Mousse `#A08676` (Pantone 2025 Color of the Year)
- Background: Warm Off-White `#FAF8F6`
- Text Primary: Deep Charcoal `#2C2624`
- Text Secondary: Warm Gray `#6B625C`
- Accent 1: Forest Green `#3D5A46`
- Accent 2: Terracotta `#C8754E`

**Dark Mode:**
- Primary: Lighter Mocha `#C4A896`
- Background: Deep Espresso `#1A1614`
- Text Primary: Cream `#F5F1ED`
- Text Secondary: Warm Mid-Gray `#B8AFA8`
- Accent 1: Sage Green `#6B8A75`
- Accent 2: Soft Terracotta `#D9927A`

### B. Typography

**Font Stack:**
- Primary: Inter Variable (Google Fonts) - modern geometric sans-serif
- Fallback: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

**Type Scale (Fluid with clamp()):**
- Hero Heading: `clamp(2.5rem, 8vw, 5rem)` - Weight 800
- H1: `clamp(2rem, 5vw, 3.5rem)` - Weight 700
- H2: `clamp(1.5rem, 4vw, 2.5rem)` - Weight 600
- H3: `clamp(1.25rem, 3vw, 1.75rem)` - Weight 600
- Body: `clamp(1rem, 2vw, 1.125rem)` - Weight 400
- Small: `clamp(0.875rem, 1.5vw, 1rem)` - Weight 400

**Line Heights:**
- Headings: 1.1-1.2 (tight, bold impact)
- Body: 1.6-1.8 (comfortable reading)

### C. Layout System

**Spacing Primitives (CSS Variables):**
- `--space-xs`: 0.5rem (8px)
- `--space-sm`: 1rem (16px)
- `--space-md`: 2rem (32px)
- `--space-lg`: 4rem (64px)
- `--space-xl`: 6rem (96px)
- `--space-2xl`: 8rem (128px)

**Grid Structure:**
- Max content width: 1280px
- Inner content: 1140px
- Mobile padding: var(--space-md)
- Desktop padding: var(--space-lg)

**Layout Approach:**
- Generous vertical spacing between sections (--space-2xl desktop, --space-xl mobile)
- Asymmetric grid elements for visual interest
- Single column mobile, strategic multi-column desktop

### D. Component Library

**Header:**
- Sticky navigation with backdrop blur effect
- Logo/site name on left, navigation links on right
- Mobile: Hamburger menu with smooth slide-in animation
- Height: 80px, transparent background with subtle border-bottom

**Hero Section:**
- Full viewport height (100svh) with centered content
- Large hero image with subtle parallax effect (optional)
- Bold headline + subheading + CTA button arrangement
- Asymmetric layout: Text left-aligned with offset CTA

**Buttons:**
- Border radius: 12px (soft, rounded edges)
- Padding: 16px 32px
- Primary: Mocha Mousse background, cream text
- Secondary: Outline style with 2px border
- Hover: Subtle scale (1.02) + slight shadow
- Focus: 3px outline with offset

**Cards/Sections:**
- Border radius: 16px for featured cards
- Shadow: Subtle `0 4px 20px rgba(0,0,0,0.08)` on hover
- Spacing: --space-lg internal padding

**Footer:**
- Background: Slightly darker than page (light mode), lighter (dark mode)
- Multi-column layout (desktop): Logo + Links + Newsletter + Social
- Single column mobile with centered alignment
- Padding: --space-xl vertical

### E. Imagery & Visual Elements

**Hero Image:**
- Large, full-width hero image with subtle gradient overlay
- Aspect ratio: 16:9 on mobile, 21:9 on desktop
- Position: Center-aligned, object-fit cover
- Overlay gradient: Mocha Mousse to transparent (subtle)

**Supporting Images:**
- Rounded corners (12px) for consistency
- Aspect ratio properties for responsive sizing
- Alt text required for all images
- Lazy loading for performance

**Decorative Elements:**
- Organic shapes in background (SVG blobs in Mocha tones)
- Subtle texture overlay on sections (5% opacity noise)

### F. Interactions & Motion

**Transition Philosophy:** Smooth and subtle (2025 trend away from excessive animation)

**Standards:**
- Default transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Hover states: Subtle scale, color shift, or shadow
- Focus states: Clear 3px outline with accent color
- Scroll behavior: Smooth for anchor links
- Mobile menu: 0.4s slide-in with backdrop fade

**Accessibility:**
- `prefers-reduced-motion` media query support
- High contrast ratios (4.5:1 minimum for text)
- Focus indicators never removed
- Keyboard navigation fully supported

### G. Dark Mode Implementation

**Strategy:**
- Use `prefers-color-scheme` media query
- CSS variables switch automatically
- Maintain visual hierarchy in both modes
- Metallic accents (slight shine) in dark mode for 2025 trend
- Ensure all interactive elements have proper contrast in both modes

---

**Design Personality:** Warm, grounded, and forward-thinking. The design should feel like a breath of fresh air—spacious yet purposeful, modern yet timeless. Every element earns its place through function and aesthetic value. The 2025 earthy palette creates an inviting atmosphere while the generous whitespace and bold typography command attention without overwhelming.