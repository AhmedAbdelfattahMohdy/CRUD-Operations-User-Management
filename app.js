const express = require("express");
const mysql = require("mysql");

const app = express();

const cors = require("cors");
app.use(cors()); // Enable CORS for all routes

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Express Server is running at port no : " + PORT);
});

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // password: "root",
  database: "mydbcrud",
});

connection.connect((err) => {
  if (!err) {
    console.log("DB connection succeeded");
  } else {
    console.log("DB connection failed " + JSON.stringify(err, undefined, 2));
  }
});

// end point -- fetch data from DB--

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });

  // res.end("Ended!");
});

app.get("/fetch-all-users", (req, res) => {
  connection.query("SELECT * FROM user", (err, rows, fields) => {
    res.json(rows);
  });
});

app.post("/create", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.sendStatus(400);
  }

  connection.query(
    "INSERT INTO user SET ?",
    { name: body.name, email: body.email },
    (err, rows, fields) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

app.use(express.static("FrontEnd"));

//
//
// end point -- fetch data from DB--
/*app.get("/fetch-all-users", (req, res) => {
  try {
    connection.query("SELECT * from user", (err, rows, fields) => {
      res.end(rows);
      connection.end();
    });
  } catch (error) {
    console.log("error in query", error);
  }
});*/
