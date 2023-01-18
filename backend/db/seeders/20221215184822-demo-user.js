'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Oleg',
        lastName: 'Volkov',
        email: 'demo@user.io',
        username: 'Oleg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'David',
        lastName: 'Volkov',
        email: 'david@user.io',
        username: 'David',
        hashedPassword: bcrypt.hashSync('password2'),
      },
      {
        firstName: 'AJ',
        lastName: 'Volkov',
        email: 'aj@user.io',
        username: 'AJ',
        hashedPassword: bcrypt.hashSync('password3'),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Oleg', 'David', 'AJ'] }
    }, {});
  }
};
