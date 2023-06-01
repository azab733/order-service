const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 8080;

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get('/', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error executing query');
    } else {
      res.send(`Current time: ${result.rows[0].now}`);
    }
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
