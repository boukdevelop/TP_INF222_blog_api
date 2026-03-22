// ============================================
// CONFIGURATION SWAGGER (DOCUMENTATION API)
// ============================================

const swaggerJsdoc = require('swagger-jsdoc');

// Définition de base Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blog Documentation',
      version: '1.0.0',
      description: 'Documentation complète de l\'API Blog',
      contact: {
        name: 'Support API',
        email: 'support@blogapi.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Serveur de développement'
      }
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            titre: {
              type: 'string',
              example: 'Introduction à Node.js'
            },
            contenu: {
              type: 'string',
              example: 'Node.js est un runtime...'
            },
            auteur: {
              type: 'string',
              example: 'Jean Dupont'
            },
            categorie: {
              type: 'string',
              example: 'Tech'
            },
            tags: {
              type: 'string',
              example: 'nodejs,javascript'
            },
            date_creation: {
              type: 'string',
              format: 'date-time'
            },
            date_modification: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;