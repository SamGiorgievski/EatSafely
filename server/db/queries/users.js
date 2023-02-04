// db/queries/users.js

const db = require('../../configs/db.config');

const getAllUsers = () => {
  return db.query("SELECT * FROM users;").then(data => {
    return data.rows;
  });
};

const getUserById = id => {
  return db.query("SELECT * FROM users; WHERE id = $1", [id]).then(data => {
    return data.rows;
  });
};

const getAllIntolerances = () => {
  return db.query("SELECT * FROM intolerances;").then(data => {
    console.log(data.rows.intolerance);
    return data.rows;
  });
};

module.exports = { getAllUsers, getUserById, getAllIntolerances };