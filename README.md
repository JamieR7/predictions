# IB SEHS Predictor - Multi-User Platform

A collaborative exam prediction platform for IB SEHS students.

## 🌟 Features

- **Submit Predictions**: Students can create and save exam predictions
- **View Gallery**: Browse predictions from peers (emails hidden)
- **Auto-Save**: Progress automatically saved every 2 minutes
- **Google Sign-In**: Secure authentication with school Google accounts
- **Privacy First**: Email addresses never shown publicly

## 📁 File Structure

```
predictions/
├── landing.html          # Landing page with two options
├── predict.html          # Prediction submission form
├── gallery.html          # Public predictions gallery
├── config.js             # Configuration (API URLs, settings)
├── backend-script.js     # Google Apps Script backend code
├── BACKEND_SETUP.md      # Step-by-step setup guide
└── README.md             # This file
```

## 🚀 Quick Start

### For Students

1. Open `landing.html` in your browser
2. Choose:
   - **Submit My Predictions** → Sign in and create predictions
   - **View Student Predictions** → Browse peer submissions

### For Administrator (Jamie)

1. Follow instructions in `BACKEND_SETUP.md` to set up Google Sheets backend
2. Configure `config.js` with your API URLs
3. Deploy the site to your web server or GitHub Pages

## 🔧 Backend Setup Status

- [x] Landing page created
- [x] Gallery placeholder created
- [x] Backend script written
- [ ] **TODO**: Set up Google Sheet
- [ ] **TODO**: Deploy Apps Script
- [ ] **TODO**: Configure OAuth
- [ ] **TODO**: Update config.js with credentials

## 📊 How It Works

1. Student visits landing page
2. Chooses to submit predictions → Google Sign-in required
3. Fills out prediction form (auto-saves progress)
4. Submits final predictions
5. Data saved to Google Sheets (your account)
6. Other students can view in gallery (anonymous)

## 🔒 Privacy & Security

- Student emails stored securely (never public)
- Only usernames visible in gallery
- Profanity filter on usernames
- Optional: Restrict to @cdl.ch domain

## 📝 Next Steps

See `BACKEND_SETUP.md` for detailed setup instructions.

## 💡 Questions?

Contact Jamie Robertson (jamie.robertson@cdl.ch)
