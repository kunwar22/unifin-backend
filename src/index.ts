require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { AppDataSource } from './appDataSource';
import { errorHandler } from './middleware/errorHandler';
import cookieParser from 'cookie-parser';

const PORT = Number(process.env.PORT) || 8000;
const app = express();

AppDataSource.initialize()
    .then(() => {
        app.use(express.json());
        app.use(cookieParser());
        app.use(cors({
            credentials: true,
            origin: ['http://localhost:3000']
        }));

        routes(app);
        app.use(errorHandler);
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Error Connecting Database", err)
    });