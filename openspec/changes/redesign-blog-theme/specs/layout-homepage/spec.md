## ADDED Requirements

### Requirement: Homepage post listing

The homepage SHALL display posts in a single-column chronological list. Each post entry SHALL use the post card component. The list SHALL be paginated according to the Jekyll paginate setting (10 posts per page).

#### Scenario: Post order

- **WHEN** the homepage is loaded
- **THEN** posts SHALL be displayed in reverse chronological order (newest first)

#### Scenario: Pagination display

- **WHEN** there are more posts than the paginate limit
- **THEN** pagination controls SHALL appear at the bottom of the list with previous/next navigation

#### Scenario: Empty state

- **WHEN** there are no posts on the current page
- **THEN** the page SHALL display a message indicating no posts are available

### Requirement: Homepage layout structure

The homepage SHALL have a clean layout with the site header/introduction area at the top, followed by the post list. The content area SHALL be centered with a maximum width appropriate for readability (approximately 800-900px).

#### Scenario: Desktop layout

- **WHEN** the viewport width is 768px or greater
- **THEN** the post list SHALL be centered with comfortable margins on both sides

#### Scenario: Mobile layout

- **WHEN** the viewport width is less than 768px
- **THEN** the post list SHALL use full width with appropriate padding

### Requirement: Pagination styling

Pagination controls SHALL be styled consistently with the theme. The current page indicator SHALL be visually distinct from other page links. Previous/next buttons SHALL use the accent color.

#### Scenario: Current page indicator

- **WHEN** pagination is rendered
- **THEN** the current page number SHALL be visually highlighted (e.g., bold or accent-colored background)
