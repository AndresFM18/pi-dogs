const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raza', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    nombre: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    altura:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    peso:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    age:{
      type: DataTypes.INTEGER,
      allowNull: false
    }

  },{timestamps:false});
};
