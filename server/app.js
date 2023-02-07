// declarations
require('dotenv').config();
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');


const { Pool } = require("pg");
const dbParams = require("./configs/db.js");
const db = new Pool(dbParams);
db.connect();

const catsRoutes = require('./routes/catsRoutes');
const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

app.use('/data', catsRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'session',
  keys: ['key1, key2']
}));

app.get("/register", (req, res) => {
});

app.get("/login", (req, res) => {
});

app.get("/profile", (req, res) => {
});

app.post("/register", (req, res) => {
  first_name = req.body.first_name;
  last_name = req.body.last_name;
  email = req.body.email;
  password = req.body.password;

  db.query(
    `
  INSERT INTO users (first_name,last_name, email, password)
  VALUES ($1, $2, $3, $4)
  `, [first_name, last_name, email, password])
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  res.redirect("/profile");
});

app.post("/login", (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  db.query(

    `SELECT * FROM users WHERE email = $1`
    , [userEmail])
    .then(response => {
      const user = response.rows[0];

      req.session.userEmail = userEmail;
      if (userPassword === user.password) {
        // console.log("req.session", req.session.userEmail)
        console.log("Success");

        return res.status(200).json({ message: "Login Succesful", user });
      } else {
        console.log("Fail");
        return res.status(400).json({ message: "Login Unsuccesful" });

      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

app.post("/profile", (req, res) => {

  db.query(
    `
    SELECT users.*, intolerances.*
    FROM users
    LEFT JOIN intolerances ON users.id = intolerances.user_id
  `)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

app.post("/logout", (req, res) => {
  res.clearCookie('session');
  console.log("Cookie Cleared!");
  res.redirect("/login");
  return res.status(200).json({ message: "Logout Succesful" });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));