import { execQuery } from "../database/database.js";

export default class LoginRepository {
    findUserByEmail = async (user_email) => { //creo que debería estar en user
        const queryExec = `select * from User where email='${user_email}';`;
        const data = await execQuery(queryExec);
        return data;
    }

    create = async(variables) => {
        const queryExec = `insert into User(DNI, id_rol, password_key, email, city, first_name, last_name, phone_number, birth_date) 
        VALUES(${variables.DNI}, ${variables.id_rol}, '${variables.password_key}', '${variables.email}', '${variables.city}', '${variables.first_name}', '${variables.last_name}', ${variables.phone_number}, '${variables.birth_date}');`;
        const data = await execQuery(queryExec);
        return data;
    }

}