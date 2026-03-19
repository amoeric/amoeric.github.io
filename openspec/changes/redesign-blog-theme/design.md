## Context

The blog currently uses the Mundana Jekyll theme built on Bootstrap 4.2.1 with a 927-line monolithic CSS file. The styling relies on Google Fonts (Lora/Georgia), a teal-green (#03a87c) primary color, and traditional card-based layouts. The theme feels dated and generic — it doesn't convey the identity of a modern developer blog. The codebase is a standard Jekyll setup with 4 layouts, 9 includes, and Liquid templating.

The blog is deployed via GitHub Pages, so all changes must remain compatible with Jekyll's static site generation. No build tools beyond what GitHub Pages provides are available.

## Goals / Non-Goals

**Goals:**

- Create a modern, distinctive visual identity that feels like a professional developer blog
- Establish a CSS custom properties system for consistent theming and easy future customization
- Improve reading experience with optimized typography, content width, and code block styling
- Reduce reliance on Bootstrap — use modern CSS (grid, flexbox, custom properties) for layout
- Maintain all existing functionality (search, comments, tags, pagination, sharing)
- Keep the site performant — minimize external font requests, reduce CSS size

**Non-Goals:**

- Dark mode implementation (prepare the architecture for it via CSS custom properties, but don't implement the toggle)
- Migrating away from Jekyll or GitHub Pages
- Changing the content structure or adding new post metadata fields
- Rewriting JavaScript functionality beyond what's needed for the new layout
- Adding CSS preprocessors (Sass/SCSS) — keep it as plain CSS for GitHub Pages compatibility

## Decisions

### Use CSS Custom Properties for the Design Token System

Define all colors, typography, spacing, and sizing as CSS custom properties on `:root`. This replaces hardcoded values scattered throughout the CSS, making theme customization trivial.

**Rationale:** Custom properties are supported by all modern browsers, work without a build step, and naturally prepare the architecture for future dark mode (just override variables on a `.dark` class). The alternative — Sass variables — would require a build step that complicates the GitHub Pages deployment.

### Adopt a Neutral + Accent Color Palette

Replace the current teal-green (#03a87c) with a refined palette:
- **Neutral base**: Warm grays (not pure black/white) for text and backgrounds
- **Accent color**: A muted indigo/blue-violet for links, interactive elements, and highlights
- **Surface colors**: Subtle off-white backgrounds with light borders for cards and sections

**Rationale:** The current teal-green feels corporate. A blue-violet accent is distinctive for a developer blog while remaining professional. Warm grays improve readability over pure black-on-white.

### Use System Font Stack for UI, Inter for Body Text

- **UI elements** (nav, buttons, metadata): System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`)
- **Body text**: Inter (loaded from Google Fonts, single weight with variable font)
- **Code**: JetBrains Mono or Fira Code for monospaced content

**Rationale:** System fonts load instantly for UI. Inter is an excellent screen-reading font — its tall x-height and open letterforms improve readability for long-form technical content. Loading one variable font is more efficient than the current Lora + Georgia combination.

### Simplify Homepage to Single-Column Post List

Replace the current three-section homepage (featured hero + sticky posts + paginated list) with a clean single-column post list. Each post card shows: title, date, tags, and optional cover image as a subtle thumbnail.

**Rationale:** The current featured/sticky sections create visual complexity without much benefit for a personal blog with moderate post frequency. A unified list is easier to scan and maintain.

### Constrain Article Content Width to ~680px

Set article body text to a maximum width of approximately 680px (38-42em), centered on the page. Images and code blocks can break out to a wider width (~900px) for better use of space.

**Rationale:** Optimal reading line length is 50-75 characters. The current full-container width creates overly long lines that reduce readability.

### Keep Bootstrap Grid for Basic Layout, Remove Component CSS

Keep Bootstrap's grid system (container, row, col-*) for overall page structure but remove Bootstrap's component styles (cards, buttons, alerts, navbar). Replace them with custom lightweight styles.

**Rationale:** Rewriting the grid system is unnecessary churn — Bootstrap's grid works well and is familiar. But the component styles conflict with custom designs and add unused CSS weight. This is a pragmatic middle ground.

## Risks / Trade-offs

- **[Breaking cached styles]** → Users with cached CSS may see mixed old/new styles. Mitigation: This is a static site — GitHub Pages cache invalidation handles this automatically, and a full CSS rewrite means no partial conflicts.
- **[Font loading flash]** → Inter loading from Google Fonts may cause FOIT/FOUT. Mitigation: Use `font-display: swap` and the system font stack as fallback so text is always visible.
- **[Bootstrap removal scope]** → Removing Bootstrap components may break overlooked styles in post content. Mitigation: Keep Bootstrap's reboot/normalize and grid; test against existing posts with varied content (tables, blockquotes, lists).
- **[Responsive regressions]** → New responsive styles may break on devices not tested. Mitigation: Use mobile-first approach with only 2-3 breakpoints, test against common viewport sizes.
