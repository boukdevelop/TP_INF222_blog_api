// ============================================
// MODÈLE ARTICLE
// ============================================

/**
 * Classe Article - Représente un article du blog
 */
class Article {
  constructor({
    id = null,
    titre = '',
    contenu = '',
    auteur = '',
    categorie = '',
    tags = '',
    date_creation = null,
    date_modification = null
  } = {}) {
    this.id = id;
    this.titre = titre;
    this.contenu = contenu;
    this.auteur = auteur;
    this.categorie = categorie;
    this.tags = tags;
    this.date_creation = date_creation;
    this.date_modification = date_modification;
  }

  /**
   * Valide les données de l'article
   * @returns {object} { isValid: boolean, errors: array }
   */
  valider() {
    const errors = [];

    if (!this.titre || this.titre.trim().length === 0) {
      errors.push('Le titre est obligatoire');
    }
    if (this.titre && this.titre.length > 255) {
      errors.push('Le titre ne doit pas dépasser 255 caractères');
    }

    if (!this.contenu || this.contenu.trim().length === 0) {
      errors.push('Le contenu est obligatoire');
    }

    if (!this.auteur || this.auteur.trim().length === 0) {
      errors.push('L\'auteur est obligatoire');
    }

    if (!this.categorie || this.categorie.trim().length === 0) {
      errors.push('La catégorie est obligatoire');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Convertit l'article en objet simple
   */
  toJSON() {
    return {
      id: this.id,
      titre: this.titre,
      contenu: this.contenu,
      auteur: this.auteur,
      categorie: this.categorie,
      tags: this.tags,
      date_creation: this.date_creation,
      date_modification: this.date_modification
    };
  }
}

module.exports = Article;