import {execQuery} from '../db/database.js' 

let data = {};
let queryExec = '';

export class ReviewModel{

    async getReviews(req,res){
        const user_id = req.params.userID;
        queryExec = `select * from Rating r join Appointment a using(id_appointment) join Vehicle v on a.id_vehicle = v.plate_number where id_owner=${user_id};`;
        data = await execQuery(queryExec);
        if (data.length!==0){
            res.json({
            reviews: data
            });
        } else {
            res.send("No existe ningún servicio con ese ID");
        }
    };

    async getReviewByID(req,res){
        const user_id = req.params.userID;
        const appointment_id = req.params.appointmentID;
        queryExec = `select * from Rating r join Appointment a using(id_appointment) join Vehicle v on a.id_vehicle = v.plate_number where id_owner=${user_id} and id_appointment=${appointment_id};`;
        data = await execQuery(queryExec);
        if (data.length!==0){
            res.json({
            reviews: data
            });
        } else {
            res.send("No existe ningún servicio con ese ID");
        }
    };

    async getReviewByPicker(req,res){
        const picker_id = req.params.pickerID;
        queryExec = `select * from Rating r join Appointment a using(id_appointment) where id_picker=${picker_id};`;
        data = await execQuery(queryExec);
        if (data.length!==0){
            res.json({
            reviews: data
            });
        } else {
            res.send("No existe ningún servicio con ese ID");
        }
    };

    async addReview(req,res){
        if (bodyIsEmpty(req.body)) {
            res.status(400).send('Envía algo en el body.');
        } else {
            const appointment_id = req.params.appointmentID;
            const rating_notes = req.body.rating_notes;
            const rating = req.body.rating; 
            queryExec = `INSERT INTO Rating (id_appointment, rating_notes, rating) VALUES (${appointment_id}, '${rating_notes}', ${rating});`;
            data = await execQuery(queryExec);
            if (data && data.code === 'ER_DUP_ENTRY') {
                return res.send("Esta cita ya ha sido valorada");
            } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
                return res.send("Campo en el body no reconocido");
            }
            return res.send('Cita valorada correctamente');
        }
    };

    async deleteReview(req,res){
        if (bodyIsEmpty(req.body)) {
            res.status(400).send('Envía algo en el body .');
        } else {
            const appointment_id = req.params.appointmentID;
            queryExec =`DELETE FROM Rating where id_appointment=${appointment_id};`;
            data = await execQuery(queryExec);
            if (data && data.affectedRows === 0) {
                return res.send("Esa cita no tiene valoracion");
            } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
                return res.send("Campo en el body no reconocido");
            }
            res.send("Valoración eliminada correctamente");
        }
    };
}