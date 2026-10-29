/**
 * ====================================================================
 * SAHANA & SAMEEP WEDDING — GOOGLE APPS SCRIPT RSVP BACKEND
 * ====================================================================
 * Free, reliable, serverless Google Sheets integration for RSVPs.
 *
 * HOW TO SET UP IN 2 MINUTES:
 * 1. Open Google Sheets (https://sheets.new) and title it:
 *    "Sahana & Sameep - Wedding RSVP Responses"
 * 2. In Google Sheets menu, click "Extensions" > "Apps Script".
 * 3. Delete any default code in Code.gs, paste this ENTIRE script, and click Save (💾).
 * 4. Click the blue "Deploy" button (top right) > "New deployment".
 * 5. Click the gear icon (⚙️) next to "Select type" and select "Web app".
 * 6. Set the configuration:
 *    - Description: "Sahana & Sameep RSVP Collector"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (CRUCIAL: Allows wedding guests to RSVP without Google sign-in)
 * 7. Click "Deploy", approve authorization permissions ("Advanced" > "Go to... (unsafe)").
 * 8. Copy the generated Web App URL:
 *    (It looks like: https://script.google.com/macros/s/AKfycb.../exec)
 * 9. Paste this URL in your website's .env file:
 *    VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
 * 10. Re-build or restart the website (`npm run dev` or `npm run build`). Done!
 */

function setupHeadersIfEmpty(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = ['Timestamp', 'Full Name', 'Attending?', 'Phone Number', 'Blessings & Wishes'];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#F4ECE1'); // Elegant Champagne Ivory
    headerRange.setFontColor('#352C28');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupHeadersIfEmpty(sheet);

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var timestamp = data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    var fullName = data.fullName || '';
    var attending = data.attending === 'yes' ? 'Attending with joy' : 'Regretfully Declining';
    var phone = data.phone || '—';
    var message = data.message || '—';

    // Append response row
    sheet.appendRow([
      timestamp,
      fullName,
      attending,
      phone,
      message
    ]);

    // Format new row styling
    var lastRow = sheet.getLastRow();
    var statusCell = sheet.getRange(lastRow, 3);
    if (data.attending === 'yes') {
      statusCell.setBackground('#E8F5E9'); // Soft Green
      statusCell.setFontColor('#1B5E20');
    } else {
      statusCell.setBackground('#FFEBEE'); // Soft Red
      statusCell.setFontColor('#B71C1C');
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'RSVP recorded successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'online',
      service: 'Sahana & Sameep Wedding RSVP Service',
      instructions: 'Send HTTP POST requests with { fullName, attending, phone, message }'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
