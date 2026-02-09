// Configuration for IB SEHS Predictor
// Replace these values with your actual credentials

const CONFIG = {
    // Google Apps Script Web App URL (from your deployed script)
    API_URL: 'YOUR_WEB_APP_URL_HERE',
    
    // Google OAuth Client ID (for authentication)
    GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID_HERE',
    
    // Optional: Restrict to specific email domain
    RESTRICT_DOMAIN: 'cdl.ch', // Set to null to allow any domain
    
    // App settings
    AUTO_SAVE_INTERVAL: 120000, // Auto-save every 2 minutes (in milliseconds)
    
    // Feature flags
    FEATURES: {
        enableAutoSave: true,
        enableProfanityFilter: true,
        requireDomainEmail: false, // Set to true to require @cdl.ch emails
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
