import { async } from 'regenerator-runtime';
import { execQuery } from '../database/database.js';

export class AppointmentRepository {
    findByAppointmentPk = async (appointment_id) => {
        const queryExec = `SELECT id_appointment, id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, 
        pick_up_date, pick_up_time, appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, 
        delivery_city, garage, id_owner, brand, model, first_name, service_type  
        FROM Appointment
        WHERE id_appointment='${appointment_id}';`;
        const data = await execQuery(queryExec);
        return data;
    }

    findByVehiclePk = async (variables) => {
        const queryExec = `SELECT id_appointment, id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, 
        pick_up_date, pick_up_time, appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, 
        delivery_city, garage, id_owner, brand, model, first_name, service_type 
        FROM Appointment a JOIN Vehicle v ON (a.id_vehicle = v.plate_number) JOIN User u ON (a.id_picker = u.DNI) 
        JOIN Services s USING (id_service) 
        WHERE id_vehicle='${variables.id_vehicle}' AND appointment_request='${variables.request}' AND pick_up_date BETWEEN '${variables.fromDate}' 
        AND '${variables.toDate}' 
        ORDER BY pick_up_date DESC;`;
        const data = await execQuery(queryExec);
        return data;
    }

    findByUserPk = async (variables) => {
        const queryExec = `SELECT id_appointment, id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, 
        pick_up_date, pick_up_time, appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, 
        delivery_city, garage, id_owner, brand, model, first_name, service_type 
        FROM Appointment a JOIN Vehicle v ON (a.id_vehicle = v.plate_number) JOIN User u ON (a.id_picker = u.DNI) 
        JOIN Services s USING (id_service) 
        WHERE id_owner='${variables.user_id}' AND appointment_request='${variables.request}' AND pick_up_date BETWEEN '${variables.fromDate}' 
        AND '${variables.toDate}' 
        ORDER BY pick_up_date DESC;`;
        const data = await execQuery(queryExec);
        
        return data; 
    }

    filterByStatus = async (variables) => {
        const queryExec = `SELECT id_appointment, id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, 
        pick_up_date, pick_up_time, appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, 
        delivery_city, garage, id_owner, brand, model, first_name, service_type 
        FROM Appointment 
        JOIN Vehicle ON (Vehicle.plate_number = Appointment.id_vehicle) 
        WHERE id_owner =${variables.user_id} AND appointment_request='${variables.request}'
        AND appointment_status='${variables.status}' AND pick_up_date between '${variables.fromDate}' AND '${variables.toDate}' ORDER BY pick_up_date DESC;`;
        const data = await execQuery(queryExec);
        return data;
    }

    filterByRequest = async (variables) => {
        console.log(variables.appointment_request, variables.id_picker);
        const queryExec = `SELECT id_appointment, id_service, pick_up_time, pick_up_date, service_type, id_picker, appointment_status 
        FROM Appointment JOIN Services USING (id_service)
        WHERE id_picker =${variables.id_picker} AND appointment_request='${variables.appointment_request}';`;
        const data = await execQuery(queryExec);
        return data;
    }

    findByPickerPk = async (variables) => {
        const queryExec = `SELECT id_appointment, id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, 
        pick_up_date, pick_up_time, appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, 
        delivery_city, garage, id_owner, brand, model, first_name, service_type 
        FROM Appointment a JOIN Vehicle v ON (a.id_vehicle = v.plate_number) JOIN User u ON (v.id_owner = u.DNI) 
        JOIN Services s USING (id_service) 
        WHERE id_picker='${variables.id_picker}' AND appointment_request='${variables.request}' AND pick_up_date BETWEEN '${variables.fromDate}' 
        AND '${variables.toDate}' 
        ORDER BY pick_up_date DESC;`;
        const data = await execQuery(queryExec);
        return data; 
    }

    create = async (variables) => {
        const queryExec = `INSERT INTO Appointment(id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, pick_up_date, pick_up_time, 
        appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, delivery_city, garage) 
        VALUES('${variables.id_vehicle}', ${variables.id_service}, null, ${variables.pick_up_latitude}, ${variables.pick_up_longitude}, '${variables.pick_up_city}', '${variables.pick_up_date}', '${variables.pick_up_time}', 
        'No recogido', 'Pendiente', '${variables.owner_notes}', '', ${variables.delivery_latitude}, ${variables.delivery_longitude}, '${variables.delivery_city}', '${variables.garage}');`;
        const data = await execQuery(queryExec);
        return data;
    }

    update = async (variables) => {
        const queryExec = `UPDATE Appointment 
        SET id_vehicle='${variables.id_vehicle}', id_service=${variables.id_service}, id_picker=${variables.id_picker}, 
        pick_up_longitude=${variables.pick_up_longitude}, pick_up_latitude=${variables.pick_up_latitude}, pick_up_city='${variables.pick_up_city}',
        pick_up_date='${variables.pick_up_date}', pick_up_time='${variables.pick_up_time}', appointment_status='${variables.appointment_status}', 
        appointment_request='${variables.appointment_request}', owner_notes ='${variables.owner_notes}', picker_notes='${variables.picker_notes}', 
        delivery_longitude=${variables.delivery_longitude}, delivery_latitude=${variables.delivery_latitude}, delivery_city='${variables.delivery_city}', garage='${variables.garage}' 
        WHERE id_appointment = ${variables.appointment_id};`;
        const data = await execQuery(queryExec);
        return data;
    }

    updateRequest =async (variables) => {
        
        const queryExec = `UPDATE Appointment SET appointment_request='${variables.appointment_request}' WHERE id_appointment=${variables.id_appointment};`;
        const data = await execQuery(queryExec);
        return data;
    }

    updateStatus = async (variables) => {
        console.log(variables);
        const queryExec = `UPDATE Appointment SET appointment_status='${variables.appointment_status}' WHERE id_appointment=${variables.id_appointment};`;
        const data = await execQuery(queryExec);
        return data;
    }

    destroy = async (id_appointment) => {
        const queryExec = `DELETE FROM Appointment where id_appointment=${id_appointment};`;
        const data = await execQuery(queryExec);
        return data;
    }

    findIfvehicleCommitted = async (id_vehicle) => {
        const queryExec = `SELECT pick_up_date 
        FROM Appointment 
        WHERE id_vehicle LIKE '${id_vehicle}' and appointment_status='Entregado' ORDER BY pick_up_date DESC limit 1;`;
        const data = await execQuery(queryExec);
        return data;
    }

    findPlateDateUnique = async (id_vehicle, pick_up_date) => { // estaba por aqui
        const queryExec = `SELECT pick_up_date 
        FROM Appointment 
        WHERE id_vehicle LIKE '${id_vehicle}' and pick_up_date='${pick_up_date}' ORDER BY pick_up_date DESC limit 1;`;
        const data = await execQuery(queryExec);
        return data;
    }

    findLastDate = async () => {
        const queryExec = `SELECT pick_up_date 
        FROM Appointment
        WHERE pick_up_date IN (SELECT max(pick_up_date) FROM Appointment);`
        const data = await execQuery(queryExec);
        return data;
    }

    findAvailablePickers = async (variables) => {
        const queryExec = `SELECT u.DNI, u.first_name, u.last_name
        FROM User AS u JOIN Picker as p ON u.DNI = p.id_picker JOIN Appointment as a ON a.id_picker = p.id_picker 
        WHERE city='${variables.pick_up_place}' and p.start_time <='${variables.pick_up_time}' and p.finish_time>='${variables.pick_up_time}';`;
        const data = await execQuery(queryExec);
        return data;
    }
}