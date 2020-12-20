import CONFIG from '../config';
import Sequelize from 'sequelize';

const databaseConfig = CONFIG.database;

const options = Object.assign(databaseConfig, {});
export const sequelize =
    new Sequelize(
        databaseConfig.database,
        databaseConfig.username,
        databaseConfig.password,
        options
    );