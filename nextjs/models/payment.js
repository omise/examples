'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment.init({
    payment_id: DataTypes.STRING,
    chage_id: DataTypes.STRING,
    payment_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payment',
    underscored: true,
  });
  return payment;
};