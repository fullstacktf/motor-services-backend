import { execQuery } from '../database/database.js';

let data = '';
let queryExec = '';

export class UserRepository {
    findByUserPk = async (user_id) => {
         queryExec = `select * from User where DNI='${user_id};'`;
         data = await execQuery(queryExec);
         return data;
    }

    create = async(variables) => {
        queryExec = `insert into User(DNI, id_rol, password_key, email, city, first_name, last_name, phone_number, birth_date, profile_image) VALUES(${variables.DNI}, ${variables.id_rol}, '${variables.password_key}', '${variables.email}', '${variables.city}', '${variables.first_name}', '${variables.last_name}', ${variables.phone_number}, '${variables.birth_date}', '${variables.profile_image}');`;
        data = await execQuery(queryExec);
        return data;
    }

    update = async (variables) => {
        queryExec = `UPDATE User SET password_key='${variables.password}', email='${variables.email}', city='${variables.city}', first_name='${variables.first_name}', last_name='${variables.last_name}', phone_number=${variables.phone_number}, birth_date='${variables.birth_date}', profile_image='${variables.profile_image}' WHERE DNI=${variables.dni};`;
        data = await execQuery(queryExec);
        return data;
    }

    destroy = async (dni) => {
        queryExec = `DELETE FROM User where DNI=${dni};`;
        data = await execQuery(queryExec);
        return data;
    }
}