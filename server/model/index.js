import Sequelize from 'sequelize'
import {
    mysqlConfig
} from '../config'

export const sequelize = new Sequelize(
    mysqlConfig.database,
    mysqlConfig.username,
    mysqlConfig.password,
    mysqlConfig.config);

export const random = sequelize.random



// 导入模型统一管理
export const Template = sequelize.import(__dirname + '/template.js');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connectd to MySQL');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });