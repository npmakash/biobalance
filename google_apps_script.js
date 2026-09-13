/**
 * BIOBALANCE - GOOGLE APPS SCRIPT WEB APP
 * 
 * Instructions to deploy:
 * 1. Open Google Slides Template: https://docs.google.com/presentation/d/1tI98DhLl4OUOyeFryFDnvOaSgSFP7yYLH878CpSwfZ0/edit
 * 2. Click Extensions -> Apps Script.
 * 3. Paste this code into Code.gs and click Save.
 * 4. Click Deploy -> New Deployment.
 * 5. Select type: "Web app".
 * 6. Set "Execute as": "Me".
 * 7. Set "Who has access": "Anyone".
 * 8. Click Deploy and copy the Web App URL!
 * 9. Paste the Web App URL into src/config.js (or in the website settings modal).
 */

function doPost(e) {
  try {
    var request = JSON.parse(e.postData.contents);
    var templateId = request.templateId || '1tI98DhLl4OUOyeFryFDnvOaSgSFP7yYLH878CpSwfZ0';
    var data = request.data || {};

    // 1. Duplicate Google Slides Template in Google Drive
    var templateFile = DriveApp.getFileById(templateId);
    var patientName = data.patient_name || 'Patient';
    var copyName = 'BioBalance_Diet_Plan_' + patientName.replace(/\s+/g, '_');
    var copyFile = templateFile.makeCopy(copyName);
    var copyId = copyFile.getId();

    // 2. Open copied presentation and replace all 24 placeholders
    var presentation = SlidesApp.openById(copyId);

    // List of exact 24 placeholders
    var keys = [
      'patient_name', 'age', 'height_and_weight', 'report_date',
      'primary_targets', 'caloric_alignment', 'hyderation_baseline', 'key_habit_focus',
      'breakfast', 'mid_morning', 'lunch', 'evening_snack', 'dinner',
      'protein_distribution', 'complex_carbohydrates', 'healthy_fats', 'dietry_fiber',
      'res_point_1', 'one_line_des_point_1',
      'res_point_2', 'one_line_des_point_2',
      'res_point_3', 'one_line_des_point_3',
      'res_point_4', 'one_line_des_point_4'
    ];

    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var val = data[k] || '';
      presentation.replaceAllText('{{' + k + '}}', val);
      presentation.replaceAllText('{' + k + '}', val); // also match {key} without double braces
    }

    presentation.saveAndClose();

    // 3. Convert updated presentation copy directly to PDF
    var pdfBlob = copyFile.getAs('application/pdf');
    var pdfBase64 = Utilities.base64Encode(pdfBlob.getBytes());

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      pdfBase64: pdfBase64,
      downloadUrl: 'https://docs.google.com/presentation/d/' + copyId + '/export/pdf',
      presentationUrl: 'https://docs.google.com/presentation/d/' + copyId + '/edit'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
