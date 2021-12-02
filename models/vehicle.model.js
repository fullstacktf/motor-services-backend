import {execQuery} from '../database/database.js' 

// import Model from 'sequelize'
import pkg from 'sequelize';
const {DataTypes, Model } = pkg;
import {sequelize} from '../database/database-sequelize.js'
import {Appointment} from './appointment.model.js'

let data;


export class Vehicle extends Model{
    static associate(models){
        Vehicle.belongsTo(models.user,{
            as:'user',
            foreignKey:'DNI'
        })
        Vehicle.hasMany(Appointment,{foreignKey:'id_vehicle'})
    }

}

Vehicle.init({
    plate_number:{
        primaryKey:true,
        allowNull: false,
        type:DataTypes.STRING
    },
    id_owner:{
        allowNull: false,
        type:DataTypes.STRING
    },
    brand:{
        type:DataTypes.STRING
    },
    model:{
        type:DataTypes.STRING
    },
    powered:{
        type:DataTypes.INTEGER
    },
    kilometers:{
        type:DataTypes.INTEGER
    },
    fuel:{
        type:DataTypes.STRING
    },
    vehicle_description:{
        type:DataTypes.STRING
    },
    vehicle_image:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'Vehicle',
    freezeTableName: true,
});







