import { execQuery } from '../database/database.js';

let data = '';
let queryExec = '';

export class VehicleRepository {
    findVehiclesByOwner = async(id_owner) => {
        queryExec = `SELECT * FROM Vehicle Where id_owner=${id_owner};`;
        data = await execQuery(queryExec);
        return data;
    }

    findVehicleByPk = async(id_vehicle) =>{
        queryExec  = `SELECT * FROM Vehicle Where plate_number='${id_vehicle}'`;
        data = await execQuery(queryExec);
        return data;
    }

    create = async (variables) =>{
        console.log("repo");
        queryExec = `INSERT INTO Vehicle (plate_number, id_owner, brand, model, powered, kilometers, fuel, vehicle_description, vehicle_image) VALUES ('${variables.plate_number}', ${variables.id_owner}, '${variables.brand}', '${variables.model}', ${variables.powered}, ${variables.kilometers}, '${variables.fuel}', '${variables.vehicle_description}', '${variables.vehicle_image}')`;
        data = await execQuery(queryExec);
        return data;

    }

    update = async (variables) => {
        queryExec = `UPDATE Vehicle SET brand='${variables.brand}', model='${variables.model}', powered='${variables.powered}', kilometers=${variables.kilometers}, fuel='${variables.fuel}', vehicle_description='${variables.vehicle_description}', vehicle_image='${variables.vehicle_image}'
        WHERE plate_number LIKE '${variables.plate_number}';`
        data = await execQuery(queryExec);
        return data;
    }

    destroy = async(id_vehicle) =>{
        queryExec = `DELETE FROM Vehicle Where plate_number LIKE '${id_vehicle}'`;
        data = await execQuery(queryExec);
        return data;
    }

}