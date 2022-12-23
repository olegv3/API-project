'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}



module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.768,
        lng: -122.427,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 123,
      },
      {
        ownerId: 2,
        address: '333 West Road',
        city: 'Fort Lee',
        state: 'New Jersey',
        country: 'United States of America',
        lat: 47.78,
        lng: 77.47,
        name: 'Home',
        description: 'Just like home',
        price: 223,
      },
      {
        ownerId: 3,
        address: '21 Hurricane Lane',
        city: 'Miami',
        state: 'Florida',
        country: 'United States of America',
        lat: 77.768,
        lng: 52.427,
        name: 'Windy village',
        description: 'Ocean views',
        price: 323,
      },
    ], {});
    }
    ,
    down: async (queryInterface, Sequelize) => {
      options.tableName = 'Spots';
      const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
          id: { [Op.in]: [1, 2, 3] }
        }, {});
    }
    };
