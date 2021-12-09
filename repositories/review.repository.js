import { execQuery } from '../database/database.js';


export class ReviewRepository {
    findByUserPk = async (user_id) => {
        const queryExec = `select id_review, notes, rating
        from Review r 
        join Appointment a on r.id_review = a.id_appointment 
        join Vehicle v on a.id_vehicle = v.plate_number 
        where id_owner=${user_id};`;
        const data = await execQuery(queryExec);
        return data;
    }

    findByAppointmentPk = async (appointment_id) => {
        const queryExec = `select * from Review where id_review=${appointment_id};`;
        const data = await execQuery(queryExec);
        return data;
    }

    findByPickerPk = async (picker_id) => {
        const queryExec = `select id_review, notes, rating from Review r 
        join Appointment a on r.id_review = a.id_appointment 
        where id_picker=${picker_id};`;
        const data = await execQuery(queryExec);
        return data
    }

    create = async (variables) => {
        const queryExec = `INSERT INTO Review (id_review, notes, rating) 
        VALUES ('${variables.id_appointment}' ,'${variables.notes}', ${variables.rating});`;
        const data = await execQuery(queryExec);
        return data;
    }

    destroy = async (appointment_id) => {
        const queryExec =`DELETE FROM Review where id_review='${appointment_id}';`;
        const data = await execQuery(queryExec);
        return data;
    }

    findAverageRatingByPickerPk = async (id_picker) =>{ // comprobar esto
        const queryExec = `SELECT AVG(rating)
        from Review r join Appointment a on r.id_review = a.id_appointment where id_picker=${id_picker};`
        const data = await execQuery(queryExec);
        return data;
    }

}


///calcular la media de las notas del picker con una query que te devuelva las notas de un picker determinado y te calcule la media