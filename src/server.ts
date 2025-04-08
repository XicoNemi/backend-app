// ? Core modules
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'http';

// ? Third-party libraries
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Server as SocketServer, Socket } from 'socket.io';

// ? Configurations
import { connectToPostgres } from './config/sqlDataBase';
import { connectToMongoDB } from './config/nosqlDataBase';
import { setupSwagger } from './config/swagger';
import { limiter } from './config/limiter';

// ? Utils and custom modules
import { loggerXiconemi } from './utils/colorLogs';
import { AppError } from './utils/errorApp';

// ? Middleware
import errorHandler from './middleware/errorHandler';

// ? Models
import { MessageModel } from './models/chat.model';

// ? Routes
import routes from './routes';

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

    this.app.use('/api', routes);

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
    this.app.use(limiter);

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

      await connectToPostgres();
      await connectToMongoDB();
    });
  }
}
