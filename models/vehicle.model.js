// import Model from 'sequelize'
import pkg from 'sequelize';
const {DataTypes, Model } = pkg;
import {sequelize} from '../database/database-sequelize.js'
import {Appointment} from './appointment.model.js'



export class Vehicle extends Model{
    static associate(models){
        Vehicle.belongsTo(models.user,{ // ¿por que aqui models.user de esta manera?
            as:'user',
            foreignKey:'DNI' //esta foreign key que nombre hay que ponerle? el de vehicle o el de user
        });
        Vehicle.hasMany(Appointment,{foreignKey:'id_vehicle'}); // por que aqui appointment de esta manera??
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
        type:DataTypes.INTEGER
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







