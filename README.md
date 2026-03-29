# The TGM Group LLC — Hiring Portal

E-signature hiring portal for The TGM Group LLC employee onboarding.

## Structure

```
docs/           Original .docx files (Offer Letter, Employment Agreement, Pre-Hire Checklist)
web/            Web-based signing portal (GitHub Pages)
  index.html    Landing page with document links and status
  sign.html     Document viewer + signature capture
  css/          Styles
  js/           App logic + document templates
```

## How It Works

1. Employee opens the portal and selects a document to sign
2. Reviews the full document content
3. Draws their signature on the signature pad
4. Clicks "Sign & Submit" to generate a signed PDF
5. PDF is saved directly to the TGM Google Drive (in a "TGM Signed Documents" folder)

## Setup Google Drive (Required for auto-save)

To auto-save signed PDFs to Google Drive:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project (or use existing)
3. Enable the **Google Drive API** (APIs & Services > Library)
4. Create **OAuth 2.0 credentials** (APIs & Services > Credentials > Create > OAuth client ID)
   - Application type: **Web application**
   - Authorized JavaScript origins: add your GitHub Pages URL (e.g. `https://nwdmm5x589-byte.github.io`) and `http://localhost:8090` for testing
5. Copy the **Client ID** into `web/js/app.js` at the top (`GOOGLE_CONFIG.clientId`)

When Trinity signs a document, she'll be prompted to sign into the TGM Google account. The signed PDF is then automatically uploaded to a "TGM Signed Documents" folder in Drive.

Without Google Drive configured, signed PDFs are downloaded locally for manual upload.

## Deploy on GitHub Pages

1. Go to repo Settings > Pages
2. Set source to `main` branch, folder `/web`
3. The portal will be live at `https://<username>.github.io/tgm-hiring/`
