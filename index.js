const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 8080;

const pool = new Pool({
  host: process.env.DB_ADDR,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});


pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL', err);
  });

app.get('/', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.log('Error executing query:', err);
      res.status(500).send('Error executing query');
    } else {
      console.log("Query success");
      res.send(`Current time: ${result.rows[0].now}`);
    }
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
