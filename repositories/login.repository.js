import { execQuery } from "../database/database.js";

export default class LoginRepository {
    findUserByEmail = async (user_email) => { //creo que debería estar en user
        const queryExec = `select * from User where email='${user_email}';`;
        const data = await execQuery(queryExec);
        return data;
    }
}