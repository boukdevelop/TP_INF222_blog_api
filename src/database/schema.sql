-- ============================================
-- SCHÉMA DE LA BASE DE DONNÉES
-- ============================================

-- Utiliser la base de données
USE blog_db;

-- Créer la table articles
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu LONGTEXT NOT NULL,
  auteur VARCHAR(100) NOT NULL,
  categorie VARCHAR(100) NOT NULL,
  tags VARCHAR(255),
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Index pour optimiser les recherches
  INDEX idx_categorie (categorie),
  INDEX idx_auteur (auteur),
  INDEX idx_date (date_creation),
  FULLTEXT INDEX ft_titre_contenu (titre, contenu)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DONNÉES DE TEST (optionnel)
-- ============================================

-- Insert des articles d'exemple
INSERT INTO articles (titre, contenu, auteur, categorie, tags) VALUES
(
  'Introduction à Node.js',
  'Node.js est un runtime JavaScript côté serveur qui permet de créer des applications rapides et scalables.',
  'Jean Dupont',
  'Tech',
  'nodejs,javascript,backend'
),
(
  'Les bases de Docker',
  'Docker est une plateforme de conteneurisation qui facilite le déploiement des applications.',
  'Marie Martin',
  'Devops',
  'docker,containers,devops'
),
(
  'React pour les débutants',
  'React est une bibliothèque JavaScript pour construire des interfaces utilisateur avec des composants réutilisables.',
  'Pierre Bernard',
  'Frontend',
  'react,javascript,frontend'
),
(
  'Guide complet sur les API REST',
  'Les API REST sont un style darchitecture pour concevoir des services web évolutifs et faciles à maintenir.',
  'Sophie Durand',
  'Tech',
  'api,rest,webservices'
),
(
  'Introduction à la programmation orientée objet',
  'La programmation orientée objet (POO) est un paradigme de programmation qui utilise des objets pour modéliser des données et des comportements.',
  'Lucie Moreau',
  'Programming',
  'oop,programming,object-oriented'
);

SELECT COUNT(*) AS total_articles FROM articles;
SELECT * FROM articles LIMIT 5;