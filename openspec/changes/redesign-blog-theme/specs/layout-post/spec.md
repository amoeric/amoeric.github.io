## ADDED Requirements

### Requirement: Article content width

The article body text SHALL be constrained to a maximum width of approximately 680px (38-42em), centered on the page. This ensures optimal reading line length of 50-75 characters.

#### Scenario: Content centering

- **WHEN** an article is displayed on desktop
- **THEN** the text content SHALL be centered horizontally with equal margins

#### Scenario: Wide elements

- **WHEN** an image or code block is rendered within the article
- **THEN** it SHALL be allowed to extend beyond the text content width up to approximately 900px

### Requirement: Article header

The article header SHALL display the post title, publication date, author name, reading time, and tags. The title SHALL use a large heading size from the typography scale. Metadata (date, read time, author) SHALL use muted secondary text color.

#### Scenario: Header layout

- **WHEN** an article page is loaded
- **THEN** the title SHALL appear prominently, followed by metadata on a separate line, and the cover image (if present) below

#### Scenario: Cover image display

- **WHEN** the post has a cover image defined in front matter
- **THEN** the image SHALL be displayed with `object-fit: cover` and a constrained max-height

#### Scenario: No cover image

- **WHEN** the post has no cover image
- **THEN** the header SHALL display without an image gap

### Requirement: Code block styling

Code blocks (`<pre><code>`) SHALL have a distinct background color (darker surface), rounded corners, horizontal scrolling for long lines, and use the monospace font token. Inline code SHALL have a subtle background to distinguish it from surrounding text.

#### Scenario: Block code appearance

- **WHEN** a fenced code block is rendered
- **THEN** it SHALL have a dark or contrasting background, padding, rounded corners, and `overflow-x: auto`

#### Scenario: Inline code appearance

- **WHEN** inline code is rendered
- **THEN** it SHALL have a subtle background color, slight padding, and rounded corners

### Requirement: Article typography

Within the article body, headings (h2-h4) SHALL have clear visual hierarchy with appropriate spacing. Paragraphs SHALL have comfortable spacing between them. Blockquotes SHALL be visually distinct with a left border accent and slightly muted text.

#### Scenario: Heading hierarchy

- **WHEN** h2, h3, and h4 headings are rendered in the article
- **THEN** each level SHALL be visually smaller than the previous, with top margin for separation

#### Scenario: Blockquote styling

- **WHEN** a blockquote is rendered
- **THEN** it SHALL have a left border using the accent color and italic or muted text styling

### Requirement: Post navigation

At the bottom of each article, previous and next post links SHALL be displayed. The navigation SHALL show the titles of adjacent posts.

#### Scenario: Both neighbors exist

- **WHEN** the post has both a previous and next post
- **THEN** both links SHALL be displayed, previous on the left and next on the right

#### Scenario: First or last post

- **WHEN** the post is the first or last in the collection
- **THEN** only the available neighbor link SHALL be displayed

### Requirement: Comments section

The Giscus comments section SHALL be styled to integrate with the theme. It SHALL appear below the article content with clear visual separation.

#### Scenario: Comments rendering

- **WHEN** the article has comments enabled
- **THEN** the Giscus widget SHALL render below the article with consistent spacing

### Requirement: Author bio section

An author bio section SHALL appear after the article content, showing the author's avatar, name, and bio text. It SHALL be visually contained (card-like or bordered).

#### Scenario: Author display

- **WHEN** the article page is rendered
- **THEN** the author bio section SHALL display the author's avatar image, name, and biography text
