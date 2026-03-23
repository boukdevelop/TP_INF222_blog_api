// ============================================
// CONNEXION MYSQL
// ============================================

const mysql = require('mysql2/promise');
require('dotenv').config();

// Crée un pool de connexions (meilleure pratique)
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_NAME || 'blog_db',
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste la connexion au démarrage
pool.getConnection()
  .then(connection => {
    console.log('✅ Connexion MySQL établie avec succès');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erreur de connexion MySQL:', err.message);
    console.error('Vérifie les paramètres dans .env');
    process.exit(1);
  });

module.exports = pool;
