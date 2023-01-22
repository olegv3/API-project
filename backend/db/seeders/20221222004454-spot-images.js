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
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/2c7758a7-bdd7-4453-a717-41d4c645420c.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/be347796-bf1c-4f11-b411-d1922a23e555.jpg?im_w=720',
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
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50939368/original/72a50d17-bd3c-4fe9-93e4-3ac2a7bead28.jpeg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50939368/original/7a57b197-a669-484e-ab92-07f479900814.jpeg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50939368/original/28ad6acb-6771-4b60-8604-9267d83a4310.jpeg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/9cd82edf-144f-457b-9fcc-8428a82ea6d1.jpg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-22745218/original/d1c5880f-e5e8-4ab7-9396-87d28d20ea99.jpeg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/fee76989-229a-4c9d-89bd-30fd6d42d15c.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/f37d079d-0cc4-43b4-99f9-acd21985f130.jpg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/e2fe4812-09f0-4d14-a15e-05d1bb6993aa.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/f733e88c-6f19-4db8-9c5f-b2c43810e4e4.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/f41f08e8-6318-4f7b-85a2-df4a18a9d214.jpg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/c054a574-a72f-4a11-b822-63e9eeab105d.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/0cb737da-bcd5-4403-ba71-95d1ba3e204d.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-32234578/original/664c8c6f-981b-4048-b529-2e375d27a9c7.jpeg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/f50b48af-09a1-4d2a-809d-c2a6077b178e.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/2705f597-6eed-488f-88f0-a47a3d21e3e6.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47051400/original/2b9c593f-2027-4f97-a1f7-6eabd4605b5c.jpeg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/11ced846-0a9f-4057-9a20-6d2c9dba471a.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/e9a58203-5a49-42c7-aa72-f5be41a3b3d3.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/144d9f91-cc3b-4fd0-bbcb-6ba94f98ef5b.jpg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/b7975d9c-d5af-4669-93a4-3ff1097fc237.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/8c60f684-dff7-4743-bdf8-1ede8b9697de.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/2bfa9fd4-08cc-4014-b7ec-898f80a24525.jpg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/c73194ba-14af-4304-a600-e1fc26393de8.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/2ba6b606-5455-4cb6-979b-bfe52f305fc9.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/b4db5900-b90e-4cc3-b12b-6d17953d0079.jpg?im_w=720',
        preview: 'true'
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/64986466-734d-4c39-ab52-69f6b9c1059b.jpg?im_w=720',
        preview: 'false'
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/6c3932d1-484c-4953-b1ba-d4074f2e40e6.jpg?im_w=720',
        preview: 'false'
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ] }
    }, {});
  }
};
