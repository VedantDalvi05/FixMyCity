# FixMyCity Design Guidelines

## Design Approach: Material Design Foundation

**Rationale:** FixMyCity is a utility-focused civic platform requiring high information density, clear data visualization, and efficient task completion. Material Design provides the perfect foundation with its emphasis on:
- Clear visual hierarchy for data-heavy interfaces
- Strong feedback systems for form submissions and status updates
- Comprehensive component patterns for tables, charts, and maps
- Excellent accessibility guidelines for public-facing civic tools

**Key Design Principles:**
1. **Clarity First**: Every element serves a functional purpose - no decorative fluff
2. **Trustworthy Design**: Government/civic aesthetic - professional, reliable, approachable
3. **Data Legibility**: Charts, maps, and tables must be instantly readable
4. **Mobile-Priority**: Citizens report on-the-go; mobile experience is paramount

---

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- **Teal Primary**: 174 100% 25% (main actions, headers, active states)
- **Teal Light**: 174 45% 85% (backgrounds, hover states)
- **Teal Dark**: 174 100% 20% (pressed states, emphasis)

**Secondary/Neutral:**
- **Slate Gray**: 210 13% 50% (secondary text, borders)
- **Slate Light**: 210 15% 95% (card backgrounds, dividers)
- **Background**: 210 20% 98% (page background)

**Status Colors:**
- **Success Green**: 142 71% 45% (resolved issues)
- **Warning Orange**: 38 92% 50% (in-progress)
- **Error Red**: 0 84% 60% (urgent/pending)
- **Info Blue**: 217 89% 61% (notifications)

**Category Map Colors:**
- Red (0 84% 60%) - Potholes
- Green (142 71% 45%) - Garbage  
- Yellow (48 100% 50%) - Streetlight
- Blue (217 89% 61%) - Drainage
- Purple (271 76% 53%) - Other

**Dark Mode:**
- Background: 210 15% 12%
- Surface: 210 15% 16%
- Text Primary: 210 10% 95%
- Borders: 210 10% 25%

### B. Typography

**Font Stack:** 'Inter', system-ui, -apple-system, sans-serif (clean, modern, excellent legibility)

**Scale:**
- Display (Hero/Dashboard Headers): text-4xl to text-6xl, font-bold
- H1 (Page Titles): text-3xl, font-semibold
- H2 (Section Headers): text-2xl, font-semibold
- H3 (Card Headers): text-xl, font-medium
- Body: text-base, font-normal
- Small/Meta: text-sm, font-normal
- Captions: text-xs, font-medium

**Line Heights:**
- Headlines: leading-tight (1.25)
- Body: leading-relaxed (1.625)
- Tables/Data: leading-normal (1.5)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16, 24**
- Micro spacing (gaps, padding): 2, 4
- Component spacing: 6, 8
- Section spacing: 12, 16, 24
- Desktop section padding: py-16 to py-24
- Mobile section padding: py-8 to py-12

**Grid System:**
- Container: max-w-7xl mx-auto px-4
- Cards/Content: max-w-6xl
- Forms: max-w-2xl
- Data tables: Full width with horizontal scroll on mobile

**Responsive Breakpoints:**
- Mobile: base (default)
- Tablet: md: (768px)
- Desktop: lg: (1024px)
- Wide: xl: (1280px)

### D. Component Library

**Navigation:**
- Top navbar: Sticky, backdrop-blur, shadow-sm
- Logo + primary nav links + user menu (desktop)
- Hamburger menu (mobile) with slide-out drawer
- Active state: teal underline/background

**Forms & Inputs:**
- Text inputs: Outlined style, rounded-lg borders, focus:ring-2
- File upload: Drag-drop zone with preview thumbnails
- Select dropdowns: Chevron indicator, smooth open animation
- Radio/Checkbox: Teal accent, clear labels
- Buttons: Solid primary (teal), outline secondary, ghost tertiary

**Cards:**
- Issue cards: White background, rounded-xl, shadow-md, hover:shadow-lg
- Stat cards: Gradient background (teal to teal-dark), white text
- Map info popup: White, rounded-lg, shadow-xl, arrow pointer

**Data Visualization:**
- Charts: Use Recharts with teal/gray palette, clean gridlines
- Pie chart: Category colors, percentage labels
- Bar chart: Rounded bars, consistent spacing
- Line chart: Smooth curves, area fill (subtle teal gradient)

**Tables:**
- Header: Slate gray background, semibold text, sticky on scroll
- Rows: Alternating subtle backgrounds, hover highlight
- Actions: Icon buttons (edit, view, delete) aligned right
- Pagination: Bottom-right, minimal style

**Map (Leaflet):**
- Markers: SVG pins with category colors, subtle drop shadow
- Popup: White card, rounded corners, close button top-right
- Cluster: Circle with count, teal background
- Controls: Top-right, minimalist style

**Modals:**
- Overlay: backdrop-blur + semi-transparent dark
- Content: White, rounded-2xl, max-w-3xl, centered
- Close: X button top-right, clear hover state

**Badges/Tags:**
- Status: Pill shape, colored background + text
- Category: Outlined style with dot indicator

### E. Animations

**Minimal, Purposeful Motion:**
- Page transitions: Fade (200ms)
- Card hover: Lift effect (transform + shadow, 150ms)
- Button press: Scale(0.98), 100ms
- Modal open: Fade + scale from center, 250ms
- Loading states: Skeleton shimmer (pulse effect)

**No Excessive Animations:** Avoid scroll-triggered animations, parallax effects, or decorative motion

---

## Page-Specific Guidelines

### Citizen: Report Issue Page
- Hero: Short banner with clear CTA "Report an Issue" - no large image
- Form layout: Single column, progressive disclosure
- Photo upload: Grid preview (1-3 images), drag-drop zone
- Location: Map embed below address input, auto-detect button
- Submit: Fixed bottom bar on mobile, prominent teal button

### Citizen: My Reports Dashboard  
- List view: Card grid (1 col mobile, 2 cols tablet, 3 cols desktop)
- Each card: Thumbnail, title, status badge, date, location snippet
- Filter: Top bar with category pills, status dropdown
- Empty state: Illustration + "No reports yet" message

### Public Map View
- Full-screen map with minimal UI overlay
- Legend: Bottom-left, collapsible on mobile
- Filters: Top-left floating card
- Info popup: Auto-center on click, close on map click

### Admin Dashboard
- **Header:** Key metrics in 4-column grid (total, pending, resolved, avg time)
- **Charts Section:** 2-column grid (pie + bar charts)
- **Trend Graph:** Full-width line chart below
- **Admin Map:** Half-screen height, integrated filter controls
- **Report Table:** Full-width, dense data, sortable columns, inline status update
- **High Information Density:** Maximize data visibility, minimal whitespace

### Login Page
- Split layout: Left side = civic imagery (city skyline/workers), right side = form
- Form: Centered, max-w-md, subtle shadow, rounded-xl
- Brand: Logo top-center, tagline below

---

## Accessibility & Polish

- Focus indicators: Teal ring, 2px offset
- Touch targets: Minimum 44px height
- Contrast: WCAG AA compliant (4.5:1 text, 3:1 UI)
- Error states: Red border + icon + descriptive text
- Loading states: Skeleton screens, not spinners
- Success feedback: Toast notifications (top-right), auto-dismiss

---

**Images:** No hero images needed. Use civic-related icons/illustrations for empty states and login page background (e.g., city skyline silhouette, utility workers, road maintenance imagery - use placeholder with clear descriptions).