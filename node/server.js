/** Start server for bookclub. */
const { DB_URI } = require("./config");
const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function() {
  console.log(`Server starting on port ${PORT}!`);
});

