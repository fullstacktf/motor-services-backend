import { execQuery } from '../database/database.js'

let data;
let queryExec = '';
const bodyIsEmpty = (body) => Object.keys(body).length === 0;



export class AppointmentModel {

    async getAppointments(req,res){
        queryExec = 'select * from Appointment;';
        data = await execQuery(queryExec);
        res.json({
            appointments: data
        });
    }

    async addAppointment(req, res) {
        //si el estado del vehiculo es distinto de No recogido no te deja, de lo contrario si
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
            if (data && data.code === 'ER_DUP_ENTRY') {
                return res.send("Cita ya insertada");
            } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
                return res.send("Campo en el body no reconocido");
            }
            return res.send('Cita añadida correctamente');
        };
    }

    async getAppointment(req, res) {
        const id_appointment = req.params.appointmentID;
        queryExec = `select * from Appointment where id_appointment='${id_appointment};'`;
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
            const id_appointment = req.params.appointmentID;
            const id_service = req.body.id_service;
            const id_picker = req.body.id_picker;
            const id_vehicle = req.body.id_vehicle;
            const pick_up_place = req.body.pick_up_place;
            const pick_up_date = req.body.pick_up_date;
            const appointment_status = req.body.appointment_status;
            const appointment_request = req.body.appointment_request;
            const picker_notes = req.body.picker_notes;
            const owner_notes = req.body.owner_notes;
            const delivery_place = req.body.delivery_place;
            const garage = req.body.garage;
            queryExec = `UPDATE Appointment SET id_vehicle='${id_vehicle}', id_service=${id_service}, id_picker=${id_picker}, pick_up_place='${pick_up_place}', pick_up_date='${pick_up_date}', appointment_status='${appointment_status}', appointment_request='${appointment_request}', owner_notes ='${owner_notes}', picker_notes='${picker_notes}', delivery_place='${delivery_place}', garage='${garage}' WHERE id_appointment = ${id_appointment};`;
            data = await execQuery(queryExec);
            if (data && data.affectedRows === 0) {
                return res.send("La cita no existe, inserte otro id");
            }
            res.send("Cita actualizada correctamente");
        }
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

    async searchIfvehicleCommitted(req, res) {
        const idVehicle = req.params.idVehicle;
        //data = await execQuery(`SELECT id_appointment FROM Appointment Where plate_number LIKE '${idVehicle}' and appointment_status='Entregado' and pick_up_date < today;`);
        data = await execQuery(`SELECT id_appointment FROM Appointment Where plate_number LIKE '${idVehicle}' and appointment_status='Entregado' ORDER BY pick_up_date DESC limit 1;`)
        return res.json({
            msg: `Appointment status for vehicle ${idVehicle}`,
            status: data
        })
    }
}