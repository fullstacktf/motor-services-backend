// import Model from 'sequelize'
import pkg from 'sequelize';
const {DataTypes, Model } = pkg;
import {sequelize} from '../database/database-sequelize.js'



export class Rol extends Model{
    static associate(models){
        Rol.belongsTo(_,{
        })
        Rol.hasMany(_,{_})
    }
}

Rol.init({
    id_rol:{
        primaryKey:true,
        allowNull: false,
        autoIncrement: true,
        type:DataTypes.INTEGER
    },
    rol:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'Rol',
    freezeTableName: true,
});