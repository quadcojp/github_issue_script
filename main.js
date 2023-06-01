const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
const sheets = activeSheet.getSheets();

function main() {
  for (let sheetNo = 0; sheetNo < sheets.length; sheetNo++) {
    const sheet = sheets[sheetNo];

    function getColumnNo(columnKey) {
      let colNo = 1;
      let res = null;
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

      if (ios === 'NG' || android === 'NG' || pc === 'NG') {
        const sheetLink = `https://docs.google.com/spreadsheets/d/${activeSheet.getId()}/edit#gid=${sheet.getSheetId()}&range=${rowNo}:${rowNo}`;

        const title = testCase;
        const body = bodyTemplate
          .replace('{SHEET_LINK}', sheetLink)
          .replace('{TEST_CASE_NUMBER}', number)
          .replace('{PROBLEM_BACKGROUND}', testCase)
          .replace('{SCREEN_OR_API_ID}', sheet.getName())
          .replace('{PROBLEM_DETAIL}', sheet.getRange(rowNo, getColumnNo('actual_result')).getValue())
          .replace('{HOW_TO_REPRODUCE}', sheet.getRange(rowNo, getColumnNo('operation')).getValue())
          .replace('{CORRECT_BEHAVIOR}', sheet.getRange(rowNo, getColumnNo('expected_result')).getValue());

        const payload = {
          title,
          body
        };

        const url = createIssue(payload);

        sheet.getRange(rowNo, getColumnNo('issue')).setValue(url);
        console.log('New Issue Created: ', url);
      }

      rowNo++;
    }
  }
}
