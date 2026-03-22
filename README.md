# 📚 API Blog <--> INF222 EC1 TAF1

**API REST pour la gestion d'articles de blog**

Une API professionnelle et robuste développée avec **Node.js**, **Express** et **MySQL**, respectant les principes d'architecture en couches et les bonnes pratiques de développement backend.

---

## 📋 Table des matières

1. [Technologies utilisées](#technologies-utilisées)
2. [Structure du projet](#structure-du-projet)
3. [Prérequis](#prérequis)
4. [Installation et démarrage](#installation-et-démarrage)
5. [Endpoints de l'API](#endpoints-de-lapi)
6. [Codes HTTP utilisés](#codes-http-utilisés)
7. [Bonnes pratiques appliquées](#bonnes-pratiques-appliquées)
8. [Auteur](#auteur)

---

## 🛠️ Technologies utilisées

| Technology | Version | Utilité |
|-----------|---------|---------|
| **Node.js** | 22.20.0 | Runtime JavaScript côté serveur |
| **Express.js** | 4.x | Framework web minimaliste et flexible |
| **MySQL** | 8.0+ | Système de gestion de base de données relationnelle |
| **mysql2/promise** | 3.x | Driver MySQL avec support des Promises |
| **Nodemon** | 3.x | Redémarrage automatique du serveur en développement |
| **Dotenv** | 17.x | Gestion des variables d'environnement |
| **Body-parser** | 1.x | Parsing des requêtes HTTP |
| **CORS** | 2.x | Gestion des requêtes cross-origin |
| **Swagger-jsdoc** | 6.x | Documentation OpenAPI automatique |
| **Swagger-ui-express** | 5.x | Interface web pour Swagger |

---

## 🏗️ Structure du projet

```
blog-api/
│
├── src/
│   ├── app.js                    # Configuration principale Express
│   │   ├── Middlewares (CORS, body-parser)
│   │   ├── Routes
│   │   └── Gestion d'erreur 404
│   │
│   ├── config/
│   │   └── swagger.js            # Configuration Swagger/OpenAPI
│   │
│   ├── routes/
│   │   └── articles.js           # Définition des endpoints
│   │       ├── GET /api/articles (tous)
│   │       ├── GET /api/articles/:id (un)
│   │       ├── GET /api/articles/search (recherche)
│   │       ├── POST /api/articles (créer)
│   │       ├── PUT /api/articles/:id (modifier)
│   │       └── DELETE /api/articles/:id (supprimer)
│   │
│   ├── controllers/
│   │   └── articleController.js  # Logique métier
│   │       ├── getAllArticles() - récupère tous les articles
│   │       ├── getArticleById() - récupère un article
│   │       ├── createArticle() - crée un article
│   │       ├── updateArticle() - modifie un article
│   │       ├── deleteArticle() - supprime un article
│   │       └── searchArticles() - recherche d'articles
│   │
│   ├── models/
│   │   └── Article.js            # Modèle de données
│   │       ├── Propriétés (id, titre, contenu, etc.)
│   │       └── Méthode valider()
│   │
│   ├── database/
│   │   ├── connection.js         # Pool de connexions MySQL
│   │   │   └── Utilise les variables d'environnement
│   │   │
│   │   └── schema.sql            # Schéma de la base de données
│   │       ├── CREATE DATABASE
│   │       ├── CREATE TABLE articles
│   │       ├── CREATE INDEX pour recherche full-text
│   │       └── INSERT données de test (7 articles)
│   │
│   ├── middlewares/
│   │   ├── errorHandler.js       # Gestion centralisée des erreurs
│   │   └── validation.js         # Validation des requêtes
│   │
│   ├── utils/
│   │   ├── validators.js         # Fonctions de validation utilitaires
│   │   └── logger.js             # Système de logging
│   │
│   └── test-db.js                # Script de test de connexion
│
├── server.js                      # Point d'entrée principal
├── .env                           # Variables d'environnement (SECRET)
├── .env.example                   # Template .env (PUBLIC)
├── .gitignore                     # Fichiers ignorés par Git
├── package.json                   # Dépendances et scripts
└── README.md                      # Ce fichier
```

---

## 📦 Prérequis

Avant de commencer, assure-toi d'avoir:

- **Node.js** v18+ → [Télécharger](https://nodejs.org)
- **MySQL Server** v8.0+ lancé et configuré
- **npm** v10+ (inclus avec Node.js)
- **Postman** ou **curl** pour tester l'API (optionnel)

---

## ⚙️ Installation et démarrage

### 1️⃣ Clone le projet

```bash
git clone https://github.com/FRANCK/blog-api.git
cd blog-api
```

### 2️⃣ Installe les dépendances

```bash
npm install
```

### 3️⃣ Configure le fichier `.env`

```bash
cp .env.example .env
```

**Ouvre `.env` et mets tes informations MySQL:**

```env
PORT=3000
NODE_ENV=development

# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=MotDePasse
DB_NAME=blog_db

# Swagger
SWAGGER_PORT=3000
```

⚠️ **Important:** Remplace `tonMotDePasse` par ton vrai mot de passe MySQL!

### 4️⃣ Initialise la base de données

```bash
npm run db:setup
```

Ce script:
- ✅ Crée la base de données `blog_db`
- ✅ Crée la table `articles`
- ✅ Ajoute les index pour la recherche
- ✅ Insère 7 articles de test

### 5️⃣ Démarre le serveur

**En développement** (avec rechargement automatique):

```bash
npm run dev
```

**En production:**

```bash
npm start
```

Tu verras:
```
╔════════════════════════════════════════╗
║   🚀 API BLOG DÉMARRÉE AVEC SUCCÈS    ║
╠════════════════════════════════════════╣
║  Port: 3000                            ║
║  URL: http://localhost:3000            ║
║  Env: development                      ║
╚════════════════════════════════════════╝
✅ Connexion MySQL établie avec succès
```

### 6️⃣ Accède à l'API et la documentation

**API:** http://localhost:3000
**Documentation Swagger:** http://localhost:3000/config

---

## 🔌 Endpoints de l'API

### 1. GET /api/articles - Récupérer tous les articles

**Fonctionnalité:** Récupère la liste complète des articles avec filtrage optionnel

> **Méthode HTTP:** `GET`

**Paramètres de requête (optionnels):**
- `categorie` - Filtrer par catégorie (ex: `?categorie=Tech`)
- `auteur` - Filtrer par auteur (ex: `?auteur=Jean%20Dupont`)
- `limit` - Nombre d'articles par page (défaut: 10)
- `offset` - Décalage pour la pagination (défaut: 0)

**Code de réponse:** `200 OK`

**Exemple de requête:**
```bash
GET http://localhost:3000/api/articles
GET http://localhost:3000/api/articles?categorie=Tech
GET http://localhost:3000/api/articles?auteur=Jean%20Dupont&limit=5
```

**Exemple de réponse:**
```json
{
  "success": true,
  "total": 7,
  "articles": [
    {
      "id": 1,
      "titre": "Introduction à Node.js",
      "contenu": "Node.js est un runtime JavaScript...",
      "auteur": "Jean Dupont",
      "categorie": "Tech",
      "tags": "nodejs,javascript,backend",
      "date_creation": "2026-03-22T10:30:45.000Z",
      "date_modification": "2026-03-22T10:30:45.000Z"
    },
    {
      "id": 2,
      "titre": "DevOps avec Docker",
      "contenu": "Docker permet de containeriser les applications...",
      "auteur": "Marie Martin",
      "categorie": "Devops",
      "tags": "docker,devops,containers",
      "date_creation": "2026-03-22T10:31:15.000Z",
      "date_modification": "2026-03-22T10:31:15.000Z"
    }
  ]
}
```

---

### 2. GET /api/articles/:id - Récupérer un article par ID

**Fonctionnalité:** Récupère les détails d'un article spécifique

> **Méthode HTTP:** `GET`

**Paramètres de route:**
- `id` - ID de l'article (obligatoire)

**Codes de réponse:**
- `200 OK` - Article trouvé
- `400 Bad Request` - ID invalide
- `404 Not Found` - Article inexistant

**Exemple de requête:**
```bash
GET http://localhost:3000/api/articles/1
```

**Exemple de réponse (200):**
```json
{
  "success": true,
  "article": {
    "id": 1,
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un runtime JavaScript côté serveur...",
    "auteur": "Jean Dupont",
    "categorie": "Tech",
    "tags": "nodejs,javascript,backend",
    "date_creation": "2026-03-22T10:30:45.000Z",
    "date_modification": "2026-03-22T10:30:45.000Z"
  }
}
```

**Exemple de réponse (404):**
```json
{
  "success": false,
  "error": "Article non trouvé"
}
```

---

### 3. POST /api/articles - Créer un nouvel article

**Fonctionnalité:** Crée un nouvel article dans la base de données

> **Méthode HTTP:** `POST`

**Header obligatoire:**
```
Content-Type: application/json
```

**Corps de la requête (Body):**
```json
{
  "titre": "Mon nouvel article",
  "contenu": "Contenu complet de l'article",
  "auteur": "Franck",
  "categorie": "Tech",
  "tags": "nodejs,api,rest"
}
```

**Champs obligatoires:**
- `titre` - Titre de l'article (max 255 caractères)
- `contenu` - Contenu de l'article
- `auteur` - Nom de l'auteur
- `categorie` - Catégorie de l'article

**Champs optionnels:**
- `tags` - Tags séparés par des virgules

**Codes de réponse:**
- `201 Created` - Article créé avec succès
- `400 Bad Request` - Données invalides ou champs manquants
- `500 Server Error` - Erreur serveur

**Exemple de réponse (201):**
```json
{
  "success": true,
  "message": "Article créé avec succès",
  "article": {
    "id": 8,
    "titre": "Mon nouvel article",
    "contenu": "Contenu complet de l'article",
    "auteur": "Franck",
    "categorie": "Tech",
    "tags": "nodejs,api,rest"
  }
}
```

**Exemple de réponse (400):**
```json
{
  "success": false,
  "error": "Validation échouée",
  "errors": [
    "Le titre est obligatoire",
    "Le contenu est obligatoire"
  ]
}
```

---

### 4. PUT /api/articles/:id - Modifier un article

**Fonctionnalité:** Met à jour un article existant (modification partielle ou complète)

> **Méthode HTTP:** `PUT`

**Header obligatoire:**
```
Content-Type: application/json
```

**Paramètres de route:**
- `id` - ID de l'article (obligatoire)

**Corps de la requête (Body):**
```json
{
  "titre": "Titre modifié",
  "categorie": "Frontend",
  "tags": "updated,modified"
}
```

**Notes:** Tu peux modifier un ou plusieurs champs. Les champs non spécifiés ne seront pas modifiés.

**Codes de réponse:**
- `200 OK` - Article modifié avec succès
- `400 Bad Request` - ID invalide ou aucun champ à modifier
- `404 Not Found` - Article inexistant
- `500 Server Error` - Erreur serveur

**Exemple de réponse (200):**
```json
{
  "success": true,
  "message": "Article mis à jour avec succès",
  "article": {
    "id": 8,
    "titre": "Titre modifié",
    "contenu": "Contenu complet de l'article",
    "auteur": "Franck",
    "categorie": "Frontend",
    "tags": "updated,modified",
    "date_creation": "2026-03-22T10:30:45.000Z",
    "date_modification": "2026-03-22T11:45:20.000Z"
  }
}
```

---

### 5. DELETE /api/articles/:id - Supprimer un article

**Fonctionnalité:** Supprime un article de la base de données

> **Méthode HTTP:** `DELETE`

**Paramètres de route:**
- `id` - ID de l'article (obligatoire)

**Codes de réponse:**
- `200 OK` - Article supprimé avec succès
- `400 Bad Request` - ID invalide
- `404 Not Found` - Article inexistant
- `500 Server Error` - Erreur serveur

**Exemple de requête:**
```bash
DELETE http://localhost:3000/api/articles/8
```

**Exemple de réponse (200):**
```json
{
  "success": true,
  "message": "Article supprimé avec succès",
  "deletedArticle": {
    "id": 8,
    "titre": "Titre modifié"
  }
}
```

---

### 6. GET /api/articles/search - Rechercher des articles

**Fonctionnalité:** Recherche full-text dans les articles (titre et contenu)

> **Méthode HTTP:** `GET`

**Paramètres de requête:**
- `query` - Terme de recherche (obligatoire)

**Codes de réponse:**
- `200 OK` - Recherche effectuée
- `400 Bad Request` - Paramètre query manquant
- `500 Server Error` - Erreur serveur

**Exemple de requête:**
```bash
GET http://localhost:3000/api/articles/search?query=JavaScript
GET http://localhost:3000/api/articles/search?query=Node.js
```

**Exemple de réponse (200):**
```json
{
  "success": true,
  "query": "JavaScript",
  "total": 3,
  "articles": [
    {
      "id": 1,
      "titre": "Introduction à Node.js",
      "contenu": "Node.js est un runtime JavaScript côté serveur...",
      "auteur": "Jean Dupont",
      "categorie": "Tech",
      "tags": "nodejs,javascript,backend",
      "date_creation": "2026-03-22T10:30:45.000Z",
      "date_modification": "2026-03-22T10:30:45.000Z"
    },
    {
      "id": 3,
      "titre": "React avec JavaScript moderne",
      "contenu": "React est une librairie JavaScript...",
      "auteur": "Pierre Bernard",
      "categorie": "Frontend",
      "tags": "react,javascript,frontend",
      "date_creation": "2026-03-22T10:32:10.000Z",
      "date_modification": "2026-03-22T10:32:10.000Z"
    }
  ]
}
```

**Exemple de réponse (400):**
```json
{
  "success": false,
  "error": "Paramètre query obligatoire"
}
```

---

## 📊 Codes HTTP utilisés

| Code | Signification | Utilisation |
|------|---------------|-------------|
| **200** | OK | Requête réussie (GET, PUT, DELETE) |
| **201** | Created | Article créé avec succès (POST) |
| **400** | Bad Request | Données invalides, validation échouée |
| **404** | Not Found | Ressource inexistante (article, endpoint) |
| **500** | Server Error | Erreur serveur (erreur MySQL, etc.) |

---

## ✅ Bonnes pratiques appliquées

### 1. **Architecture en couches (MVC)**
- **Routes** - Définissent les endpoints
- **Contrôleurs** - Contiennent la logique métier
- **Modèles** - Représentent les données et validations
- **Database** - Gère les opérations sur la BD

Chaque couche a une responsabilité unique et bien définie.

### 2. **Validation des données**
- Validation au niveau du modèle (classe Article)
- Vérification des champs obligatoires
- Retours d'erreur explicites (400 Bad Request)

### 3. **Gestion d'erreur centralisée**
- Middleware `errorHandler.js`
- Try/catch dans les contrôleurs
- Messages d'erreur cohérents et informatifs

### 4. **Sécurité**
- Variables d'environnement (`.env`) pour les données sensibles
- `.gitignore` pour éviter de pusher les secrets
- Requêtes SQL paramétrées (prévention de l'injection SQL)

### 5. **Code propre**
- Noms explicites pour les variables et fonctions
- Commentaires JSDoc pour la documentation
- Indentation cohérente et lisible

### 6. **Performance**
- Pool de connexions MySQL (réutilisation des connexions)
- Indexation de la base de données (recherche full-text)
- Pagination optionnelle (limit, offset)

### 7. **Logging et débogage**
- Système de logging `logger.js`
- Messages explicites dans la console
- Traçabilité des opérations

### 8. **RESTful API**
- Méthodes HTTP appropriées (GET, POST, PUT, DELETE)
- Codes HTTP corrects
- Réponses JSON structurées

### 9. **Documentation**
- JSDoc pour chaque fonction
- Swagger/OpenAPI pour la documentation interactive
- README complet

### 10. **Environnement de développement**
- Nodemon pour le rechargement automatique
- Variables d'environnement pour la configuration
- Scripts npm pour les tâches courantes

---

## 👤 Auteur

|**`Matricule`**|***24G2765***|
|--------|--------|
|**`Nom`**|***BOUKALA BONOKO FRANCK GABRIEL***|

- 📧 Email: [ton email]
- 🐙 GitHub: [ton GitHub]
- 📅 Date: Mars 2026

Développé dans le cadre du cours **INF222 - Développement Web Backend**
-
Université: **UY1 Informatique Fondamentale L2**
-
---

## 📄 Licence

Ce projet est libre d'utilisation à des fins éducatives, mais pensez quand même à son concepteur 🙊

---

**Créé avec ❤️ pour apprendre les bonnes pratiques du développement API REST**.
