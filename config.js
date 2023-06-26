const accessToken = '';
const baseUrl = 'https://api.github.com/repos/';

const bodyTemplate = `
## テストケース | Test case

URL: {SHEET_LINK}
Case: {SHEET_NAME} No.{TEST_CASE_NUMBER}

{TEST_CASE}

## 問題の詳細 | Details of the Problem

### 期待する結果 | Expected
{EXPECTED_RESULT}

### 結果 | Results
{ACTUAL_RESULT}

### 再現手順 | How to reproduce
{HOW_TO_REPRODUCE}

## 修正方法 | How to fix
{HOW_TO_FIX}

`;