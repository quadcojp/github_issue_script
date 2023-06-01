const accessToken = '';
const githubUsername = '';
const repositoryName = '';
const baseUrl = 'https://api.github.com/repos/';

const bodyTemplate = `
## 問題発生の経緯 | Background of the Problem

{SHEET_LINK}
テストケース番号: {TEST_CASE_NUMBER}

{PROBLEM_BACKGROUND}

## 問題の詳細 | Details of the Problem

画面もしくはAPIのID: {SCREEN_OR_API_ID}

{PROBLEM_DETAIL}

### 再現手順 | How to reproduce

{HOW_TO_REPRODUCE}

## あるべき姿 | Correct behavior

{CORRECT_BEHAVIOR}

`;