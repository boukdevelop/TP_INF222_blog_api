// ============================================
// POINT D'ENTRÉE - LANCE LE SERVEUR
// ============================================

require('dotenv').config(); // Charger les variables EN PREMIER
const app = require('./src/app'); // Charger l'application ENSUITE

// Récupère le port depuis .env ou utilise 3000
const PORT = process.env.PORT || 3000; // .env contient les identifiants de la base de données

// Lance le serveur
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║     🚀 API BLOG DÉMARRÉE AVEC SUCCÈS
╠═══════════════════════════════════════════════════╣
║  Port: ${PORT}
║  URL : http://localhost:${PORT}
║  Env : ${process.env.NODE_ENV || 'development'}
╚═══════════════════════════════════════════════════╝
  `);
});

// Gère les erreurs d'arrêt du serveur
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Le port ${PORT} est déjà utilisé!`);
  } else {
    console.error('❌ Erreur serveur:', err);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Arrêt du serveur...');
  server.close();
});
