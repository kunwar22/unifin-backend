import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"]
});