import { execQuery } from '../database/database.js';

let data = '';
let queryExec = '';
//ADAPTAR APPOINTMENT A LAS NUEVAS TABLAS, CON LATITUDE, LONGITUDE, ETC
export class AppointmentRepository {
    findByAppointmentPk = async (appointment_id) => {
        queryExec = `SELECT * 
        FROM Appointment
        WHERE id_appointment='${appointment_id}';`;
        data = await execQuery(queryExec);
        return data;
    }

    findByVehiclePk = async (variables) => {

        queryExec = `SELECT * 
        FROM Appointment 
        WHERE id_vehicle='${variables.vehicle_id}' AND appointment_request='${variables.request}' AND appointment_status='${variables.status}' 
        AND pick_up_date between '${variables.from}' AND '${variables.to}' 
        ORDER BY pick_up_date DESC;`;
        data = await execQuery(queryExec);
        return data;
    }

    findByUserPk = async (variables) => {
        queryExec = `SELECT *
        FROM Appointment 
        JOIN Vehicle ON (Vehicle.plate_number = Appointment.id_vehicle) 
        WHERE id_owner =${variables.user_id} AND appointment_request='${variables.request}'
        AND appointment_status='${variables.status}' AND pick_up_date between '${variables.from}' AND '${variables.to}' ORDER BY pick_up_date DESC;`;
        data = await execQuery(queryExec);
        return data;
    }

    findByPickerPk = async (variables) => {
        queryExec = `SELECT *
        FROM Appointment WHERE id_picker = ${variables.picker_id} AND appointment_request='${variables.request}' AND 
        appointment_status='${variables.status}' AND pick_up_date between '${variables.from}' AND '${variables.to}' ORDER BY pick_up_date DESC;`;
        data = await execQuery(queryExec);
        return data;
    }

    create = async (variables) => {
        queryExec = `INSERT INTO Appointment(id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, pick_up_date, pick_up_time, 
        appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, delivery_city, garage) 
        VALUES('${variables.id_vehicle}', ${variables.id_service}, null, ${variables.pick_up_latitude}, ${variables.pick_up_longitude}, '${variables.pick_up_city}', '${variables.pick_up_date}', '${variables.pick_up_time}', 
        'No recogido', 'Pendiente', '${variables.owner_notes}', '', ${variables.delivery_latitude}, ${variables.delivery_longitude}, '${variables.delivery_city}', '${variables.garage}');`;
        data = await execQuery(queryExec);
        return data;
    }

    update = async (variables) => {
        queryExec = `UPDATE Appointment 
        SET id_vehicle='${variables.id_vehicle}', id_service=${variables.id_service}, id_picker=${variables.id_picker}, 
        pick_up_longitude=${variables.pick_up_longitude}, pick_up_latitude=${variables.pick_up_latitude}, pick_up_city='${variables.pick_up_city}',
        pick_up_date='${variables.pick_up_date}', pick_up_time='${variables.pick_up_time}', appointment_status='${variables.appointment_status}', 
        appointment_request='${variables.appointment_request}', owner_notes ='${variables.owner_notes}', picker_notes='${variables.picker_notes}', 
        delivery_longitude=${variables.delivery_longitude}, delivery_latitude=${variables.delivery_latitude}, delivery_city='${variables.delivery_city}', garage='${variables.garage}' 
        WHERE id_appointment = ${variables.appointment_id};`;
        data = await execQuery(queryExec);
        return data;
    }

    destroy = async (id_appointment) => {
        queryExec = `DELETE FROM Appointment where id_appointment=${id_appointment};`;
        data = await execQuery(queryExec);
        return data;
    }

    findIfvehicleCommitted = async (id_vehicle) => {
        data = await execQuery(`SELECT pick_up_date 
        FROM Appointment 
        WHERE id_vehicle LIKE '${id_vehicle}' and appointment_status='Entregado' ORDER BY pick_up_date DESC limit 1;`);
        return data;
    }

    findPlateDateUnique = async (id_vehicle) => { // estaba por aqui
        data = await execQuery(`SELECT pick_up_date 
        FROM Appointment 
        WHERE id_vehicle LIKE '${id_vehicle}' and appointment_status='Entregado' ORDER BY pick_up_date DESC limit 1;`);
        return data;
    }

    findLastDate = async () => {
        data = await execQuery(`SELECT pick_up_date 
        FROM Appointment
        WHERE pick_up_date IN (SELECT max(pick_up_date) FROM Appointment);`);
        return data;
    }

    findAvailablePickers = async (variables) => {
        queryExec = `SELECT u.DNI, u.first_name, u.last_name
        FROM User AS u JOIN Picker as p ON u.DNI = p.id_picker JOIN Appointment as a ON a.id_picker = p.id_picker 
        WHERE city='${variables.pick_up_place}' and p.start_time <='${variables.pick_up_time}' and p.finish_time>='${variables.pick_up_time}';`;
        data = await execQuery(queryExec);
        return data;
    }
}