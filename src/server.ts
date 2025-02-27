import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'node:fs';
import path from 'node:path';
import { loggerXiconemi } from './utils/colorLogs';
import { Request, Response, NextFunction } from 'express';
// Routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import promotionRoutes from './routes/promotion.route';
import locationRoutes from './routes/location.route';
import eventRoutes from './routes/event.routes';
import itineraryRoutes from './routes/itinerary.routes';
import pointsRoutes from './routes/pointOfInterest.routes';
import errorHandler from './middleware/errorHandler';
import { connectToMysql } from './config/sqlDataBase';
import { setupSwagger } from './config/swagger';
import imageRoutes from './routes/image.routes';
import businessRoutes from './routes/business.routes';
import { AppError } from './utils/errorApp';

// import message
import { createServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { MessageModel } from './models/chat.model';
import { connectToMongoDB } from './config/nosqlDataBase';
import chatRotes from './routes/chat.routes';

export class Server {
  private app: express.Express;
  private io: SocketServer;
  private httpServer: ReturnType<typeof createServer>;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new SocketServer(this.httpServer, {
      cors: { origin: '*' },
    });

    this.configuration();
    this.middlewares();
    this.setupSwagger();
    this.routes();
    this.sockets();
  }

  setupSwagger() {
    setupSwagger(this.app);
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('This is the API of the app');
    });

    this.app.use('/api/users', userRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/images', imageRoutes);
    this.app.use('/api/business', businessRoutes);
    this.app.use('/api/promotions', promotionRoutes);
    this.app.use('/api/locations', locationRoutes);
    this.app.use('/api/events', eventRoutes);
    this.app.use('/api/itineraries', itineraryRoutes);
    this.app.use('/api/points', pointsRoutes);
    this.app.use('/api/chat', chatRotes);

    this.app.use('*', (req, res, next) => {
      next(new AppError('Route not found', 404));
    });

    this.app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
      errorHandler(err, req, res, next);
    });

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

  sockets() {
    this.io.on('connection', (socket: Socket) => {
      loggerXiconemi('green', `New connection: ${socket.id}`, 'success');

      socket.on('joinRoom', ({ userId, receiverId }) => {
        const roomId = [userId, receiverId].sort().join('-');
        socket.join(roomId); // ! UNIRSE A UNA SALA
        loggerXiconemi('green', `User ${userId} joined room ${roomId}`, 'success');
      });

      socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        const roomId = [senderId, receiverId].sort().join('-');

        const newMessage = new MessageModel({ senderId, receiverId, message });
        await newMessage.save();

        this.io.to(roomId).emit('receiveMessage', { senderId, message });
      });

      socket.on('disconnect', () => {
        loggerXiconemi('red', `User ${socket.id} disconnected`, 'success');
      });
    });
  }

  listen() {
    this.app.listen(this.app.get('port'), async () => {
      loggerXiconemi('cyan', `Server running on port ${this.app.get('port')}`, 'success');

      await connectToMysql();
      await connectToMongoDB();
    });
  }
}
