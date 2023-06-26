const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
const sheets = activeSheet.getSheets();

function main() {
  const labels = [];
  let githubUsername = '';
  let repositoryName = '';
  for (let sheetNo = 0; sheetNo < sheets.length; sheetNo++) {
    const sheet = sheets[sheetNo];

    if (sheet.getName() === 'config') {
      const label = sheet.getRange(configRows['label'], configValueColumn).getValue();
      labels.push(label);

      let repository = sheet.getRange(configRows['repository'], configValueColumn).getValue();
      repository = repository.replace("https://github.com/", "").split("/");
      githubUsername = repository[0];
      repositoryName = repository[1];

      continue;
    }

    function getColumnNo(columnKey) {
      let colNo = 1;
      let res = 99;
      while (true) {
        let columnName = sheet.getRange(headerRow, colNo).getValue();

        if (columnName.length === 0) break;

        if (columnName === columns[columnKey]) {
          res = colNo;
          break;
        }

        colNo++;
      }

      return res;
    }

    let rowNo = headerRow + 1;
    while (true) {
      const number = sheet.getRange(rowNo, getColumnNo('number')).getValue();
      const testCase = sheet.getRange(rowNo, getColumnNo('test_case')).getValue();

      if (number.length === 0 || testCase.length === 0) break;

      if (sheet.getRange(rowNo, getColumnNo('issue')).getValue().length > 0) {
        rowNo++;
        continue;
      }

      const ios = sheet.getRange(rowNo, getColumnNo('ios')).getValue();
      const android = sheet.getRange(rowNo, getColumnNo('android')).getValue();
      const pc = sheet.getRange(rowNo, getColumnNo('pc')).getValue();

      if (ios.includes('NG') || android.includes('NG') || pc.includes('NG')) {
        const sheetLink = `https://docs.google.com/spreadsheets/d/${activeSheet.getId()}/edit#gid=${sheet.getSheetId()}&range=${rowNo}:${rowNo}`;
        const sheetName = sheet.getName();

        const page = sheet.getRange(rowNo, getColumnNo('page')).getValue();

        const title = `[${sheetName}-${number}] ${page}　${testCase}`;
        const body = bodyTemplate
          .replace('{SHEET_LINK}', sheetLink)
          .replace('{SHEET_NAME}', sheetName)
          .replace('{TEST_CASE_NUMBER}', number)
          .replace('{TEST_CASE}', testCase)
          .replace('{EXPECTED_RESULT}', sheet.getRange(rowNo, getColumnNo('expected_result')).getValue())
          .replace('{ACTUAL_RESULT}', sheet.getRange(rowNo, getColumnNo('actual_result')).getValue())
          .replace('{HOW_TO_REPRODUCE}', sheet.getRange(rowNo, getColumnNo('how_to_reproduce')).getValue())
          .replace('{HOW_TO_FIX}', sheet.getRange(rowNo, getColumnNo('how_to_fix')).getValue());

        const payload = {
          title,
          body,
          labels,
        };

        const url = createIssue(githubUsername, repositoryName, payload);

        sheet.getRange(rowNo, getColumnNo('issue')).setValue(url);
        console.log('New Issue Created: ', url);
      }

      rowNo++;
    }
  }
}
