## Why

The current blog uses the Mundana Jekyll theme with outdated styling — Bootstrap 4.2, serif-heavy typography (Georgia/Lora), and a dated card layout. The visual design feels generic and doesn't reflect a modern developer blog. The CSS is a monolithic 927-line file with tightly coupled styles, making customization difficult. A full theme redesign will modernize the visual identity, improve readability, and create a distinctive, professional look.

## What Changes

- Replace the current serif-heavy typography with a modern system font stack for UI and a clean sans-serif (Inter) for body text, with proper monospace fonts for code
- Introduce a new color system using CSS custom properties — a refined neutral palette with a distinctive accent color, supporting both light appearance and potential future dark mode
- Redesign the homepage layout: replace the current featured/sticky/all-stories three-section layout with a cleaner, more scannable post list
- Modernize post cards with better whitespace, subtle hover effects, and improved tag presentation
- Redesign the post reading page with optimized content width (max ~720px), improved heading hierarchy, and better code block styling
- Overhaul the navigation bar with a simpler, cleaner design
- Improve the tag cloud page with a more structured, filterable layout
- Upgrade responsive design with modern CSS (custom properties, flexbox, grid) and reduce Bootstrap dependency
- Redesign the footer with cleaner layout and proper spacing
- Improve code syntax highlighting theme for better readability

## Capabilities

### New Capabilities

- `theme-foundation`: CSS custom properties system, color palette, typography scale, spacing system, and base reset styles
- `layout-navigation`: Redesigned navigation bar, header, and footer components
- `layout-homepage`: New homepage layout with modern post listing and pagination
- `layout-post`: Redesigned article reading experience — content width, typography, code blocks, metadata display, author bio, and comments section
- `layout-pages`: Restyled tag cloud, about, and generic page layouts
- `component-post-card`: Modernized post card component used across homepage and archive pages

### Modified Capabilities

(none — this is a fresh theme overhaul with no existing specs)

## Impact

- Affected code:
  - `assets/css/main.css` — full rewrite of all styles
  - `_layouts/default.html` — updated markup structure, CSS/font references
  - `_layouts/post.html` — updated article markup and component structure
  - `_layouts/page.html` — updated page layout markup
  - `_layouts/page-sidebar.html` — updated sidebar layout
  - `_includes/main-loop-card.html` — redesigned post card component
  - `_includes/menu-header.html` — redesigned navigation menu
  - `_includes/sidebar.html` — updated sidebar styling
  - `index.html` — restructured homepage layout
  - `_pages/tags.html` — redesigned tag cloud
  - `_pages/posts.html` — updated all-posts page
  - `assets/js/theme.js` — updated scroll/interaction behavior
