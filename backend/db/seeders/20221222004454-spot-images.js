'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: '',
        preview: 'true'
      },
      {
        spotId: 1,
        url: '',
        preview: 'false'
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [ 1, 2] }
    }, {});
  }
};
