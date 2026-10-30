const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// DATABASE CODE (PROVIDED - you do not need to change anything in this file)
// The connection settings come from environment variables. You will pass
// them in through docker-compose.yml using the values in your .env file.
// ---------------------------------------------------------------------------
const pool = new Pool({
  host: process.env.DB_HOST,         // the NAME of the database service in docker-compose.yml
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// If the database goes down, log it instead of crashing.
pool.on('error', (err) => {
  console.error('Lost connection to the database:', err.message);
});

// Creates a "visits" table the first time the backend starts.
// Every time the page loads, one row is added to this table.
async function setupDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visits (
      id SERIAL PRIMARY KEY,
      visited_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Connected to Postgres, visits table is ready');
}

// Main endpoint: records a visit and returns the total number of visits
app.get('/', async (req, res) => {
  try {
    await pool.query('INSERT INTO visits DEFAULT VALUES');
    const result = await pool.query('SELECT COUNT(*) FROM visits');
    res.json({
      message: `Hello from ${process.env.STUDENT_NAME || 'an unknown student'}'s backend!`,
      visits: Number(result.rows[0].count),
    });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ message: 'Backend is running, but it cannot reach the database.' });
  }
});

// Postgres can take a few seconds to start, so keep trying before giving up.
async function start(retries = 15) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await setupDatabase();
      app.listen(PORT, () => {
        console.log(`Backend running on port ${PORT}`);
      });
      return;
    } catch (err) {
      console.log(`Waiting for the database (attempt ${attempt}/${retries}): ${err.message}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  console.error('Could not connect to the database. Check your DB_* environment variables in docker-compose.yml.');
  process.exit(1);
}

start();
