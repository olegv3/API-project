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
        url: 'https://a0.muscache.com/im/pictures/b3f03afe-110c-41eb-8d71-84a634e68efe.jpg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/2e28e5fe-ba50-4308-8a70-37e92409d8a3.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48165457/original/b44180d6-2875-4c91-995b-2ce7b6c9cd89.jpeg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-38883929/original/2c20c6a7-fa2d-40d9-81f1-b69e7f94a8cf.jpeg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/44cd237c-1081-423a-b605-b5f48ecbd5b5.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/3540a523-59ca-480b-a420-7eb0f8a1dfaa.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/744ababf-b081-448d-9525-1bfd8f1bbc97.jpg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 3,
        url:'https://a0.muscache.com/im/pictures/3724f0a5-7eda-4db7-aa7b-3a471ab5f7d6.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/f1c0b45b-41bb-4c07-a72c-91b86dcb34ac.jpg?im_w=720',
        preview: 'false'
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [ 1, 2, 3 ] }
    }, {});
  }
};
