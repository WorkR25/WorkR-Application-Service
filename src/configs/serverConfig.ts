import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: Number(process.env.PORT),
    DB_PORT: Number(process.env.DB_PORT),
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    JWT_SECRET: String(process.env.JWT_SECRET),
};