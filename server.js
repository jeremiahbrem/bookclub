/** Start server for bookclub. */
const express = require("express");
const path = require("path");
const { DB_URI } = require("./config");
const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function() {
  console.log(`Server starting on port ${PORT}!`);
});

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

