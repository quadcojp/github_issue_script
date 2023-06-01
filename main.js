function main() {
  const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = activeSheet.getSheets();

  for (let sheetNo = 0; sheetNo < sheets.length; sheetNo++) {
    const sheet = sheets[sheetNo];

    let rowNo = headerRow + 1;
    while (true) {
      const number = sheet.getRange(rowNo, columns["number"]).getValue();
      const testCase = sheet.getRange(rowNo, columns["test_case"]).getValue();

      if (number.length === 0 || testCase.length === 0) break;

      if (sheet.getRange(rowNo, columns["issue"]).getValue().length > 0) {
        rowNo++;
        continue;
      }

      const ios = sheet.getRange(rowNo, columns["ios"]).getValue();
      const android = sheet.getRange(rowNo, columns["android"]).getValue();
      const pc = sheet.getRange(rowNo, columns["pc"]).getValue();

      if (ios === "NG" || android === "NG" || pc === "NG") {
        const sheetLink = `https://docs.google.com/spreadsheets/d/${activeSheet.getId()}/edit#gid=${sheet.getSheetId()}&range=${rowNo}:${rowNo}`;

        const title = testCase;
        const body = bodyTemplate
          .replace("{SHEET_LINK}", sheetLink)
          .replace("{TEST_CASE_NUMBER}", number)
          .replace("{PROBLEM_BACKGROUND}", testCase)
          .replace("{SCREEN_OR_API_ID}", sheet.getName())
          .replace(
            "{PROBLEM_DETAIL}",
            sheet.getRange(rowNo, columns["actual_result"]).getValue()
          )
          .replace(
            "{HOW_TO_REPRODUCE}",
            sheet.getRange(rowNo, columns["operation"]).getValue()
          )
          .replace(
            "{CORRECT_BEHAVIOR}",
            sheet.getRange(rowNo, columns["expected_result"]).getValue()
          );

        const payload = {
          title,
          body,
        };

        const url = createIssue(payload);

        sheet.getRange(rowNo, columns["issue"]).setValue(url);
        console.log("New Issue Created: ", url);
      }

      rowNo++;
    }
  }
}
