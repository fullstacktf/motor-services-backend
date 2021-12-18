import { execQuery } from '../database/database.js';


export class UserRepository {
    findByUserPk = async (user_id) => {
         const queryExec = `select * from User where DNI='${user_id};'`;
         const data = await execQuery(queryExec);
         return data;
    }


    update = async (variables) => {
        const queryExec = `UPDATE User 
        SET password_key='${variables.password_key}', email='${variables.email}', city='${variables.city}', first_name='${variables.first_name}', last_name='${variables.last_name}', phone_number=${variables.phone_number}, birth_date='${variables.birth_date}' 
        WHERE DNI=${variables.dni};`;
        const data = await execQuery(queryExec);
        return data;
    }

    destroy = async (dni) => {
        const queryExec = `DELETE FROM User where DNI=${dni};`;
        const data = await execQuery(queryExec);
        return data;
    }

    updatePicker = async(variables) => {
        const queryExec = `UPDATE Picker
        SET start_time='${variables.start_time}', finish_time='${variables.finish_time}'
        WHERE id_picker=${variables.pickerID};`
    }
}