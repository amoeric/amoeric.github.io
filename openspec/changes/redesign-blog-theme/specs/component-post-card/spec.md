## ADDED Requirements

### Requirement: Post card structure

The post card component SHALL display: the post title (as a link), publication date, tags (as small labeled elements), and an optional thumbnail image. The title SHALL be the most prominent element.

#### Scenario: Card with image

- **WHEN** the post has a cover image defined
- **THEN** the card SHALL display a thumbnail of the image alongside the text content

#### Scenario: Card without image

- **WHEN** the post has no cover image
- **THEN** the card SHALL display only the text content without an image placeholder

#### Scenario: Card content

- **WHEN** a post card is rendered
- **THEN** it SHALL show the post title, publication date, and tags in a consistent layout

### Requirement: Post card interaction

The post card SHALL have a subtle hover effect to indicate interactivity. The entire card area SHALL be clickable, linking to the full post.

#### Scenario: Hover state

- **WHEN** the user hovers over a post card
- **THEN** the card SHALL show a visual change (e.g., slight background shift, shadow, or title color change)

#### Scenario: Click navigation

- **WHEN** the user clicks anywhere on the post card
- **THEN** the browser SHALL navigate to the full post page

### Requirement: Post card responsive behavior

The post card SHALL adapt its layout based on viewport width. On wider viewports, the image and text SHALL be side by side. On narrow viewports, the card SHALL stack vertically.

#### Scenario: Desktop layout

- **WHEN** the viewport width is 768px or greater
- **THEN** the card SHALL display the thumbnail to the side of the text content

#### Scenario: Mobile layout

- **WHEN** the viewport width is less than 768px
- **THEN** the card SHALL stack the image above the text content

### Requirement: Tag display in cards

Tags within the post card SHALL be displayed as small, styled labels. Each tag SHALL link to the tags page filtered by that tag. Tags SHALL use a muted style that doesn't overpower the title.

#### Scenario: Tag styling

- **WHEN** tags are rendered in a post card
- **THEN** each tag SHALL appear as a small rounded label with subtle background color

#### Scenario: Tag link

- **WHEN** a user clicks a tag in a post card
- **THEN** the browser SHALL navigate to the tags page showing posts with that tag
