import { execQuery } from '../database/database.js';

let data = '';
let queryExec = '';

export class ReviewRepository {
    findByUserPk = async (user_id) => {
        queryExec = `select * from Review r join Appointment a using(id_vehicle, pick_up_date) join Vehicle v on a.id_vehicle = v.plate_number where id_owner=${user_id};`;
        data = await execQuery(queryExec);
        return data;
    }

    findByAppointmentPk = async (appointment_id) => {
        queryExec = `select * from Review where id_appointment=${appointment_id};`;
        data = await execQuery(queryExec);
        return data;
    }

    findByPickerPk = async (picker_id) => {
        queryExec = `select * from Review r join Appointment a using(id_vehicle, pick_up_date) where id_picker=${picker_id};`;
        data = await execQuery(queryExec);
        return data
    }

    create = async (variables) => {
        queryExec = `INSERT INTO Review (id_vehicle, pick_up_date, rating_notes, rating) VALUES ('${variables.vehicleID}', '${variables.appointment_date}', '${variables.rating_notes}', ${variables.rating});`;
        data = await execQuery(queryExec);
        return data;
    }

    destroy = async (appointment_id) => {
        queryExec =`DELETE FROM Review where appointment_id='${appointment_id}';`;
        data = await execQuery(queryExec);
        return data;
    }
}