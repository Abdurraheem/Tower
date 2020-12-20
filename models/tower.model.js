import Sequelize from 'sequelize';
import { sequelize } from '../utils/mysql-client';

const tbl_tower = sequelize.define('tbl_tower', {
  name: { type: Sequelize.STRING, allowNull: false },
  floor : { type: Sequelize.INTEGER, allowNull: false },
  location: { type: Sequelize.STRING, allowNull: false },
  office : { type: Sequelize.INTEGER, allowNull: false },
  rating: { type: Sequelize.INTEGER, allowNull: false },
  latitude: { type: Sequelize.INTEGER, allowNull: false },
  longitude: { type: Sequelize.INTEGER, allowNull: false },
  createdBy: { type: Sequelize.STRING, allowNull: false },
  updatedBy: { type: Sequelize.STRING, allowNull: true }
}, {
  timestamps: true,
  underscored: false,
  tableName: 'tbl_tower'
});
tbl_tower.sync();
export default tbl_tower;