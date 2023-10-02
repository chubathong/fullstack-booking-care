'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [{
        email:'admin@gmail.com',
        password:'123456',
        firstName:'Phat',
        lastName:'Nguyen',
        address:'hcm',
        gender:1,
        typeRole:'ROLE',  
        keyRole:'R1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
