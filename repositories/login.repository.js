import { execQuery } from "../database/database.js";

let data = '';
let queryExec = '';

export default class LoginRepository {
    findUserByEmail = async (user_email) => {
        queryExec = `select * from User where email='${user_email}';`;
        data = await execQuery(queryExec);
        return data;
    }
}