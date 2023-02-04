// declarations
require('dotenv').config();
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const catsRoutes = require('./routes/catsRoutes');


const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

// app.use('/cats', catsRoutes);

// app.get('/', (req, res) => {
//   res.json({ data });
// });

app.get('/api/data', (req, res) => {
  client.query('SELECT * FROM users', (err, result) => {
    if (err) throw err;
    res.send(result.rows);
  });
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));