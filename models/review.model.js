import {execQuery} from '../database/database.js' 

let data = {};
let queryExec = '';

export class ReviewModel{

    async getReviews(req,res){
        const user_id = req.params.userID;
        queryExec = `select * from Rating r join Appointment a using(id_vehicle, pick_up_date) join Vehicle v on a.id_vehicle = v.plate_number where id_owner=${user_id};`;
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
        const appointment_date = req.params.appointmentdate;
        const vehicleID = req.params.vehicleID;
        queryExec = `select * from Rating r join Appointment a using(id_vehicle, pick_up_date) join Vehicle v on a.id_vehicle = v.plate_number where id_owner=${user_id} and pick_up_date='${appointment_date}' and id_vehicle='${vehicleID}'';`;
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
        queryExec = `select * from Rating r join Appointment a using(id_vehicle, pick_up_date) where id_picker=${picker_id};`;
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
            const appointment_date = req.params.appointmentdate;
            const vehicleID = req.params.vehicleID;
            const rating_notes = req.body.rating_notes;
            const rating = req.body.rating; 
            queryExec = `INSERT INTO Rating (id_vehicle, pick_up_date, rating_notes, rating) VALUES ('${vehicleID}', '${appointment_date}', '${rating_notes}', ${rating});`;
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
            const vehicleID = req.params.vehicleID;
            const appointment_date = req.params.appointmentdate;
            queryExec =`DELETE FROM Rating where id_vehicle='${vehicleID}' and pick_up_date='${appointment_date}';`;
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