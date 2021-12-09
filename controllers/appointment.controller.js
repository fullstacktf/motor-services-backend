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
        .catch(err => res.status(500).json(String(err)));
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
        .catch(err => res.status(500).json(String(err)));
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
        .catch(err => res.status(500).json(String(err)));
}

const getAppointmentByID = async (req, res) => {
    const appointment_id = req.params.appointmentID;
    findAppointmentsByID(appointment_id)
    .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(String(err)));
}

const addAppointment = async (req, res) => {
    const variables = {
        id_vehicle: req.params.vehicleID,
        ...req.body
    }
    createAppointment(variables)
        .then(data => res.status(200).send("Cita insertada correctamente"))
        .catch(err => res.status(500).json({error: String(err)}));
}

const editAppointment = async (req, res) => { 
    const appointment = { 
        id_appointment: req.params.id,
        ...req.body
    };
    updateAppointment(appointment)
        .then(data => res.status(200).send("Cita modificada correctamente"))
        .catch(err => res.status(500).json({error: String(err)}));
}

const deleteAppointment = async (req, res) => {
    const appointment_id = req.params.appointmentID
    destroyAppointment(appointment_id)
        .then(data => res.status(200).send("Cita eliminada correctamente"))
        .catch(err => res.status(500).json({error: String(err)}));
}

const getAvailablePickers = async (req, res) => {
    const variables = {
        ...req.body
    }
    findAvailablePickersInDB(variables)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({error: String(err)}));
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