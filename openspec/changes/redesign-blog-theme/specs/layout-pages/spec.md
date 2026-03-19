## ADDED Requirements

### Requirement: Tag cloud page

The tags page SHALL display all tags with their post counts. Tags SHALL be presented as clickable elements that filter or link to posts with that tag. The tag size or weight SHALL vary based on post count to indicate relative frequency.

#### Scenario: Tag display

- **WHEN** the tags page is loaded
- **THEN** all tags SHALL be displayed with their associated post count

#### Scenario: Tag filtering

- **WHEN** a user clicks on a tag
- **THEN** the page SHALL show a filtered list of posts with that tag

#### Scenario: Visual weight

- **WHEN** tags are rendered
- **THEN** tags with more posts SHALL appear visually larger or bolder than tags with fewer posts

### Requirement: All posts page

The all-posts page SHALL display every post in a chronological list grouped by year. Each entry SHALL show the post title, date, and tags.

#### Scenario: Year grouping

- **WHEN** the all-posts page is loaded
- **THEN** posts SHALL be grouped under year headings in reverse chronological order

#### Scenario: Post entry

- **WHEN** a post entry is rendered in the list
- **THEN** it SHALL show the post title as a link, the publication date, and associated tags

### Requirement: Generic page layout

Pages using the `page` layout SHALL display a centered content area with the page title and body content. The content width SHALL match the article content width for consistency.

#### Scenario: Page rendering

- **WHEN** a page is loaded
- **THEN** the page title SHALL appear as a heading, followed by the page content in a centered container

### Requirement: About page

The about page SHALL use the page-sidebar layout with the author's information in the sidebar and the about content in the main area.

#### Scenario: About page layout

- **WHEN** the about page is loaded
- **THEN** the main content area SHALL display the about text, and the sidebar SHALL display author information
