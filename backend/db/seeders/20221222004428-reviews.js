'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}



module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Beautiful place',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Nice place',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Too windy',
        stars: 3,
      },
      {
        spotId: 1,
        userId: 1,
        review: 'We loved it',
        stars: 4,
        },
        ], {});
    }
    ,
    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Reviews';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            spotId: { [Op.in]: [1, 2, 3] }
        }, {});
    }
}