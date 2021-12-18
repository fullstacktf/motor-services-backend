import { execQuery } from '../database/database.js';

export class ServicesRepository {
    findByPk = async(id_service) =>{
        const queryExec = `select * from Services where id_service='${id_service}';`;
        const data = await execQuery(queryExec);
        return data;
    }
    findAll = async() => {
        const queryExec = `select * from Services;`;
        const data = await execQuery(queryExec);
        return data;
    }
}
