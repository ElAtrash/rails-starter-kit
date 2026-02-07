# Google OAuth Setup Guide

Follow these steps for each new project created from this starter kit.

## 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Name it after your application (e.g., "MyApp Production")
4. Click "Create"

## 2. Enable Google+ API

1. In your new project, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## 3. Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" (unless you have a Google Workspace)
3. Fill in required fields:
   - **App name**: Your application name
   - **User support email**: Your support email
   - **Developer contact**: Your email
4. Add scopes: `./auth/userinfo.email` and `./auth/userinfo.profile`
5. Add test users (for development/testing phase)
6. Click "Save and Continue"

## 4. Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - Development: `http://localhost:3000/auth/google_oauth2/callback`
   - Production: `https://yourdomain.com/auth/google_oauth2/callback`
5. Click "Create"
6. Copy your Client ID and Client Secret

## 5. Add to Your Environment Variables

### Development (.env)

```bash
GOOGLE_CLIENT_ID=your_dev_client_id
GOOGLE_CLIENT_SECRET=your_dev_client_secret
```

### Production

Set these in your hosting platform (Heroku, Render, etc.)

## 6. Update Redirect URIs When Deploying

Remember to add your production URL to authorized redirect URIs in Google Cloud Console when you deploy!

## Notes

- **Never commit** `.env` to git
- Create separate credentials for staging/production if needed
- You can have multiple redirect URIs for the same credentials
