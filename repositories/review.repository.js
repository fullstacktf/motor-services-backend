import { execQuery } from '../database/database.js';

let data = '';
let queryExec = '';

export class ReviewRepository {
    findByUserPk = async (user_id) => {
        queryExec = `select id_review, notes, rating from Review r join Appointment a on r.id_review = a.id_appointment join Vehicle v on a.id_vehicle = v.plate_number where id_owner=${user_id};`;
        data = await execQuery(queryExec);
        return data;
    }

    findByAppointmentPk = async (appointment_id) => {
        queryExec = `select * from Review where id_review=${appointment_id};`;
        data = await execQuery(queryExec);
        return data;
    }

    findByPickerPk = async (picker_id) => {
        queryExec = `select id_review, notes, rating from Review r join Appointment a on r.id_review = a.id_appointment where id_picker=${picker_id};`;
        data = await execQuery(queryExec);
        return data
    }

    create = async (variables) => {
        queryExec = `INSERT INTO Review (id_review, notes, rating) VALUES ('${variables.id_appointment}' ,'${variables.notes}', ${variables.rating});`;
        data = await execQuery(queryExec);
        return data;
    }

    destroy = async (appointment_id) => {
        queryExec =`DELETE FROM Review where id_review='${appointment_id}';`;
        data = await execQuery(queryExec);
        return data;
    }

    findAverageRatingByPickerPk = async (id_picker) =>{ // comprobar esto
        queryExec = `SELECT AVG(rating)
        from Review r join Appointment a on r.id_review = a.id_appointment where id_picker=${id_picker};`
        data = await execQuery(queryExec);
        return data;
    }

}


///calcular la media de las notas del picker con una query que te devuelva las notas de un picker determinado y te calcule la media