const fs = require('fs');                    // Lire schema.sql
const mysql = require('mysql2/promise');      // Connexion MySQL
const sql = fs.readFileSync('schema.sql');    // Lit les commandes SQL
await connection.query(sql);                  // Exécute tout d'un coup