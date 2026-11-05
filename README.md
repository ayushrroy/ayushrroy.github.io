# Ayush Roy's academic portfolio

Public site: https://ayushrroy.github.io/

This is a buildless HTML, CSS, and JavaScript portfolio. The existing GitHub Pages configuration publishes `main`.

## Edit content

- `index.html`: profile, About, timeline, publication metadata and abstracts, and selected research projects.
- `assets/styles.css`: responsive layout and fixed navigation.
- `assets/main.js`: header measurement and active-section highlighting.
- `assets/ayush-roy-resume.pdf`: the publicly approved resume, opened directly in a new tab.
- `assets/images/ai-notebook-teaser.png`: supplied notebook figure, reused unchanged.
- `assets/images/elastic-pose-negotiation.png`: AI-assisted concept illustration, explicitly captioned as an illustration.

## Add videos later

Only the asynchronous sensemaking and link visualization manuscripts have demo-video placeholders. Replace the relevant `div.pf-video-placeholder` in `index.html` with a video embed or a native video element with a valid source. Do not point a player to a nonexistent file. Selected Research Projects intentionally has no media placeholders.

Example for an uploaded MP4:

```html
<video controls playsinline preload="metadata" style="width:100%;height:auto">
  <source src="assets/videos/my-demo.mp4" type="video/mp4">
  Your browser does not support this video.
</video>
```

Abstracts marked as drafts are for ongoing work. The profile photo and GitLab profile link still need replacement material. Do not invent a GitLab account URL.

## Preview

Run `python -m http.server 4174` from this directory, then open http://localhost:4174.

The page uses system fonts and has no third-party runtime dependencies.
