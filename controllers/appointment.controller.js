import {
    findAppointmentsByUserID,
    findAppointmentsByPickerID,
    createAppointment,
    updateAppointment,
    destroyAppointment,
    findLastDateInDB,
    findAvailablePickersInDB
} from '../services/appointment.service.js';

    /*
        getVehicleAppointments = async (req, res) => {
            findVehicleAppointments(req, res)
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500).json(err))
        }*/
        
//getAppointmentByID


const getOwnerAppointments = async (req, res) => {
    const variables = {
        user_id: req.params.userID,
        status: (req.query.status) ? (req.query.status) : undefined,
        request: (req.query.request) ? (req.query.request) : undefined,
        from: (req.query.from) ? (req.query.from) : undefined, //pendiente
        to: (req.query.to) ? (req.query.to) : undefined
    }

    findAppointmentsByUserID(variables)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}

const getPickerAppointments = async (req, res) => {
    const variables = {
        picker_id: req.params.pickerID,
        status: (req.query.status) ? (req.query.status) : undefined,
        request: (req.query.request) ? (req.query.request) : undefined,
        from: (req.query.from) ? (req.query.from) : '1970-01-01', //pendiente
        to: (req.query.to) ? (req.query.to) : findLastDateInDB()
    }

    findAppointmentsByPickerID(variables)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}

const addAppointment = async (req, res) => {
    const variables = {
        id_vehicle: req.params.vehicleID,
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
        .then(data => res.status(200).json(data))
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
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}

const deleteAppointment = async (req, res) => {
    const appointment_id = req.params.appointmentID
    destroyAppointment(appointment_id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}

const getAvailablePickers = async (req, res) => {
    const variables = {
        appointment_time: req.body.pick_up_time,
        owner_city: req.body.city
    }
    findAvailablePickersInDB(variables)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}


export default { 
    getOwnerAppointments, 
    getPickerAppointments, 
    addAppointment, 
    editAppointment, 
    deleteAppointment, 
    getAvailablePickers
}