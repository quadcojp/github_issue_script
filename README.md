## github_issue_script

Create Github issue from Google Sheets using Google App Script.

See [here](https://github.com/sodavinchheng-quad/github_issue_script/issues) for examples.

[How it works](#how-it-works)

### Project Setup

1. Copy file content to Google App Script
2. Set config.js items:
- **accessToken**: Github access token ([How to get Github access token](#how-to-get-github-access-token))
- **githubUsername**: Github username or organization name
- **repositoryName**: Target repository name

### <a name="how-to-get-github-access-token"></a> How to get Github access token
1. Go to Github settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token (classic)
3. Enter Github password
4. Set token expiration date
5. Make sure repo is checked
6. Generate token
7. Copy the token and save it

<kbd><img width="720" alt="Screenshot 2023-06-01 at 16 15 02" src="https://github.com/sodavinchheng-quad/github_issue_script/assets/108704153/f76f7ab1-e560-4171-90be-2b2a44472402"></kbd>

### <a name="how-it-works"></a> How it works

- Loops through all sheets in the active spreadsheet
- In each sheet, loop through all rows starting from 3rd row (1st and 2nd row are headers)
- In each row, check if there is No, and テストケース
  - If empty No. or テストケース, move on to the next sheet
  - If there is both No. and テストケース, check if there is any NG in iOS, android, or PC
    - If no NG, move on to next row
    - If NG, check if Github link already exists at the end of the row
      - If exists, move on to next row
      - If not, create Github issue, then paste the link at the end of the row

|How it works|Result|
|--|--|
|<kbd><img width="260" alt="Screenshot 2023-06-01 at 16 15 02" src="https://github.com/sodavinchheng-quad/github_issue_script/assets/108704153/abe23dbd-4cdd-46c7-8379-6210d7e86347"></kbd>|<kbd><img width="700" alt="Screenshot 2023-06-05 at 11 29 41" src="https://github.com/sodavinchheng-quad/github_issue_script/assets/108704153/a9146af6-195c-4a66-b1b8-894a60c6ccdf">  </kbd>|
