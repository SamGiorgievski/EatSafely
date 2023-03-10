// db/queries/users.js

const db = require('../../configs/db');

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
  return db.query("SELECT intolerance FROM intolerances;").then(data => {
    return data.rows;
  });
};

module.exports = { getAllUsers, getUserById, getAllIntolerances };