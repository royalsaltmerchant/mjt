# Majik Tea Band

## Building the Site

This site uses EJS templates to automatically generate session pages from data.

### Quick Start

```bash
npm install
npm run build
```

### How It Works

All sessions are defined in `sessions-data.json`. When you run `npm run build`, it automatically generates:

- Individual session pages (`/sessions/[session-slug]/`)
- Sessions list page (`/sessions/`) - grouped by year
- Home page (`/index.html`) - redirects to the most recent session

### Adding a New Session

1. Add session data to `sessions-data.json`:
```json
{
  "sessionName": "Your Session Name",
  "sessionSlug": "your_session_slug",
  "sessionImage": "your_image.webp",
  "audioUrl": "https://your-audio-url.mp3",
  "infoBlurb": "Description of your session",
  "hasDownload": true,
  "downloadUrl": "https://your-download-url.wav",
  "description": "Your Session Name by Majik Tea",
  "year": 2024
}
```

2. Add cover image to `assets/covers/`
3. Add favicon to `assets/favicons/`
4. Run `npm run build`

### File Structure

- `session-template.ejs` - Template for individual session pages
- `sessions-list-template.ejs` - Template for the sessions list page
- `home-template.ejs` - Template for the home page
- `sessions-data.json` - All session data
- `generate-session.js` - Build script