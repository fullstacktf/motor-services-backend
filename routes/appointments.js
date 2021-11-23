import express from 'express';
import { execQuery } from '../db/database.js';
const router = express.Router;



let queryExec = '';

let data = {};
const bodyIsEmpty = (body) => Object.keys(body).length === 0;

///appointments/:userID/:vehicleID'
router.post('/vehicles/:vehicleID/appointments', async (req, res) => {
    console.log(req.query.status);
    //limitar el numero de citas, buscar picker
    if (bodyIsEmpty(req.body)) {
        res.status(400).send('Envía algo en el body.');
    } else {
        const id_vehicle = req.params.vehicleID;
        const id_service = req.body.id_service;
        //const id_picker = searchPicker();
        const id_picker = req.body.id_picker;
        //const id_picker = req.body.id; //<-- el picker se le pone automaticamente, el que esté disponible
        //funcion obtener picker disponible, el primero que salga en la consulta. 
        const pick_up_place = req.body.pick_up_place;
        const pick_up_date = req.body.pick_up_date;
        //const appointment_status = req.body.appointment_status; <-- lo cambia el picker
        //const appointment_request = req.body.appointment_request; <-- lo cambia el picker
        //const picker_notes = req.body.picker_notes; <-- lo cambia el picker al finalizar la cita
        const owner_notes = req.body.owner_notes;
        const delivery_place = req.body.delivery_place;
        const garage = req.body.garage;
        queryExec = queryUse + `insert into Appointment(id_vehicle, id_service, id_picker, pick_up_place, pick_up_date, appointment_status, appointment_request, owner_notes, picker_notes, delivery_place, garage) 
      VALUES('${id_vehicle}', ${id_service}, '${id_picker}', '${pick_up_place}', '${pick_up_date}', 'No recogido', 'Pendiente', '${owner_notes}', '', '${delivery_place}', '${garage}');`;
        data = await execQuery(queryExec);
        res.json({
            appointments: data
        });
    };
}); //set an appointment to a specific user.

app.get('/users/:userID/appointments?status=Entregado'); //Citas pasadas
app.get('/users/:userID/appointments?request=Aceptada?status=No%20recogido');//Citas futuras, request: Aceptada
app.get('/users/:userID/appointments?request=Pendiente'); //citas pendientes de aceptar
app.get('/users/:userID/appointments?request=Aceptada?status!=No%20recogido');//Cita en curso, status distinto de no recogido

router.get('/users/:userID/appointments', async (req, res) => {
    console.log("entra");
    const userId = req.params.userID;
    const status = (req.query.status) ? (req.query.status) : undefined;
    const request = (req.query.request) ? (req.query.request) : undefined;
    let append = '';
    //refactorizar cuando pueda, construir string
    if (status && !request) {
        append = ` AND appointment_status='Entregado';`;
    } else if (request && !status) {
        append = ` AND appointment_request='Pendiente'`;
    } else if (request && status && status === 'No recogido') {
        append = ` AND appointment_request='Aceptada' AND appointment_status='No recogido'`;
    } else if (request && status && status !== 'No recogido') {
        append = ` AND appointment_request='Aceptada' AND appointment_status='${status}'`;
    }
    //https://stackoverflow.com/questions/1754411/how-to-select-date-from-datetime-column

    queryExec = queryUse + `SELECT id_appointment 
    FROM Appointment
    JOIN Vehicle ON (Vehicle.plate_number = Appointment.id_vehicle) 
    JOIN User ON (User.DNI = Vehicle.id_owner) WHERE id_owner = ${userId} AND User.id_rol=1${append};`;

    data = await execQuery(queryExec);
    res.json({
        appointments: data
    });
}); //get all appointments from specific user.

router.get('/appointments/:appointmentID', async (req, res) => {
    const id_appointment = req.params.appointmentID;
    queryExec = queryUse + `select * from User where DNI='${id_appointment};'`;
    data = await execQuery(queryExec);
    if (data.length !== 0) {
        res.json({
            appointment: data
        });
    } else {
        res.send("No existe ninguna cita con ese identificador");
    }
}); //get an specific appointment from an specific user.
router.put('/appointments/:appointmentID', async (req, res) => {
    //funcion comprobar que el usuario es user o picker

}); //picker updates information of a date. 
router.delete('/appointments/:appointmentID', async (req, res) => {
    const id_appointment = req.params.appointmentID;
    queryExec = queryUse + `DELETE FROM Appointment where id_appointment=${id_appointment};`;
    data = await execQuery(queryExec);
    if (data && data.affectedRows === 0) {
        return res.send("La cita no existe, inserte otro id");
    } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
        return res.send("Campo en el body no reconocido");
    }
    res.send("Cita eliminada correctamente");
}); //to cancel an appointment.

export {router}