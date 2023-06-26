function createIssue(githubUsername, repositoryName, payload) {
  let header = {
    "Authorization": `token ${accessToken}`,
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

  let options = {
    'method' : 'POST',
    'headers' : header,
    'payload': JSON.stringify(payload)
  };

  let url = `${baseUrl}${githubUsername}/${repositoryName}/issues`;

  let response = UrlFetchApp.fetch(url, options);
  response = JSON.parse(response);

  return response['html_url'];
}
  