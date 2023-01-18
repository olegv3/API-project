'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "https://a0.muscache.com/im/pictures/b3f03afe-110c-41eb-8d71-84a634e68efe.jpg?im_w=720"
      },
      {
        reviewId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-38883929/original/2c20c6a7-fa2d-40d9-81f1-b69e7f94a8cf.jpeg?im_w=720"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2] }
    }, {});
  }
};
