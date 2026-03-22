// ============================================
// CONFIGURATION EXPRESS - FICHIER PRINCIPAL
// ============================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialiser Express
const app = express();

// ============================================
// MIDDLEWARES GLOBAUX
// ============================================

// CORS - Permet les requêtes depuis d'autres domaines
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Body Parser - Parse les données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de logs simple
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES
// ============================================

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: '✅ API Blog est en ligne!',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// Placeholder pour routes articles (à ajouter)
app.use('/api/articles', require('./routes/articles'));

// ============================================
// GESTION D'ERREUR 404
// ============================================

app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path,
    method: req.method
  });
});

// ============================================
// GESTION D'ERREURS GLOBALE
// ============================================

app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erreur serveur interne',
    status: err.status || 500
  });
});

// ============================================
// EXPORT
// ============================================

module.exports = app;