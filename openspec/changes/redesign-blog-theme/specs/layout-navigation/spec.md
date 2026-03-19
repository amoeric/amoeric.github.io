## ADDED Requirements

### Requirement: Navigation bar design

The navigation bar SHALL be fixed at the top of the viewport. It SHALL display the site name/brand on the left and navigation links on the right. The navigation SHALL use the UI font stack (`var(--font-ui)`). The navbar SHALL have a clean, minimal appearance with a subtle bottom border or shadow to separate it from page content.

#### Scenario: Desktop navigation

- **WHEN** the viewport width is 768px or greater
- **THEN** the navigation SHALL display all links (Home, Tags, All Posts) horizontally

#### Scenario: Mobile navigation

- **WHEN** the viewport width is less than 768px
- **THEN** the navigation SHALL collapse into a hamburger menu or simplified layout

#### Scenario: Scroll behavior

- **WHEN** the user scrolls down the page
- **THEN** the navigation bar SHALL remain visible (fixed positioning)

### Requirement: Footer design

The footer SHALL appear at the bottom of every page. It SHALL display copyright information and be visually separated from the main content. The footer SHALL use minimal styling with muted text color (`var(--color-text-secondary)`).

#### Scenario: Footer content

- **WHEN** the footer is rendered
- **THEN** it SHALL display the copyright year and site name

#### Scenario: Footer positioning

- **WHEN** the page content is shorter than the viewport
- **THEN** the footer SHALL remain at the bottom of the viewport (sticky footer)

### Requirement: Search integration

The navigation SHALL include a search trigger (icon or button) that activates the existing Lunr.js search functionality. The search modal SHALL be styled consistently with the new theme.

#### Scenario: Search activation

- **WHEN** the user clicks the search icon in the navigation
- **THEN** the search modal SHALL appear with an input field styled using theme tokens
