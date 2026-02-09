// Google Apps Script code for SEHS Predictions Backend
// Deploy this as a Web App from Google Sheets > Extensions > Apps Script

// Main function to handle GET and POST requests
function doGet(e) {
    const action = e.parameter.action;

    if (action === 'get-public-predictions') {
        return getPublicPredictions();
    } else if (action === 'get-my-predictions') {
        return getMyPredictions(e.parameter.email);
    }

    return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
        .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const action = data.action;

        if (action === 'submit') {
            return submitPrediction(data);
        } else if (action === 'update') {
            return updatePrediction(data);
        }

        return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Submit a new prediction
function submitPrediction(data) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

    // Apply profanity filter to username
    const username = filterProfanity(data.username);

    // Prepare row data
    const row = [
        new Date(),              // Timestamp
        data.email,              // Email (private)
        username,                // Username (public)
        data.unitCode,           // Unit Code
        data.level,              // Level (SL/HL)
        data.paper,              // Paper (1A/2)
        data.predictedPoints,    // Predicted Points
        data.question,           // Question
        data.markScheme,         // Mark Scheme
        data.status || 'draft'   // Status
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Prediction saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
}

// Get user's own predictions (requires email)
function getMyPredictions(email) {
    if (!email) {
        return ContentService.createTextOutput(JSON.stringify({ error: 'Email required' }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const userPredictions = rows
        .filter(row => row[1] === email) // Filter by email (column index 1)
        .map(row => ({
            timestamp: row[0],
            unitCode: row[3],
            level: row[4],
            paper: row[5],
            predictedPoints: row[6],
            question: row[7],
            markScheme: row[8],
            status: row[9]
        }));

    return ContentService.createTextOutput(JSON.stringify({
        success: true,
        predictions: userPredictions
    })).setMimeType(ContentService.MimeType.JSON);
}

// Get all predictions for public viewing (emails hidden)
function getPublicPredictions() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const publicPredictions = rows
        .filter(row => row[9] === 'submitted') // Only show submitted predictions
        .map(row => ({
            timestamp: row[0],
            username: row[2],     // Username only, NO email
            unitCode: row[3],
            level: row[4],
            paper: row[5],
            predictedPoints: row[6],
            question: row[7],
            markScheme: row[8]
        }));

    return ContentService.createTextOutput(JSON.stringify({
        success: true,
        predictions: publicPredictions
    })).setMimeType(ContentService.MimeType.JSON);
}

// Update existing prediction
function updatePrediction(data) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    const allData = sheet.getDataRange().getValues();

    // Find the row to update (match by email, unitCode, level, paper)
    for (let i = 1; i < allData.length; i++) {
        if (allData[i][1] === data.email &&
            allData[i][3] === data.unitCode &&
            allData[i][4] === data.level &&
            allData[i][5] === data.paper) {

            // Update the row
            sheet.getRange(i + 1, 7).setValue(data.predictedPoints);
            sheet.getRange(i + 1, 8).setValue(data.question);
            sheet.getRange(i + 1, 9).setValue(data.markScheme);
            sheet.getRange(i + 1, 10).setValue(data.status || 'draft');

            return ContentService.createTextOutput(JSON.stringify({
                success: true,
                message: 'Prediction updated successfully'
            })).setMimeType(ContentService.MimeType.JSON);
        }
    }

    // If not found, create new entry
    return submitPrediction(data);
}

// Simple profanity filter
function filterProfanity(username) {
    const profanityList = ['badword1', 'badword2', 'badword3']; // Add actual words
    let filtered = username;

    profanityList.forEach(word => {
        const regex = new RegExp(word, 'gi');
        filtered = filtered.replace(regex, '***');
    });

    return filtered;
}
