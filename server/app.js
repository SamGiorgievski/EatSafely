// declarations
require('dotenv').config();
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

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
app.use(express.urlencoded({extended:false}));

// app.get('/', (req, res) => {
//   res.json({ data });
// });

// app.get('/api/data', (req, res) => {
//   client.query('SELECT * FROM users', (err, result) => {
//     if (err) throw err;
//     res.send(result.rows);
//   });
// });

app.get("/register", (req, res) => {
  // const user = req.session.id;
  // res.render("register", { user: user });
});

app.get("/login", (req, res) => {
  console.log("login!");
  // const user = req.session.id;
  // res.render("register", { user: user });
});

app.post("/register", (req, res) => {
  first_name = req.body.first_name;
  last_name = req.body.last_name;
  email = req.body.email;
  password = req.body.password;

  // console.log(first_name);


  
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
  
  // res.redirect("/login");
  res.redirect("/profile");
});

app.post("./login", (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;


  db.query(

    `SELECT email FROM users WHERE email = $1 RETURNING password`
    , [userEmail])
    .then(res => {
      if(userPassword === res){
        res.redirect("/profile")
        console.log("Success")
        console.log(user.userPassword)
      } else {
       res.redirect("/login")
       console.log("Fail")
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message});
    });
    res.redirect("/profile");

})


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));