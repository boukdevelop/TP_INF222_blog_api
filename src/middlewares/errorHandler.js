// ============================================
// MIDDLEWARE - GESTION D'ERREURS
// ============================================

/**
 * Middleware pour gérer les erreurs
 * À utiliser: app.use(errorHandler);
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur:', err);

  const status = err.status || 500;
  const message = err.message || 'Erreur serveur interne';

  res.status(status).json({
    error: {
      message,
      status,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = errorHandler;