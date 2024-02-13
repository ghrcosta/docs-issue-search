function onOpen() {
  DocumentApp.getUi().createMenu('Custom Menu')
      .addItem('Open Sidebar', 'openSidebar')
      .addToUi();
}

function openSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Search Results')
      .setWidth(300);
  DocumentApp.getUi().showSidebar(html);
}

function searchAndDisplayResults() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var searchResults = [];
  var searchTerm = 'android';

  var index = 0
  var foundElement = body.findText(searchTerm);
  while (foundElement != null) {
    var foundText = foundElement.getElement().asText();
    const itemIndex = ++index;
    searchResults.push({
      text: foundText.getText(),
      searchTerm: searchTerm,
      index: ""+itemIndex
    });
    foundElement = body.findText(searchTerm, foundElement);
  }

  return searchResults;
}

function searchForIssues() {
  const document = DocumentApp.getActiveDocument();
  const documentBody = document.getBody();
  const searchResults = [];

  for (issue of PATTERNS) {
    findIssueOccurrences(documentBody, issue, searchResults);
  }
  return searchResults;
}

function findIssueOccurrences(documentBody, issue, searchResults) {
  var occurrenceNumber = 0
  var foundRangeElement = documentBody.findText(issue.regexPattern);
  while (foundRangeElement != null) {
    const foundText = foundRangeElement.getElement().asText();
    searchResults.push({
      regexPattern: issue.regexPattern,
      text: foundText.getText(),
      occurrenceNumber: ++occurrenceNumber,
      message: issue.message,
      level: issue.level
    });
    foundRangeElement = documentBody.findText(issue.regexPattern, foundRangeElement);
  }

  return searchResults;
}

function selectResult(regexPattern, occurrenceNumber) {
  const document = DocumentApp.getActiveDocument();
  const documentBody = document.getBody();

  var occurrenceCount = 0
  var foundRangeElement = documentBody.findText(regexPattern);
  while (foundRangeElement != null) {
    occurrenceCount++;
    if (occurrenceCount == occurrenceNumber) {
      var selection = document.newRange().addElement(foundRangeElement.getElement());
      document.setSelection(selection);
      return;
    }
    foundRangeElement = documentBody.findText(regexPattern, foundRangeElement);
  }
  DocumentApp.getUi().alert("Unexpected error: item not found. Click the 'Search' button again.");
}
