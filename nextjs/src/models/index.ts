// import { Model, BuildOptions } from 'sequelize';

// /* モデルの数作成する */
// interface PaymentModel extends Model {
//     readonly id: number;
//     charge_id: string;
//     payment_id: string;
//     readonly created_at: date;
//     readonly updated_at: date;
// }

// type PaymentModelStatic = typeof Model & {
//     new (values?: object, options?: BuildOptions): PaymentModel;
// }
// /* --------------- */

// interface DBModel {
//     payment: PaymentModelStatic;
// }

// declare const db: DBModel;
// export = db;

import {
  Sequelize,
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";

const env: string = process.env.NODE_ENV || 'development';

console.log(__dirname)

const config: any = require(__dirname + '/../../config/config.json')[env];
// import mysqlDialect 'sequelize/dialects/mysql'

// const sequelize = new Sequelize("mysql://root:password@localhost:3306/nodejs_db");

// console.log(config.db.database)

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect:'mysql',
  dialectModule: require('mysql2'),
});


class Payment extends Model
 {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public paymentId!: string;
  public chageId!: string;
  public paymentType!: string;

  public createdAt!: Date;
  public updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    paymentId: {
      field: 'payment_id',
      type: new DataTypes.STRING,
      allowNull: true,
    },
    chageId: {
      field: 'chage_id',
      type: new DataTypes.STRING,
      allowNull: true,
    },
    
    paymentType: {
      field: 'payment_type',
      type: new DataTypes.STRING,
      allowNull: true,
    },
    
    createdAt: {
      field: 'created_at',
      type: new DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: new DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    tableName: "payments",
    sequelize, 
  }
);
new Payment
async function getPayment(strPaymentId: string) {
  const instance = await Payment.findOne({ where: { paymentId: strPaymentId } })
  return instance
}

export { Payment, getPayment }