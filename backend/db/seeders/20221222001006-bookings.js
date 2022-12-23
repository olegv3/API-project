'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-02-01'),
        endDate: new Date('2023-02-07'),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-03-15'),
        endDate: new Date('2023-03-20'),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2023-04-02'),
        endDate: new Date('2023-04-05'),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
