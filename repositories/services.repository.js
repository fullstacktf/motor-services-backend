import { execQuery } from '../database/database.js';

let data = '';
let queryExec = '';

export class ServicesRepository {
    findByPk = async(id_service) =>{
        queryExec = `select * from Services where id_service='${id_service}';`;
        data = await execQuery(queryExec);
        return data;
    }
    findAll = async() => {
        queryExec = `select * from Services;`;
        data = await execQuery(queryExec);
        return data;
    }
}
