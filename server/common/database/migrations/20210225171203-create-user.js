'use strict';

const { Role } = require('../../../../common/config');

const TABLE_NAME = 'user';

module.exports = {
  up: (qi, Sequelize) => qi.createTable(TABLE_NAME, getColumns(Sequelize)),
  down: qi => qi.dropTable(TABLE_NAME)
};

const getColumns = ({ DATE, ENUM, INTEGER, STRING }) => ({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING
  },
  role: {
    type: ENUM(Object.values(Role)),
    allowNull: false
  },
  firstName: {
    type: STRING,
    field: 'first_name'
  },
  lastName: {
    type: STRING,
    field: 'last_name'
  },
  createdAt: {
    type: DATE,
    field: 'created_at',
    allowNull: false
  },
  updatedAt: {
    type: DATE,
    field: 'updated_at',
    allowNull: false
  },
  deletedAt: {
    type: DATE,
    field: 'deleted_at'
  }
});
