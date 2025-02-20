import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { loggerXiconemi } from '../utils/colorLogs';
import { urlSwagger } from '../utils/urlVerification';

// const url = urlSwagger.production;
const url = urlSwagger.local;

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation XicoNemi',
      version: '1.0.0',
      description: 'Documentación de la API Xiconemi',
    },
    servers: [
      {
        url: url,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      { name: 'Users', description: 'Operaciones sobre usuarios' },
      { name: 'Auth', description: 'Operaciones de autenticación' },
      // { name: 'Promotions', description: 'Operaciones sobre promociones' },
      // { name: 'Establishments', description: 'Gestión de establecimientos' },
      // { name: 'Locations', description: 'Ubicaciones y puntos de interés' },
      // { name: 'Events', description: 'Eventos y actividades' },
      // { name: 'Itineraries', description: 'Gestión de itinerarios' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  loggerXiconemi('yellow', `Docs ${url}/docs`, 'swagger');
}
