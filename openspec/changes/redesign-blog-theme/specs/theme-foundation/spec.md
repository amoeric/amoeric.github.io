## ADDED Requirements

### Requirement: CSS custom properties design token system

The theme SHALL define all visual tokens as CSS custom properties on `:root`. The token system SHALL include color tokens (accent, text, background, surface, border), typography tokens (font families, sizes, weights, line heights), and spacing tokens (a consistent spacing scale). All component styles SHALL reference these tokens instead of hardcoded values.

#### Scenario: Color tokens are defined

- **WHEN** the CSS file is loaded
- **THEN** `:root` SHALL define at minimum: `--color-accent`, `--color-text`, `--color-text-secondary`, `--color-bg`, `--color-surface`, `--color-border`

#### Scenario: Typography tokens are defined

- **WHEN** the CSS file is loaded
- **THEN** `:root` SHALL define at minimum: `--font-body`, `--font-ui`, `--font-mono`, `--font-size-base`, `--font-size-sm`, `--font-size-lg`, `--font-size-xl`, `--line-height-body`, `--line-height-heading`

#### Scenario: Spacing tokens are defined

- **WHEN** the CSS file is loaded
- **THEN** `:root` SHALL define a spacing scale: `--space-1` through `--space-8` with consistent increments

### Requirement: Color palette

The theme SHALL use a warm-gray neutral palette with a muted indigo/blue-violet accent color. Background colors SHALL be off-white (not pure #fff). Text colors SHALL be warm dark gray (not pure #000). The accent color SHALL be used for links, interactive elements, and visual highlights.

#### Scenario: Accent color usage

- **WHEN** a link or interactive element is rendered
- **THEN** it SHALL use `var(--color-accent)` for its color

#### Scenario: Text contrast

- **WHEN** body text is rendered against the background
- **THEN** the contrast ratio SHALL meet WCAG AA standards (minimum 4.5:1)

### Requirement: Typography system

The theme SHALL use a system font stack for UI elements (navigation, buttons, metadata), Inter (loaded from Google Fonts with `font-display: swap`) for body text, and a monospace font (JetBrains Mono or Fira Code) for code elements. The base font size SHALL be between 16px and 18px with a line height between 1.6 and 1.8 for body text.

#### Scenario: Font loading

- **WHEN** the page loads
- **THEN** text SHALL be immediately visible using the system font stack, and Inter SHALL load asynchronously without blocking render

#### Scenario: Code font

- **WHEN** a `<code>` or `<pre>` element is rendered
- **THEN** it SHALL use `var(--font-mono)` which maps to a monospace font

### Requirement: Base reset and global styles

The theme SHALL include a CSS reset that normalizes default browser styles. The reset SHALL set `box-sizing: border-box` globally, remove default margins on body, and establish the base font and color from custom properties.

#### Scenario: Box sizing

- **WHEN** any element is rendered
- **THEN** it SHALL use `box-sizing: border-box`

#### Scenario: Base typography applied

- **WHEN** the body element is rendered
- **THEN** it SHALL use `var(--font-body)` for font-family, `var(--font-size-base)` for font-size, and `var(--color-text)` for color
