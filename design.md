This is a comprehensive design and build specification for a high-end, editorial-style consultancy website. Recreate this interface with a focus on precision typography, structured grid layouts, and sophisticated motion.

### 1. Design Identity
The aesthetic is **"Modern Pan-African Professionalism."** It combines a clean, high-contrast editorial layout with a palette of deep charcoal, vibrant red, and forest green. The design uses bold, high-impact typography and large-scale photography to communicate authority, impact, and indigenous expertise.

### 2. Colour Palette
- **Background Primary:** `#FFFFFF` (Pure White)
- **Background Secondary:** `#1A1A1A` (Deep Charcoal/Near Black)
- **Accent Primary:** `#E31E24` (Vibrant Red) — used for CTAs, icons, and emphasis.
- **Accent Secondary:** `#006838` (Forest Green) — used for high-impact content blocks.
- **Text Primary:** `#1A1A1A` (on light) / `#FFFFFF` (on dark)
- **Text Muted:** `#666666` (on light) / `#A1A1A1` (on dark)
- **Border/Divider:** `#E5E5E5` (Subtle grey)

### 3. Typography Forensics
- **Primary Display & Headings:** **Inter** or **Public Sans**. 
    - *Evidence:* Geometric sans-serif, high x-height, tight apertures, neutral but authoritative.
    - *Styles:* 
        - **H1 (Hero):** 72px/1.1 leading, ExtraBold (800).
        - **H2 (Section):** 48px/1.2 leading, Bold (700).
        - **H3 (Card):** 24px/1.3 leading, SemiBold (600).
- **Body Text:** **Inter**. 
    - *Styles:* 18px/1.6 leading, Regular (400).
- **Editorial Accents:** Use a high-contrast Serif like **Playfair Display** or **Cormorant Garamond** for specific italicized emphasis (e.g., the word "Indigenous" in the hero).
- **Labels/Buttons:** Inter, 14px, Bold (700), All-caps or Title Case with +0.05em tracking.

### 4. Visual Asset Manifest
1. `hero-meeting.avif`: High-resolution photo of a professional collaborative setting in an African context. Warm lighting, shallow depth of field. (Generate: "Professional African business meeting, modern office, warm natural light, high-end photography, 16:9")
2. `impact-portrait.avif`: Portrait of a smiling woman in vibrant traditional-modern attire. (Generate: "Portrait of a smiling African woman, professional yet warm, soft bokeh background, 4:5 aspect ratio")
3. `collaboration-group.avif`: Wide shot of a diverse team working around a table with maps/documents. (Generate: "Group of African professionals collaborating over documents and maps, top-down perspective, high detail, 16:9")
4. `icon-set-red.svg`: Custom line-art icons (Scale, People, Book, Globe) in `#E31E24`.
5. `news-thumbnails/*.avif`: Editorial-style photography for blog posts.

### 5. Section-by-Section Breakdown

#### Header (Sticky)
- **Layout:** Flexbox, `justify-between`, `h-20`, white background.
- **Elements:** 
    - Left: Logo (South Consulting Africa Limited).
    - Center: Nav links (Home, About Us, Services, Projects, Resources, Careers) in 14px SemiBold.
    - Right: "Contact Us" CTA — Red background, white text, pill-shaped or slightly rounded (8px).
- **Behavior:** Sticky with a subtle `shadow-sm` appearing after 50px scroll.

#### Hero Section
- **Layout:** Full-bleed, `min-h-[90vh]`, relative positioning.
- **Background:** `hero-meeting.avif` with a 40% black overlay.
- **Content:** 
    - Large H1: "World-Class. *Indigenous.* Impact-Driven." 
    - *Detail:* "Indigenous" is italicized serif and has a thick red underline.
    - Paragraph: Max-width 600px, white text, 20px.
    - CTA: "Read about us" button with a right-arrow icon.
- **Newsletter Overlay (Bottom Right):** A floating card or integrated form with "First Name", "Email" inputs and a "Subscribe" button.

#### Services Quick-Links (Bento-style Grid)
- **Layout:** 3-column grid, white background.
- **Cards:** "Services", "Insights", "Projects".
- **Styling:** Each card has a title, short description, and a "Find out more" link with a red circular arrow icon.
- **Highlight:** The "Projects" card uses the Forest Green (`#006838`) background with white text to stand out.

#### Impact Stats Section
- **Layout:** 2-column split. 
- **Left:** Vertical stack of stats (e.g., "66+ Impact in Action", "28+ Partners in Progress"). Large red numbers, muted grey labels.
- **Right:** `impact-portrait.avif` with a slight parallax effect.

#### Mission Statement (Green Block)
- **Layout:** Full-width, Forest Green background.
- **Content:** Large white H2: "African-Led Solutions for Systemic Change".
- **Grid:** 2x2 grid of text blocks below the heading, detailing focus areas (Human Rights, Gender Equality, etc.). Each block has a white H3 and white body text.

#### Expertise Grid (Icon Cards)
- **Layout:** "From Policy Research to Program Delivery" heading. 3-column grid of cards.
- **Card Design:** White background, subtle border. Top-left: Red line icon. Center: H3 Title. Bottom: "Explore" link.
- **Hover:** Card lifts 8px, border changes to red.

#### News & Insights
- **Layout:** Horizontal row of 4 cards.
- **Card Design:** Image at top, date badge (red background), H3 title, "Read more" link.
- **Header:** "Our Latest News" on left, "Read All News" button on right.

#### Footer
- **Layout:** Deep charcoal background, 4-column layout.
- **Columns:** Contact Info (with red icons), News & Insights, Get Involved, Resources, Social Media (circular icons).
- **Bottom Bar:** Copyright and legal links, separated by dividers.

### 6. Animations and Interactions
- **Scroll Driver:** Implement **Lenis** for smooth inertial scrolling.
- **Entrance Reveals:** Use GSAP `ScrollTrigger` to reveal sections. 
    - *Pattern:* `y: 40, opacity: 0` to `y: 0, opacity: 1` with `power2.out`, duration 0.8s.
- **Staggered Text:** Use GSAP `SplitText` to reveal the Hero H1 line-by-line.
- **Hover Effects:** 
    - Buttons: Scale 1.02, background color shift.
    - Links: The circular arrow icon should rotate 45 degrees or slide 5px to the right.
- **Parallax:** Apply a subtle `yPercent: -10` to the large portrait images as they pass through the viewport.

### 7. Build Instruction
Build this as a React application using Tailwind CSS. Implement every section and produce the asset manifest before composing the page: generate the specified images when image generation is available, otherwise source them using the supplied queries. Do not use generic placeholders for prominent visuals. Match the visual design, spacing, colour palette, forensic typography specification, and motion as closely as possible. Use CSS transitions for simple state changes and GSAP with `@gsap/react` for coordinated timelines. Use ScrollTrigger for all scroll-triggered reveals and parallax. Implement the Lenis-plus-ScrollTrigger architecture for smooth scrolling: instantiate Lenis, drive it via the GSAP ticker, and ensure `ScrollTrigger.update()` is called on every scroll event. Scope animations to their components and clean up on unmount. Provide a `prefers-reduced-motion` fallback that disables the smooth scroll and simplifies transitions to basic opacities.