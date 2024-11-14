import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import promotionRoutes from './routes/promotion.route';
import establishmentRoutes from './routes/establishment.route';

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
      res.send('XicoNemi API TEST8 =====');
    });
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/promotions',promotionRoutes)
    this.app.use('/api/estabs', establishmentRoutes)
    return this.app;
  }

  configuation() {
    this.app.set('port', process.env.PORT || 11111);
  }

  middlewares() {
    this.app.use(cors());
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
