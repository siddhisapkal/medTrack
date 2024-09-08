const { google } = require('googleapis');
const path = require('path');

// Path to your service account key file
const keyFilePath = path.join('C:', 'Users', 'siddh', 'Downloads', 'skilled-sunrise-434318-a0-4c672516263b.json');

// Create an instance of GoogleAuth
const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function accessSheet() {
    try {
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });
        const spreadsheetId = '1wW9dNfOCJSpoSrq1YWp4O-tUNBxc-Z1aMSDxTELKC9U'; // Replace with your Google Sheets ID

        // Example range to read
        const range = 'Sheet1!A1:B2'; // Replace with your desired range

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        console.log('Data from sheet:', response.data.values);
    } catch (error) {
        console.error('Error accessing Google Sheets:', error);
    }
}

accessSheet();



