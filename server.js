const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const searchForWord = ($, keyword) => {
  // define regex string to find exact keyword matches
  const regex = new RegExp("\\b(" + keyword + ")\\b", "g");
  const bodyText = $("html > body")
    .text()
    .toLowerCase();
  const wordMatches = bodyText.match(regex);
  return wordMatches ? wordMatches.length : 0;
};

app.post("/scrape", (req, res) => {
  const URL = req.body.URL;
  // keyword matching will ignore case sensitivity for simplicity's sake
  const keyword = req.body.keyword.toLowerCase();
  request(URL, function(error, response, body) {
    if (!error) {
      // Parse the document body
      const $ = cheerio.load(body);
      const wordCount = searchForWord($, keyword);
      const timeStamp = new Date();
      const responseObject = {
        timeRecord: timeStamp.toUTCString(),
        wordCount,
        URL,
        keyword
      };
      res.json(responseObject);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
