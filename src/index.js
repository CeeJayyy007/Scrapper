const express = require("express");
const bodyParser = require("body-parser");
const scrapperRouter = require("./scrapper");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", scrapperRouter);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
