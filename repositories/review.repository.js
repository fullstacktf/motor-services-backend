import { async } from 'regenerator-runtime';
import { execQuery } from '../database/database.js';


export class ReviewRepository {
    findByUserPk = async (user_id) => {
        const queryExec = `select id_review, notes, rating, id_vehicle, id_service, id_picker, pick_up_date, pick_up_time, 
        brand, model, first_name, service_type, id_owner
        from Review r 
        join Appointment a on r.id_review = a.id_appointment 
        join Vehicle v on a.id_vehicle = v.plate_number 
        join Services s using (id_service)
        join User u on a.id_picker = u.DNI
        where id_owner=${user_id};`;
        const data = await execQuery(queryExec);
        return data;
    }

    findByAppointmentPk = async (appointment_id) => {
        const queryExec = `select id_review, notes, rating, id_vehicle, id_service, id_picker, pick_up_date, pick_up_time, 
        brand, model, first_name, service_type
        from Review r 
        join Appointment a on r.id_review = a.id_appointment 
        join Vehicle v on a.id_vehicle = v.plate_number 
        join Services s using (id_service)
        join User u on a.id_picker = u.DNI
        where id_review=${appointment_id};`;
        const data = await execQuery(queryExec);
        return data;
    }

    findByPickerPk = async (picker_id) => {
        const queryExec = `select id_review, notes, rating, id_vehicle, id_service, id_picker, pick_up_date, pick_up_time, 
        brand, model, first_name, service_type
        from Review r 
        join Appointment a on r.id_review = a.id_appointment 
        join Vehicle v on a.id_vehicle = v.plate_number 
        join Services s using (id_service)
        join User u on a.id_picker = u.DNI
        where id_picker=${picker_id};`;
        const data = await execQuery(queryExec);
        return data
    }

    create = async (id_appointment) => {
        const queryExec = `INSERT INTO Review (id_review) 
        VALUES (${id_appointment});`;
        const data = await execQuery(queryExec);
        return data;
    }

    update = async (variables) => {
        const queryExec = `UPDATE Review 
        SET notes='${variables.notes}', rating=${variables.rating}
        WHERE id_review = ${variables.review_id};`;
        const data = await execQuery(queryExec);
        return data;
    }

    destroy = async (appointment_id) => {
        const queryExec =`DELETE FROM Review where id_review=${appointment_id};`;
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