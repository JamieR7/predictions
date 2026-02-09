# IB SEHS Predictor - Backend Setup Guide

## Google Sheets Backend Configuration

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet named "SEHS Predictions Database"
3. Create the following columns in Sheet1:

| Timestamp | Email | Username | Unit Code | Level | Paper | Predicted Points | Question | Mark Scheme | Status |
|-----------|-------|----------|-----------|-------|-------|------------------|----------|-------------|--------|

### Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete the default code
3. Copy and paste the code from `backend-script.js` (to be created)
4. Deploy as web app:
   - Click **Deploy > New deployment**
   - Select type: **Web app**
   - Description: "SEHS Predictions API"
   - Execute as: **Me** (jamie.robertson@cdl.ch)
   - Who has access: **Anyone** (or "Anyone with Google account" for security)
   - Click **Deploy**
5. Copy the Web App URL (you'll need this for the frontend)

### Step 3: Configure Frontend

1. Open `config.js`
2. Replace `YOUR_WEB_APP_URL_HERE` with the URL from Step 2
3. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your OAuth client ID

### Step 4: Set Up Google OAuth (For Authentication)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable Google Identity services
4. Create OAuth 2.0 credentials:
   - Application type: **Web application**
   - Authorized JavaScript origins: Add your site URL
   - Authorized redirect URIs: Add your site URL + `/predict.html`
5. Copy the Client ID
6. Paste into `config.js`

## API Endpoints

Once deployed, your Apps Script will provide these endpoints:

- `POST /submit` - Save prediction
- `GET /get-my-predictions?email=xxx` - Get user's predictions
- `GET /get-public-predictions` - Get all predictions (emails hidden)
- `POST /update-prediction` - Update existing prediction

## Security Notes

- Student emails are NEVER exposed in public API
- All submissions are timestamped
- Username profanity filter applied server-side
- Consider restricting to @cdl.ch domain emails only

## Next Steps

After setup:
1. Test submission from `predict.html`
2. Verify data appears in Google Sheet
3. Test public gallery retrieval
4. Enable @cdl.ch domain restriction if desired
