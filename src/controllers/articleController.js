// ============================================
// CONTRÔLEUR - ARTICLES
// ============================================

const pool = require('../database/connection');
const Article = require('../models/Articles');

/**
 * GET /api/articles
 * Récupère tous les articles (avec filtres optionnels)
 */
const getAllArticles = async (req, res, next) => {
  try {
    const { categorie, auteur, limit = 10, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];
    
    // Filtre par catégorie
    if (categorie) {
      query += ' AND categorie = ?';
      params.push(categorie);
    }
    
    // Filtre par auteur
    if (auteur) {
      query += ' AND auteur = ?';
      params.push(auteur);
    }
    
    // Pagination
    query += ' ORDER BY date_creation DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const connection = await pool.getConnection();
    const [articles] = await connection.query(query, params);
    connection.release();
    
    res.json({
      success: true,
      total: articles.length,
      articles
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/articles
 * Crée un nouvel article
 */
const createArticle = async (req, res, next) => {
  try {
    const { titre, contenu, auteur, categorie, tags } = req.body;
    
    // Valide les données
    const article = new Article({ titre, contenu, auteur, categorie, tags });
    const validation = article.valider();
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation échouée',
        errors: validation.errors
      });
    }
    
    // Insère dans la BD
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO articles (titre, contenu, auteur, categorie, tags) VALUES (?, ?, ?, ?, ?)',
      [titre, contenu, auteur, categorie, tags || null]
    );
    connection.release();
    
    res.status(201).json({
      success: true,
      message: 'Article créé avec succès',
      article: {
        id: result.insertId,
        titre,
        contenu,
        auteur,
        categorie,
        tags
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/articles/:id
 * Récupère un article par ID
 */
const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Valide l'ID
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({
        success: false,
        error: 'ID invalide'
      });
    }
    
    const connection = await pool.getConnection();
    const [articles] = await connection.query(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    );
    connection.release();
    
    if (articles.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Article non trouvé'
      });
    }
    
    res.json({
      success: true,
      article: articles[0]
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/articles/:id
 * Met à jour un article
 */
const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titre, contenu, auteur, categorie, tags } = req.body;
    
    // Valide l'ID
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({
        success: false,
        error: 'ID invalide'
      });
    }
    
    // Vérifie que l'article existe
    const connection = await pool.getConnection();
    const [existingArticle] = await connection.query(
      'SELECT id FROM articles WHERE id = ?',
      [id]
    );
    
    if (existingArticle.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        error: 'Article non trouvé'
      });
    }
    
    // Construit la requête UPDATE
    const updates = [];
    const values = [];
    
    if (titre !== undefined) {
      updates.push('titre = ?');
      values.push(titre);
    }
    if (contenu !== undefined) {
      updates.push('contenu = ?');
      values.push(contenu);
    }
    if (auteur !== undefined) {
      updates.push('auteur = ?');
      values.push(auteur);
    }
    if (categorie !== undefined) {
      updates.push('categorie = ?');
      values.push(categorie);
    }
    if (tags !== undefined) {
      updates.push('tags = ?');
      values.push(tags);
    }
    
    if (updates.length === 0) {
      connection.release();
      return res.status(400).json({
        success: false,
        error: 'Aucun champ à mettre à jour'
      });
    }
    
    values.push(id);
    const query = `UPDATE articles SET ${updates.join(', ')}, date_modification = CURRENT_TIMESTAMP WHERE id = ?`;
    
    await connection.query(query, values);
    
    // Récupère l'article mis à jour
    const [updatedArticle] = await connection.query(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    );
    connection.release();
    
    res.json({
      success: true,
      message: 'Article mis à jour avec succès',
      article: updatedArticle[0]
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/articles/:id
 * Supprime un article
 */
const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Valide l'ID
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({
        success: false,
        error: 'ID invalide'
      });
    }
    
    const connection = await pool.getConnection();
    
    // Vérifie que l'article existe
    const [existingArticle] = await connection.query(
      'SELECT id, titre FROM articles WHERE id = ?',
      [id]
    );
    
    if (existingArticle.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        error: 'Article non trouvé'
      });
    }
    
    // Supprime l'article
    await connection.query('DELETE FROM articles WHERE id = ?', [id]);
    connection.release();
    
    res.json({
      success: true,
      message: 'Article supprimé avec succès',
      deletedArticle: {
        id: existingArticle[0].id,
        titre: existingArticle[0].titre
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/articles/search?query=texte
 * Recherche des articles par titre ou contenu
 */
const searchArticles = async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Paramètre query obligatoire'
      });
    }
    
    const connection = await pool.getConnection();
    const [articles] = await connection.query(
      `SELECT * FROM articles 
       WHERE MATCH(titre, contenu) AGAINST(? IN BOOLEAN MODE)
       ORDER BY date_creation DESC`,
      [query]
    );
    connection.release();
    
    res.json({
      success: true,
      query,
      total: articles.length,
      articles
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles
};
// ```

// ### **Étape 5: Sauvegarde**
// - **Ctrl+S**

// ### **Étape 6: Redémarre le serveur**
// ```
// Ctrl+C (arrête le serveur actuel)
// npm run dev (relance)
// ```

// ### **Étape 7: Retourne à Postman**
// Essaie à nouveau:
// ```
// GET http://localhost:3000/api/articles