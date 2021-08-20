/* general imports */
const express = require("express");
const cors    = require("cors");
const app     = express();

/* database startup */
require("./database/database");

/* routes import */
const routes  = require("./routes");

/* express configs */
app.use(cors());
app.use(express.json(      { limit: "50MB" }));
app.use(express.urlencoded({ limit: "50MB", extended: true }));

/* routs */
app.use(routes);

/* defining server port and server startup*/
const SERVER_POST = 3000;
app.listen(SERVER_POST, (err) => {
  if(err) {
    console.trace("Fail on startup server");
  }

  console.log(`Server running on http://localhost:${SERVER_POST}`);
});