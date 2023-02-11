// declarations
require('dotenv').config();
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const session = require("express-session");


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
  console.log(req.session.id);
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

  res.redirect("/login");
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
        console.log("req.session", req.session.userEmail);
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
    SELECT intolerances.*
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
  req.session = null;
  res.clearCookie('session');
  console.log("Cookie Cleared!");

  // res.redirect("/login");
  return res.status(200).json({ message: "Logout Succesful" });
});


app.use(express.json());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
  })
);


app.put('/update', (req, res) => {
  let intolerance = req.body.intolerances;
  let dataID = req.body.sessionData;

  return db.query(
    `SELECT * FROM intolerances WHERE user_id = $1`, [dataID]
  )
    .then(result => {
      if (result.rows.length === 0) {
        try {
          return db.query(
            `INSERT INTO intolerances (intolerance, user_id) 
            VALUES ($1, $2)`,
            [intolerance, dataID]
          )
            .then(response => {
              res.json(response);
            })
            .catch(err => {
              res.status(500).json({ error: err.message });
            });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else {
        return db.query(
          `UPDATE intolerances SET intolerance =$1 WHERE user_id=$2`,
          [intolerance, dataID]
        );
      }
    })
    .then(response => {
      // res.json(response);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


app.post('/intolerances', (req, res) => {
  let dataID = req.body.sessionData;
  console.log(dataID);
  db.query(
    `
    SELECT * FROM intolerances WHERE user_id=$1
    `, [dataID])
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


app.post("/adduser", (req, res) => {
  
  const newUserFirstName = req.body.first_name;
  const newUserLastName = req.body.last_name;
  const dataID = req.body.sessionData;

  db.query(
    `
    SELECT users.first_name, users.last_name, secondary_users.first_name, secondary_users.last_name FROM users JOIN secondary_users ON users.id = secondary_users.user_id WHERE users.id = $1
  `, [dataID])
    .then(response => {
      console.log("newUser")
      res.json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});




app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));