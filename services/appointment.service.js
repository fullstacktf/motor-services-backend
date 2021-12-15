import { AppointmentRepository } from '../repositories/appointment.repository.js';

const appointmentRepository = new AppointmentRepository();

export const findAppointmentsByUserID = (variables) => {
    return appointmentRepository.findByUserPk(variables);
}

export const filterAppointmentsByStatus = (variables) => {
    return appointmentRepository.filterByStatus(variables);
}

export const findAppointmentsByPickerID = (variables) => {
    return appointmentRepository.findByPickerPk(variables);
}

export const findLastDateInDB = () => { // no sé si este va aquí
    return appointmentRepository.findLastDate();
}

export const findAvailablePickersInDB = (variables) => {
    return appointmentRepository.findAvailablePickers(variables);

}

export const findAppointmentsByVehicleID = (vehicle_id) => {
    return appointmentRepository.findByVehiclePk(vehicle_id);
}

export const findAppointmentsByID = (appointment_id) => {
    return appointmentRepository.findByAppointmentPk(appointment_id);
}

export const createAppointment = async (appointment) => {

    //los test se hacen en servicios
    const committedRegs = await appointmentRepository.findIfvehicleCommitted(appointment.id_vehicle);
    const plateDateRegs = await appointmentRepository.findPlateDateUnique(appointment.id_vehicle, appointment.pick_up_date);
    if (committedRegs.length == 0 && plateDateRegs == 0) {
        return appointmentRepository.create(appointment);
    } else { //vehiculo todavia tiene citas, preguntar este return
        console.error();
        throw new Error("No puedes pedir citas para ese vehículo, o bien ya solicitaste una cita para ese día o bien tu vehículo está en una cita en curso"); // comprobar esto
    }
}

export const updateAppointment = (variables) => {
    return appointmentRepository.update(variables);
}

export const destroyAppointment = (variables) => {
    return appointmentRepository.destroy(variables);
}

export const getCurrentDay = () => {
    let today = new Date();

    let dd = today.getDate();
    if(dd<10) {
        dd = '0'+dd;
    };
    let mm = today.getMonth();
    if(mm<10) {
        mm = '0'+mm;
    };
    const yyyy = today.getFullYear();
    today = yyyy+'-'+mm+'-'+'dd';
    return today

}