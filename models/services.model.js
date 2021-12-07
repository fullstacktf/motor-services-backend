import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
import { sequelize } from '../database/database-sequelize.js'



export class Services extends Model {

};

Services.init({
    id_service: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    service_type: {
        allowNull: false,
        type: DataTypes.STRING
    },
    service_description: {
        allowNull: false,
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Services',
    freezeTableName: true,
});



/*
export class ServiceModel {
    async getServices(req, res){
        queryExec ='select * from Services;';
        data = await execQuery(queryExec);
        res.json({
            services: data
        });
    }
    async getService(req, res){
        const service_id = req.params.serviceID;
        queryExec =`select * from Services where id_service=${service_id};`;
        data = await execQuery(queryExec);
        if (data.length !== 0) {
            res.json({
                service: data
            });
        } else {
            res.send("No existe ningún servicio con ese ID");
        }
    }
}*/