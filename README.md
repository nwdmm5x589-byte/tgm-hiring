# TGM Group LLC — Hiring Portal

E-signature hiring portal for TGM Group LLC employee onboarding.

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
5. PDF is either emailed to tgmwashers@thetgmgroup.com (if EmailJS configured) or downloaded

## Setup Email Sending (Optional)

To auto-email signed PDFs to TGM Gmail:

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add Gmail (tgmwashers@thetgmgroup.com) as an Email Service
3. Create a template with variables: `{{to_email}}`, `{{from_name}}`, `{{document_name}}`, `{{sign_date}}`
4. Copy your **Public Key**, **Service ID**, and **Template ID** into `web/js/app.js` at the top

Without EmailJS configured, signed PDFs are downloaded locally for manual emailing.

## Deploy on GitHub Pages

1. Go to repo Settings > Pages
2. Set source to `main` branch, folder `/web`
3. The portal will be live at `https://<username>.github.io/tgm-hiring/`
