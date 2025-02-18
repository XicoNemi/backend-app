import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import promotionRoutes from './routes/promotion.route';
import establishmentRoutes from './routes/establishment.route';
import { connectToDatabase } from './config/database';
import fs from 'fs';
import path from 'path';

export class Server {
  private app: express.Express;

  constructor() {
    this.app = express();
    this.configuration();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('This is the API of the app');
    });
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/promotions', promotionRoutes);
    this.app.use('/api/estabs', establishmentRoutes);
    return this.app;
  }

  configuration() {
    this.app.set('port', process.env.PORT || 11111);
    this.app.set('trust proxy', 1);
  }

  middlewares() {
    this.app.use(
      cors({
        origin: '*', // Acepta cualquier origen - temporalmente
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    );

    this.app.options('*', cors());
    const logDirectory = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
    const logStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), {
      flags: 'a',
    });
    this.app.use(morgan('combined', { stream: logStream }));
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  listen() {
    this.app.listen(this.app.get('port'), async () => {
      console.log('\x1b[32m%s\x1b[0m', '=====================================');
      console.log('\x1b[32m%s\x1b[0m', ' Server is running');
      console.log('\x1b[32m%s\x1b[0m', ` Listening on port: ${this.app.get('port')}`);
      console.log('\x1b[32m%s\x1b[0m', '=====================================');

      await connectToDatabase();
    });
  }
}
