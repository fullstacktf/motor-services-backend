import {
    findAppointmentsByUserID,
    filterAppointmentsByStatus,
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
        console.log(data)
    return data;
}
 


const getOwnerAppointments = async (req, res) => {
    const variables = {
        user_id: req.params.userID,
        request: (req.query.request) ? (req.query.request) : 'Aceptada',
        fromDate: (req.query.from) ? (req.query.from) : '1970-01-01',
        toDate: (req.query.to) ? (req.query.to) : '2100-01-01'//await lastDatefunction()
    };
    //console.log(variables.toDate)
    if (variables.user_id==req.userDNI){
        findAppointmentsByUserID(variables)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    }else {res.status(403).json({error: "No tiene permisos"})}
}

const filterOwnerAppointmentsByStatus = async (req, res) => {
    const variables = {
        user_id: req.params.userID,
        status: (req.query.status) ? (req.query.status) : 'No recogido',
        request: (req.query.request) ? (req.query.request) : 'Aceptada',
        fromDate: (req.query.from) ? (req.query.from) : '1970-01-01',
        toDate: (req.query.to) ? (req.query.to) : await lastDatefunction()
    }
    if (variables.user_id==req.userDNI){
        filterAppointmentsByStatus(variables)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    }else {res.status(403).json({error: "No tiene permisos"})}
}

const getPickerAppointments = async (req, res) => {
    const variables = {
        picker_id: req.params.pickerID,
        request: (req.query.request) ? (req.query.request) : 'Aceptada',
        fromDate: (req.query.from) ? (req.query.from) : '1970-01-01', 
        toDate: (req.query.to) ? (req.query.to) : await lastDatefunction()
    }
    if (variables.picker_id==req.userDNI){
        findAppointmentsByPickerID(variables)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    }else {res.status(403).json({error: "No tiene permisos"})}
}

const getAppointmentByVehicleID = async (req, res) =>{
    const userID = req.params.userID;
    const variables = {
        vehicle_id: req.params.vehicleID,
        request: (req.query.request) ? (req.query.request) : 'Aceptada',
        fromDate: (req.query.from) ? (req.query.from) : '1970-01-01', 
        toDate: (req.query.to) ? (req.query.to) : await lastDatefunction()
    }
    if(userID==req.userDNI){
        findAppointmentsByVehicleID(variables)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    }else {res.status(403).json({error: "No tiene permisos"})}
}

const getAppointmentByID = async (req, res) => {
    const user_id = req.params.userID;
    const appointment_id = req.params.appointmentID;
    if (user_id==req.userDNI){
        findAppointmentsByID(appointment_id)
        .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    }else {res.status(403).json({error: "No tiene permisos"})}
}

const addAppointment = async (req, res) => {
    const userID = req.params.userID;
    const variables = {
        id_vehicle: req.params.vehicleID,
        ...req.body
    }
    if (userID==req.userDNI){
        createAppointment(variables)
            .then(data => res.status(200).send("Cita insertada correctamente"))
            .catch(err => res.status(500).json({error: String(err)}));
    }else {res.status(403).json({error: "No tiene permisos"})}
}

const editAppointment = async (req, res) => { 
    const userID = req.params.userID;
    const appointment = { 
        id_appointment: req.params.id,
        ...req.body
    };
    if (userID==req.userDNI){
        updateAppointment(appointment)
            .then(data => res.status(200).send("Cita modificada correctamente"))
            .catch(err => res.status(500).json({error: String(err)}));
    }else {res.status(403).json({error: "No tiene permisos"})}
}

const deleteAppointment = async (req, res) => {
    const user_id = req.params.userID;
    const appointment_id = req.params.appointmentID;
    if (user_id==req.userDNI){
        destroyAppointment(appointment_id)
            .then(data => res.status(200).send("Cita eliminada correctamente"))
            .catch(err => res.status(500).json({error: String(err)}));
    }else {res.status(403).json({error: "No tiene permisos"})}
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
    getAvailablePickers,
    filterOwnerAppointmentsByStatus
}