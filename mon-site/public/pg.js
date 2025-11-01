// db.js
const { Pool } = require('pg');

// Utilisation de la variable d'environnement DATABASE_URL fournie par Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // nécessaire sur Render pour la connexion sécurisée
  }
});

module.exports = pool;
