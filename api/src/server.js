/* general imports */
const { cpus } = require("os");
const { pid }  = require("process");
const cluster  = require("cluster");
const express  = require("express");
const cors     = require("cors");

/* starting services */
const app = express();

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

/* defining server port and server startup */
const SERVER_POST = 3000;

if(cluster.isMaster){
  cpus[0] = cluster.fork();
  cpus[1] = cluster.fork();

  cluster.on("exit", (err) => {
    cluster.fork();
    console.log(`New worker rising`);
  });
} else {
  app.listen(SERVER_POST, (err) => {
    if(err) {
      console.trace("Fail on startup server");
    }
  
    console.log(`PID:${pid} - Server running on http://localhost:${SERVER_POST}`);
  });
}
