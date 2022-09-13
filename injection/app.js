const express = require("express");
const path = require('path');
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./db.sqlite");

const app = express();

app.use(express.json());

app.use(
 express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/info", async (req, res) => {

  // Change the query to use named placeholders
  db.all(
    `SELECT * FROM Employee WHERE LastName = $lastName`,{ $lastName: req.body.lastName}, (err, rows) => {
      if (rows) {
        res.status(200);
        res.json(rows);
      } else {
        res.status(200);
        res.json({ message: "No employees" });
      }
    }
  );
});

app.listen(4001, () => {
  console.log("App running on http://localhost:4001");
});
