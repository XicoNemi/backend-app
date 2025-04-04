import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { loggerXiconemi } from '../utils/colorLogs';
import { urlSwagger } from '../utils/urlVerification';
import cors from 'cors';

// const url = urlSwagger.production;
const url = urlSwagger.production;
const urllocal = urlSwagger.local;

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
        url: urllocal,
        description: 'Servidor local',
      },
      {
        url: url,
        description: 'Servidor de producción',
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
      { name: 'Auth', description: 'Operaciones de autenticación' },
      { name: 'Users', description: 'Operaciones sobre usuarios' },
      { name: 'Business', description: 'Operaciones sobre negocios' },
      { name: 'Location', description: 'Operaciones sobre ubicaciones' },
      { name: 'Review', description: 'Operaciones sobre reseñas' },
      { name: 'Event', description: 'Operaciones sobre eventos' },
      { name: 'Backup', description: 'Operaciones de respaldo' },
      { name: 'Stats', description: 'Operaciones de estadísticas' },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use(cors());
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  loggerXiconemi('yellow', `Docs ${url}/docs`, 'swagger');
}
