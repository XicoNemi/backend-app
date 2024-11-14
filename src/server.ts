import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import promotionRoutes from './routes/promotion.route';
import establishmentRoutes from './routes/establishment.route';
import fs from 'node:fs'
import path from 'node:path'

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.configuation();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('TEST GITHUB WEBHOOK');
    });
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/promotions', promotionRoutes)
    this.app.use('/api/estabs', establishmentRoutes)
    return this.app;
  }

  configuation() {
    this.app.set('port', process.env.PORT || 11111);
  }

  middlewares() {
    this.app.use(cors({
      origin: '*', // Acepta cualquier origen temporalmente
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
      exposedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
      credentials: true // Si necesitas incluir cookies o credenciales
    }));
    
    this.app.options('*', cors());
    const logDirectory = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
    const logStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });
    this.app.use(morgan('combined', { stream: logStream }));
    this.app.use(morgan('dev')); 
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  listen() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'));
    });
  }
}
