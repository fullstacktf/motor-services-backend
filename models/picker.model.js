// import Model from 'sequelize'
import pkg from 'sequelize';
const {DataTypes, Model } = pkg;
import {sequelize} from '../database/database-sequelize.js'
import { User } from './services.model.js';


export class Picker extends Model{
    static associate(models){
        Picker.belongsTo(models.user,{
            as: 'User',
            foreignKey: 'DNI'
        });
    }
}

Picker.init({
    id_picker:{
        primaryKey:true,
        allowNull: false,
        type:DataTypes.INTEGER
    },
    start_time:{
        type:DataTypes.TIME
    },
    finish_time:{
        type:DataTypes.TIME
    },
    rating:{
        type:DataTypes.TINYINT
    }
},{
    sequelize,
    modelName: 'Picker',
    freezeTableName: true,
});