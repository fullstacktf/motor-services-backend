import { execQuery } from '../database/database.js'

let data;
let queryExec = '';
const bodyIsEmpty = (body) => Object.keys(body).length === 0;



export class AppointmentModel {

    async addAppointment(req, res) {
        if (bodyIsEmpty(req.body)) {
            res.status(400).send('Envía algo en el body.');
        } else {
            const id_vehicle = req.body.id_vehicle;
            const id_service = req.body.id_service;
            const pick_up_place = req.body.pick_up_place;
            const pick_up_date = req.body.pick_up_date;
            const owner_notes = req.body.owner_notes;
            const delivery_place = req.body.delivery_place;
            const garage = req.body.garage;
            queryExec = `insert into Appointment(id_vehicle, id_service, id_picker, pick_up_place, pick_up_date, appointment_status, appointment_request, owner_notes, picker_notes, delivery_place, garage) 
      VALUES('${id_vehicle}', ${id_service}, null, '${pick_up_place}', '${pick_up_date}', 'No recogido', 'Pendiente', '${owner_notes}', '', '${delivery_place}', '${garage}');`;
            data = await execQuery(queryExec);
            res.json({
                appointments: data
            });
        };
    }

    async getAppointment(req, res) {
        const id_appointment = req.params.appointmentID;
        queryExec = `select * from User where DNI='${id_appointment};'`;
        data = await execQuery(queryExec);
        if (data.length !== 0) {
            res.json({
                appointment: data
            });
        } else {
            res.send("No existe ninguna cita con ese identificador");
        }
    }

    async editAppointment(req, res) {
        if (bodyIsEmpty(req.body)) {
            res.status(400).send('Envía algo en el body.');
        } else {
            const id_vehicle = req.body.id_vehicle;
            const id_service = req.body.id_service;
            const id_picker = req.body.id_picker;
            const pick_up_place = req.body.pick_up_place;
            const pick_up_date = req.body.pick_up_date;
            const appointment_status = req.body.appointment_status;
            const appointment_request = req.body.appointment_request;
            const owner_notes = req.body.owner_notes;
            const delivery_place = req.body.delivery_place;
            const garage = req.body.garage;
            queryExec = `Update Appointment SET Appointment(id_vehicle, id_service, id_picker, pick_up_place, pick_up_date, appointment_status, appointment_request, owner_notes, picker_notes, delivery_place, garage) 
          VALUES(id_vehicle='${id_vehicle}', id_service=${id_service}, id_picker=${id_picker}, pick_up_place='${pick_up_place}', pick_up_date='${pick_up_date}', appointment_status='${appointment_status}', appointment_request='${appointment_request}', '${owner_notes}', '${picker_notes}', '${delivery_place}', '${garage}');`;
            data = await execQuery(queryExec);
            res.json({
                appointments: data
            });
        };
    }

    async removeAppointment(req, res) {
        const id_appointment = req.params.appointmentID;
        queryExec =`DELETE FROM Appointment where id_appointment=${id_appointment};`;
        data = await execQuery(queryExec);
        if (data && data.affectedRows === 0) {
            return res.send("La cita no existe, inserte otro id");
        } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
            return res.send("Campo en el body no reconocido");
        }
        res.send("Cita eliminada correctamente");
    }
}