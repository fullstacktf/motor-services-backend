'use strict';

import DataTypes  from ('sequelize/types');

const { 
    Model
} = import('sequelize');


module.exports = (sequelize,DataTypes)=>{
    class Car extends Model {
        //Define relations with another tables here
        static associate (models){
            participation.belogTo(models.user,{
                as:'user',
                foreignKey:'id_owner'
            });
        }

    };

    car.init({
        plate_number:{
            allowNull: false,
            type:DataTypes.INTEGER,
        },
        id_owner:{
            allowNull:false,
            type:DataTypes.INTEGER,
        },
        brand:{
            type:DataTypes.STRING,
        },
        model:{
            type: DataTypes.STRING,
        },
        powered:{
            type:DataTypes.INTEGER,
        },
        kilometers:{
            defaultValue: 0,
            type:DataTypes.INTEGER,
        },
        fuel:{
            type: DataTypes.ENUM([
                'diesel', 'gasolina','híbrido', 'electrico', 'gas'
            ])
        }
            
    },{
        sequelize,
        modelName:'car'
    });
    return car;
};

