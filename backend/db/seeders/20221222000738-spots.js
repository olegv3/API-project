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
        country: 'United States',
        lat: 37.768,
        lng: -122.427,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 825,
      },
      {
        ownerId: 1,
        address: '333 West Road',
        city: 'Fort Lee',
        state: 'New Jersey',
        country: 'United States',
        lat: 47.78,
        lng: 77.47,
        name: 'Home',
        description: 'Just like home',
        price: 750,
      },
      {
        ownerId: 1,
        address: '21 Hurricane Lane',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 77.768,
        lng: 52.427,
        name: 'Windy village',
        description: 'Ocean views',
        price: 575,
      },
      {
        ownerId: 2,
        address: '12 Main Street',
        city: 'Mount Kisco',
        state: 'New York',
        country: 'United States',
        lat: 41.2,
        lng: 73.68,
        name: 'Luxury 8 BR Estate',
        description: 'With Pool and Tennis court',
        price: 2160,
      },
      {
        ownerId: 2,
        address: '17 River Road',
        city: 'Alexandria Bay',
        state: 'New York',
        country: 'United States',
        lat: 44.33,
        lng: 75.98,
        name: 'River Royalty',
        description: 'With private dock',
        price: 650,
      },
      {
        ownerId: 2,
        address: '21 Hilltop Road',
        city: 'Beach Lake',
        state: 'Pennsylvania',
        country: 'United States',
        lat: 41.5,
        lng: 75.68,
        name: 'Hilltop Mansion Poconos',
        description: 'With Pool and Tennis court',
        price: 3500,
      },
      {
        ownerId: 3,
        address: '316 West 11th Street',
        city: 'Orleans',
        state: 'Massachusetts',
        country: 'United States',
        lat: 41.88,
        lng: 70.98,
        name: 'Cape Cod Beach House',
        description: 'With Pool and Tennis court',
        price: 2857,
      },
      {
        ownerId: 3,
        address: '64 Fernwood Road',
        city: 'Clifford',
        state: 'Pennsylvania',
        country: 'United States',
        lat: 41.5,
        lng: 75.68,
        name: 'Fern Hall Private Estate',
        description: 'Crystal clear lake',
        price: 935,
      },
      {
        ownerId: 3,
        address: '17 Blueberry Lane',
        city: 'Langley',
        state: 'Kentucky',
        country: 'United States',
        lat: 37.78,
        lng: 77.47,
        name: 'The Bluegrass Palace',
        description: 'With Pool and Tennis court',
        price: 568,
      },
      {
        ownerId: 1,
        address: '2100 Texas Avenue',
        city: 'Burnet County',
        state: 'Texas',
        country: 'United States',
        lat: 30.78,
        lng: 98.47,
        name: 'Texas Hill Country',
        description: 'Bavarian Castle nestled in the Texas Hill Country',
        price: 750,
      },
      {
        ownerId: 1,
        address: '1 Mountain View Road',
        city: 'Superior',
        state: 'Montana',
        country: 'United States',
        lat: 47.78,
        lng: 77.47,
        name: 'Mountain View Villa',
        description: 'With views to die for',
        price: 3750,
      },
      {
        ownerId: 1,
        address: '19 Beverly Hills Drive',
        city: 'Beverly Hills',
        state: 'California',
        country: 'United States',
        lat: 37.78,
        lng: 77.47,
        name: 'Chateau de Laurel',
        description: 'With Pool and Tennis court',
        price: 7500,
      },
      
    ], {});
    }
    ,
    down: async (queryInterface, Sequelize) => {
      options.tableName = 'Spots';
      const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
          name: { [Op.in]: ['App Academy', 'Home', 'Windy village', 'Luxury 8 BR Estate', 'River Royalty', 'Hilltop Mansion Poconos', 'Cape Cod Beach House', 'Fern Hall Private Estate', 'The Bluegrass Palace', 'Texas Hill Country', 'Mountain View Villa', 'Chateau de Laurel'] }

        }, {});
    }
    };
