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
            const pick_up_latitude = req.body.pick_up_latitude;
            const pick_up_longitude = req.body.pick_up_longitude;
            const pick_up_city =req.body.pick_up_city;
            const pick_up_date = req.body.pick_up_date;
            const pick_up_time = req.body.pick_up_time;
            const owner_notes = req.body.owner_notes;
            const delivery_latitude = req.body.delivery_latitude;
            const delivery_longitude = req.body.delivery_longitude;
            const delivery_city = req.body.delivery_city;
            const garage = req.body.garage;
            queryExec = `insert into Appointment(id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, pick_up_date, pick_up_time, appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, delivery_city, garage) 
            VALUES('${id_vehicle}', ${id_service}, null, ${pick_up_latitude}, ${pick_up_longitude}, '${pick_up_city}', '${pick_up_date}', '${pick_up_time}', 'No recogido', 'Pendiente', '${owner_notes}', '', ${delivery_latitude}, ${delivery_longitude}, '${delivery_city}', '${garage}');`;
            data = await execQuery(queryExec);
            if (data && data.code === 'ER_DUP_ENTRY') {
                return res.send("Cita ya insertada");
            } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
                return res.send("Campo en el body no reconocido");
            }
            return res.send('Cita añadida correctamente');
        };
    }

    async getAvailablePickers(req,res) {
        const appointment_date =req.body.pick_up_date;
        const owner_city = req.body.city
        queryExec = `select * from Picker p join User u on p.id_picker = u.DNI where city='${owner_city}'' and '${appointment_time}'' between p.start_time and p.finish_time;`;
        data = await execQuery(queryExec);
        if (data && data.code === 'ER_DUP_ENTRY') {
            return res.send("No hay pickers disponibles");
        } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
            return res.send("Campo en el body no reconocido");
        }
        return res.send('Pickers disponibles');
    }

    async getAppointmentByVehicle(req, res) {
        const id_vehicle = req.params.vehicleID;
        queryExec = `select * from Appointment where id_vehicle='${id_vehicle};'`;
        data = await execQuery(queryExec);
        if (data.length !== 0) {
            res.json({
                appointment: data
            });
        } else {
            res.send("No existe ninguna cita con ese identificador");
        }
    }

    async getSpecificAppointment(req, res) {
        const id_vehicle = req.params.vehicleID;
        const pick_up_date = req.params.appointment_date;
        queryExec = `select * from Appointment where id_vehicle='${id_vehicle}' and pick_up_date='${pick_up_date}';`;
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
            const id_service = req.body.id_service;
            const id_picker = req.body.id_picker;
            const id_vehicle = req.body.id_vehicle;
            const pick_up_latitude = req.body.pick_up_latitude;
            const pick_up_longitude = req.body.pick_up_longitude;
            const pick_up_city = req.body.pick_up_city;
            const pick_up_date = req.body.pick_up_date;
            const pick_up_time = req.body.pick_up_time;
            const appointment_status = req.body.appointment_status;
            const appointment_request = req.body.appointment_request;
            const picker_notes = req.body.picker_notes;
            const owner_notes = req.body.owner_notes;
            const delivery_latitude = req.body.delivery_latitude;
            const delivery_longitude = req.body.delivery_longitude;
            const delivery_city = req.body.delivery_city;
            const garage = req.body.garage;
            queryExec = `UPDATE Appointment SET id_vehicle='${id_vehicle}', id_service=${id_service}, id_picker=${id_picker}, pick_up_longitude='${pick_up_longitude}', pick_up_latitude='${pick_up_latitude}', pick_up_city='${pick_up_city}', pick_up_date='${pick_up_date}', pick_up_time='${pick_up_time}', appointment_status='${appointment_status}', appointment_request='${appointment_request}', owner_notes ='${owner_notes}', picker_notes='${picker_notes}', delivery_longitude='${delivery_longitude}', delivery_latitude='${delivery_latitude}', delivery_city='${delivery_city}' garage='${garage}' WHERE id_appointment = ${id_appointment};`;
            data = await execQuery(queryExec);
            if (data && data.affectedRows === 0) {
                return res.send("La cita no existe, inserte otro id");
            }
            res.send("Cita actualizada correctamente");
        }
    }

    async removeAppointment(req, res) {
        const id_vehicle = req.params.vehicleID;
        const appointment_date = req.params.appointment_date;
        queryExec =`DELETE FROM Appointment where id_vehicle=${id_vehicle} and pick_up_date=${appointment_date};`;
        data = await execQuery(queryExec);
        if (data && data.affectedRows === 0) {
            return res.send("La cita no existe, inserte otro id");
        } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
            return res.send("Campo en el body no reconocido");
        }
        res.send("Cita eliminada correctamente");
    }

    async getVehicleAppointmentsByDate(req, res) {
        const vehicleID = req.params.vehicleID;
        const first_date = req.body.first_date;
        const last_date = req.body.last_date;
        queryExec = `select * from Appointment where id_vehicle='${vehicleID}' and pick_up_date between '${first_date}'' and '${last_date}';`;
        data = await execQuery(queryExec);
        if (data.length !== 0) {
            res.json({
                appointment: data
            });
        } else {
            res.send("No existe ninguna cita en este rango.");
        }
    }

    async getAllAppointmentsByDate(req, res) {
        const first_date = req.body.first_date;
        const last_date = req.body.last_date;
        queryExec = `select * from Appointment where pick_up_date between '${first_date}' and '${last_date}';`;
        data = await execQuery(queryExec);
        if (data.length !== 0) {
            res.json({
                appointment: data
            });
        } else {
            res.send("No existe ninguna cita en este rango.");
        }
    }

    async searchIfvehicleCommitted(req, res) {
        const idVehicle = req.params.idVehicle;
        //data = await execQuery(`SELECT id_appointment FROM Appointment Where plate_number LIKE '${idVehicle}' and appointment_status='Entregado' and pick_up_date < today;`);
        data = await execQuery(`SELECT * FROM Appointment Where id_vehicle LIKE '${idVehicle}' and appointment_status='Entregado' ORDER BY pick_up_date DESC limit 1;`);
        return res.json({
            msg: `Appointment status for vehicle ${idVehicle}`,
            status: data
        })
    }
}