import { execQuery } from '../database/database.js';


export class UserRepository {
    findByUserPk = async (user_id) => {
         const queryExec = `select * from User where DNI='${user_id};'`;
         const data = await execQuery(queryExec);
         return data;
    }

    create = async(variables) => {
        const queryExec = `insert into User(DNI, id_rol, password_key, email, city, first_name, last_name, phone_number, birth_date) 
        VALUES(${variables.DNI}, ${variables.id_rol}, '${variables.password_key}', '${variables.email}', '${variables.city}', '${variables.first_name}', '${variables.last_name}', ${variables.phone_number}, '${variables.birth_date}');`;
        const data = await execQuery(queryExec);
        return data;
    }

    update = async (variables) => {
        const queryExec = `UPDATE User 
        SET password_key='${variables.password_key}', email='${variables.email}', city='${variables.city}', first_name='${variables.first_name}', last_name='${variables.last_name}', phone_number=${variables.phone_number}, birth_date='${variables.birth_date}' WHERE DNI=${variables.dni};`;
        const data = await execQuery(queryExec);
        return data;
    }

    destroy = async (dni) => {
        const queryExec = `DELETE FROM User where DNI=${dni};`;
        const data = await execQuery(queryExec);
        return data;
    }
}