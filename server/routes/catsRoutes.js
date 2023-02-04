// -- routes/catRoutes.js
const router = require('express').Router();
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  users.getAllIntolerances().then(data => {
    res.json({ data });
  });
});

module.exports = router;
