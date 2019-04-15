'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guru = sequelize.define('Guru', {
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    pelajaran: DataTypes.STRING,
    kelas: DataTypes.INTEGER
  }, {});
  Guru.associate = function(models) {
    // associations can be defined here
  };
  return Guru;
};