import { execQuery } from '../database/database.js';

let data = '';
let queryExec = '';

export class VehicleRepository {
    findVehiclesByOwner = async(id_owner) => {
        const queryExec = `SELECT * FROM Vehicle Where id_owner=${id_owner};`;
        const data = await execQuery(queryExec);
        return data;
    }

    findVehicleByPk = async(id_vehicle) =>{
        const queryExec  = `SELECT * FROM Vehicle Where plate_number='${id_vehicle}'`;
        const data = await execQuery(queryExec);
        return data;
    }

    create = async (variables) =>{
        queryExec = `INSERT INTO Vehicle (plate_number, id_owner, brand, model, powered, kilometers, fuel, vehicle_description) 
        VALUES ('${variables.plate_number}', ${variables.id_owner}, '${variables.brand}', '${variables.model}', ${variables.powered}, ${variables.kilometers}, '${variables.fuel}', '${variables.vehicle_description}')`;
        data = await execQuery(queryExec);
        return data;

    }

    update = async (variables) => {
        const queryExec = `UPDATE Vehicle SET brand='${variables.brand}', model='${variables.model}', powered='${variables.powered}', kilometers=${variables.kilometers}, fuel='${variables.fuel}', vehicle_description='${variables.vehicle_description}'
        WHERE plate_number LIKE '${variables.plate_number}';`
        const data = await execQuery(queryExec);
        return data;
    }

    destroy = async(id_vehicle) =>{
        const queryExec = `DELETE FROM Vehicle Where plate_number LIKE '${id_vehicle}'`;
        const data = await execQuery(queryExec);
        return data;
    }

}