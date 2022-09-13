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

// Data Sanitization
app.post('/email', 
  (req, res) => {
    const response = {
      normalizedEmail: validator.normalizeEmail(req.body.emailForm) // Normalize email here
    }

    res.json({message: response})
});

app.post('/date', 
  (req, res) => {
    const response = {
      sanitizedDate: validator.toDate(req.body.dateForm)// Sanitize date here 
    }

    res.json({message: response})
});

app.post('/escape', 
  (req, res) => {
    const response = {
      escapedValue: validator.escape(req.body.escapeForm)// Escape form values here 
    }

    res.json({message: response})
});

// Prepared Statements
app.post("/info", async (req, res) => {

  // Change the query to use a placeholder using array syntax
  db.all(
    `SELECT * FROM Employee WHERE LastName = ?`,[req.body.lastName], (err, rows) => {
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
