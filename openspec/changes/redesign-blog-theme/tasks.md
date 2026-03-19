## 1. Theme Foundation

- [x] 1.1 Implement CSS custom properties design token system — define all color, typography, and spacing tokens on `:root` in `assets/css/main.css` (use CSS custom properties for the design token system)
- [x] 1.2 Implement color palette — adopt a neutral + accent color palette with warm grays and muted indigo/blue-violet accent, ensuring WCAG AA contrast
- [x] 1.3 Implement typography system — use system font stack for UI, Inter for body text, and monospace font for code; add Google Fonts link to `_layouts/default.html`
- [x] 1.4 Implement base reset and global styles — set `box-sizing: border-box` globally, apply base font and color from custom properties

## 2. Layout Infrastructure

- [x] 2.1 Keep Bootstrap grid for basic layout, remove component CSS — strip Bootstrap card, button, alert, and navbar component styles while retaining the grid system
- [x] 2.2 Implement navigation bar design — redesign `_includes/menu-header.html` and `_layouts/default.html` with fixed navbar, clean minimal appearance, mobile hamburger menu
- [x] 2.3 Implement search integration — restyle the Lunr.js search modal and trigger to match the new theme
- [x] 2.4 Implement footer design — redesign footer in `_layouts/default.html` with clean layout, muted text, and sticky footer behavior

## 3. Homepage

- [x] 3.1 Simplify homepage to single-column post list — restructure `index.html` to remove featured/sticky sections, implement homepage layout structure with centered content (~800-900px max-width)
- [x] 3.2 Implement homepage post listing — render posts in reverse chronological order using the post card component
- [x] 3.3 Implement pagination styling — style pagination controls with accent color and current page indicator

## 4. Post Card Component

- [x] 4.1 Implement post card structure — redesign `_includes/main-loop-card.html` with title, date, tags, and optional thumbnail
- [x] 4.2 Implement post card interaction — add hover effects and make entire card clickable
- [x] 4.3 Implement post card responsive behavior — side-by-side layout on desktop, stacked on mobile
- [x] 4.4 Implement tag display in cards — style tags as small rounded labels with subtle background, linking to tags page

## 5. Article Page

- [x] 5.1 Constrain article content width to ~680px — update `_layouts/post.html` to center content with wider breakout for images and code blocks (~900px)
- [x] 5.2 Implement article header — redesign post header with prominent title, muted metadata (date, read time, author), and cover image display
- [x] 5.3 Implement article typography — style h2-h4 hierarchy, paragraph spacing, and blockquote styling with accent left border
- [x] 5.4 Implement code block styling — style `pre code` with contrasting background, rounded corners, horizontal scroll, and inline code with subtle background
- [x] 5.5 Implement post navigation — style previous/next post links at article bottom
- [x] 5.6 Implement author bio section — style the author card with avatar, name, and bio text
- [x] 5.7 Implement comments section — ensure Giscus widget is styled consistently with the theme

## 6. Other Pages

- [x] 6.1 Implement tag cloud page — redesign `_pages/tags.html` with sized tags and post filtering
- [x] 6.2 Implement all posts page — redesign `_pages/posts.html` with year-grouped chronological list
- [x] 6.3 Implement generic page layout — update `_layouts/page.html` with centered content matching article width
- [x] 6.4 Implement about page — update `_layouts/page-sidebar.html` and `_pages/about.md` with redesigned sidebar layout

## 7. Post Page Polish (from visual review)

- [x] 7.1 Fix post navigation styling — improve prev/next links layout so long titles don't truncate awkwardly, ensure proper spacing and alignment between the two links
- [x] 7.2 Fix comments section integration — improve Giscus widget spacing, add visual separation from article content, ensure the "用 GitHub 登入" button and input area blend with the theme
- [x] 7.3 Fix post page bottom spacing — ensure consistent spacing between article tags, share section, author bio, comments, and post navigation
