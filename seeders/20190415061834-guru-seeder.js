'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Gurus', [{
        nama: 'John Doe',
        alamat: 'Jawa',
        pelajaran: 'Administrasi',
        kelas: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nama: 'Wahyu',
        alamat: 'Lampung',
        pelajaran: 'Pemrograman Web',
        kelas: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Gurus', null, {});
    
  }
};
