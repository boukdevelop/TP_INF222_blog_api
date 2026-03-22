// ============================================
// UTILITAIRES - VALIDATION
// ============================================

/**
 * Valide un email
 */
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valide qu'une chaîne n'est pas vide
 */
const isNotEmpty = (str) => {
  return str && str.trim().length > 0;
};

/**
 * Valide qu'une ID est un entier positif
 */
const isValidId = (id) => {
  return Number.isInteger(parseInt(id)) && parseInt(id) > 0;
};

/**
 * Valide une URL
 */
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  isValidEmail,
  isNotEmpty,
  isValidId,
  isValidUrl
};