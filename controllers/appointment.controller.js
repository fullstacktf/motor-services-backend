import {
    findAppointmentsByUserID,
    findAppointmentsByPickerID,
    createAppointment,
    updateAppointment,
    destroyAppointment,
    findLastDateInDB,
    findAppointmentsByVehicleID,
    findAppointmentsByID,
    findAvailablePickersInDB
} from '../services/appointment.service.js';


const lastDatefunction = async () => { //¿Esta función va bien aqui?
    const date = await findLastDateInDB();
    const data = JSON.stringify(date[0]
        .pick_up_date)
        .replace('"', '')
        .split("T")[0];
    return data;
}
 


const getOwnerAppointments = async (req, res) => {
    const variables = {
        user_id: req.params.userID,
        status: (req.query.status) ? (req.query.status) : 'No recogido',
        request: (req.query.request) ? (req.query.request) : 'Aceptada',
        from: (req.query.from) ? (req.query.from) : '1970-01-01',
        to: (req.query.to) ? (req.query.to) : await lastDatefunction()
    }
    findAppointmentsByUserID(variables)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}

const getPickerAppointments = async (req, res) => {
    const variables = {
        picker_id: req.params.pickerID,
        status: (req.query.status) ? (req.query.status) : 'No recogido',
        request: (req.query.request) ? (req.query.request) : 'Aceptada',
        from: (req.query.from) ? (req.query.from) : '1970-01-01', 
        to: (req.query.to) ? (req.query.to) : await lastDatefunction()
    }
    findAppointmentsByPickerID(variables)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}

const getAppointmentByVehicleID = async (req, res) =>{
    const variables = {
        vehicle_id: req.params.vehicleID,
        status: (req.query.status) ? (req.query.status) : 'No recogido',
        request: (req.query.request) ? (req.query.request) : 'Aceptada',
        from: (req.query.from) ? (req.query.from) : '1970-01-01', 
        to: (req.query.to) ? (req.query.to) : await lastDatefunction()
    }
    findAppointmentsByVehicleID(variables)
    .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}

const getAppointmentByID = async (req, res) => {
    const appointment_id = req.params.appointmentID;
    findAppointmentsByID(appointment_id)
    .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}

const addAppointment = async (req, res) => {
    const variables = {
        id_vehicle: req.params.vehicleID,
        id_service: req.body.id_service,
        pick_up_latitude: req.body.pick_up_latitude,
        pick_up_longitude: req.body.pick_up_longitude,
        pick_up_city: req.body.pick_up_city,
        pick_up_date: req.body.pick_up_date,
        pick_up_time: req.body.pick_up_time,
        owner_notes: req.body.owner_notes,
        delivery_latitude: req.body.delivery_latitude,
        delivery_longitude: req.body.delivery_longitude,
        delivery_city: req.body.delivery_city,
        garage: req.body.garage
    }
    createAppointment(variables)
        .then(data => res.status(200).send("Cita insertada correctamente"))
        .catch(err => res.status(500).json(err));
}

const editAppointment = async (req, res) => { //falta obtener los pickers disponibles
    const variables = {
        appointment_id: req.params.appointmentID,
        id_service: req.body.id_service,
        id_picker: req.body.id_picker,
        id_vehicle: req.body.id_vehicle,
        pick_up_latitude: req.body.pick_up_latitude,
        pick_up_longitude: req.body.pick_up_longitude,
        pick_up_city: req.body.pick_up_city,
        pick_up_date: req.body.pick_up_date,
        pick_up_time: req.body.pick_up_time,
        appointment_status: req.body.appointment_status,
        appointment_request: req.body.appointment_request,
        picker_notes: req.body.picker_notes,
        owner_notes: req.body.owner_notes,
        delivery_latitude: req.body.delivery_latitude,
        delivery_longitude: req.body.delivery_longitude,
        delivery_city: req.body.delivery_city,
        garage: req.body.garage
    }
    updateAppointment(variables)
        .then(data => res.status(200).send("Cita modificada correctamente"))
        .catch(err => res.status(500).json(err));
}

const deleteAppointment = async (req, res) => {
    const appointment_id = req.params.appointmentID
    destroyAppointment(appointment_id)
        .then(data => res.status(200).send("Cita eliminada correctamente"))
        .catch(err => res.status(500).json(err));
}

const getAvailablePickers = async (req, res) => {
    const variables = {
        pick_up_time: req.body.pick_up_time,
        pick_up_place: req.body.pick_up_place
    }
    findAvailablePickersInDB(variables)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}


export default { 
    getOwnerAppointments, 
    getPickerAppointments,
    getAppointmentByVehicleID,
    getAppointmentByID, 
    addAppointment, 
    editAppointment, 
    deleteAppointment, 
    getAvailablePickers
}