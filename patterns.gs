class IssueData {
  constructor(level, regexPattern, message) {
    this.level = level;
    this.regexPattern = regexPattern;
    this.message = message;
  }
}

const Level = {
	ERROR: "ERROR",
	WARNING: "WARNING"
}

// Results will be presented in the order the items are sorted here
const PATTERNS = [
  new IssueData(Level.ERROR, "android", "First letter must be upper case: \"Android\"."),
  new IssueData(Level.WARNING, "test", "test test test test test test test test test test test test test test test test test test."),
];