import { execQuery } from '../database/database.js'

let data;
let queryExec = '';
const bodyIsEmpty = (body) => Object.keys(body).length === 0;

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
}