const pool = require('./src/database/connection');  // Importe la connexion
const [articles] = await connection.query('SELECT * FROM articles');
console.table(articles);  // Affiche les données dans un tableau