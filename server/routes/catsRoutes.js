// -- routes/catRoutes.js
const router = require('express').Router();
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  users.getAllIntolerances().then(data => {
    console.log(data);
    res.json({ users: data });
  });
});

module.exports = router;
