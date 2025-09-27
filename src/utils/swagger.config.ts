import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'Documentação da API de usuários com Swagger e TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Mostra no Swagger que o token é do tipo JWT
        },
      },
    },
  },
  apis: ['./src/presentation/routes/*.ts', './src/presentation/controllers/*.ts'], // caminhos dos arquivos onde estarão as anotações
};

export const swaggerSpec = swaggerJsdoc(options);