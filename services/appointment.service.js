import { AppointmentRepository } from '../repositories/appointment.repository.js';

const appointmentRepository = new AppointmentRepository();

export const findAppointmentsByUserID = (variables) => {
    return appointmentRepository.findByUserPk(variables);
}

export const findAppointmentsByPickerID = (variables) => {
    return appointmentRepository.findByPickerPk(variables);
}

export const createAppointment = (variables) => {
    const committedRegs = appointmentRepository.searchIfvehicleCommitted(variables.vehicleID); //si me peta es pq me falta await
    const plateDateRegs = appointmentRepository.searchPlateDateUnique(variables.vehicleID); //buscar que el vehiculo no tenga citas ese mismo dia, una cita por dia
    if (committedRegs.length == 0) {
        return appointmentRepository.create(variables);
    } else { //vehiculo todavia tiene citas, preguntar este return
        return;
    }

}

export const updateAppointment = (variables) => { 
    return appointmentRepository.update(variables);
}

export const destroyAppointment = (variables) => {
    return appointmentRepository.destroy(variables);
}

export const findLastDateInDB = () => {
    return appointmentRepository.findLastDate();
}

export const findAvailablePickersInDB = (variables) => {
        return appointmentRepository.findAvailablePickers(variables);

}