import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { loggerXiconemi } from '../utils/colorLogs';
import { urlSwagger } from '../utils/urlVerification';
import cors from 'cors';

// URLs para los distintos entornos de despliegue
const url = urlSwagger.production;
const urllocal = urlSwagger.local;

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación API - XicoNemi',
      version: '1.0.0',
      description:
      '## 📘 Documentación oficial de la API - XicoNemi\n' +
      '\n' +
      'Bienvenido a la documentación técnica de la API de **XicoNemi**, una plataforma digital enfocada en conectar comercios locales con sus clientes mediante herramientas tecnológicas modernas, seguras y fáciles de integrar.\n' +
      '\n' +
      '### 🎯 Objetivo del sistema\n' +
      'XicoNemi busca digitalizar la experiencia de compra y promoción de negocios, especialmente en comunidades donde el acceso a tecnologías es limitado. Esto se logra mediante:\n' +
      '\n' +
      '- Registro y autenticación segura de usuarios.\n' +
      '- Gestión de perfiles de clientes y negocios.\n' +
      '- Administración de productos, eventos, reseñas y estadísticas.\n' +
      '\n' +
      '### 🔐 Seguridad\n' +
      'Esta API implementa un sistema de autenticación **JWT (Bearer Token)**. Todas las rutas protegidas requieren incluir el token en el encabezado `Authorization`:\n' +
      '\n' +
      '```http\n' +
      'Authorization: Bearer <tu-token-aquí>\n' +
      '```\n' +
      '\n' +
      'Asegúrate de iniciar sesión para obtener un token válido antes de consumir los endpoints restringidos.\n' +
      '\n' +
      '### 📦 Módulos principales\n' +
      'La API está organizada en diferentes módulos, cada uno agrupado por etiquetas en esta documentación:\n' +
      '\n' +
      '- **Auth**: Registro, login, logout, recuperación de cuenta.\n' +
      '- **Users**: Gestión del perfil, roles y permisos.\n' +
      '- **Business**: Creación y administración de negocios locales.\n' +
      '- **Location**: Geolocalización, búsqueda por cercanía y datos de ubicación.\n' +
      '- **Review**: Valoraciones y comentarios de clientes sobre negocios.\n' +
      '- **Event**: Publicación de promociones, ofertas y eventos especiales.\n' +
      '- **Backup**: Respaldo y restauración de información.\n' +
      '- **Stats**: Visualización de métricas del sistema y uso.\n' +
      '\n' +
      '### 🔧 Recomendaciones para desarrolladores\n' +
      '- Explora primero los endpoints públicos.\n' +
      '- Luego prueba el flujo completo de login y obtención de JWT.\n' +
      '- Finalmente, accede a las rutas protegidas para manejar entidades como usuarios, negocios o reseñas.\n' +
      '\n' +
      '---\n' +
      'Gracias por formar parte del ecosistema **XicoNemi** 🚀\n',
    
    },
    servers: [
      {
        url: urllocal,
        description: 'Servidor de desarrollo/local',
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
    security: [
      {
        BearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Auth',
        description:
          'Endpoints relacionados con login, registro y autenticación de usuarios.',
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios: perfil, roles, datos personales y más.',
      },
      {
        name: 'Business',
        description: 'CRUD y administración de negocios registrados en XicoNemi.',
      },
      {
        name: 'Location',
        description: 'Geolocalización y datos de ubicación de negocios o usuarios.',
      },
      {
        name: 'Review',
        description: 'Sistema de calificaciones, comentarios y valoraciones.',
      },
      {
        name: 'Event',
        description: 'Eventos o promociones especiales publicados por los negocios.',
      },
      {
        name: 'Backup',
        description: 'Funciones relacionadas con respaldos de información crítica.',
      },
      {
        name: 'Stats',
        description: 'Módulo de estadísticas y métricas de uso del sistema.',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use(cors());

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  loggerXiconemi('yellow', `📘 Documentación disponible en: ${url}/docs`, 'swagger');
}
