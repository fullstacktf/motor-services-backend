import { AppointmentRepository } from '../repositories/appointment.repository.js';

const appointmentRepository = new AppointmentRepository();

export const findAppointmentsByUserID = (variables) => {
    return appointmentRepository.findByUserPk(variables);
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

export const createAppointment = async (variables) => {
    const committedRegs = await appointmentRepository.findIfvehicleCommitted(variables.id_vehicle);
    const plateDateRegs = await appointmentRepository.findPlateDateUnique(variables.id_vehicle, variables.pick_up_date);
    if (committedRegs.length == 0 && plateDateRegs == 0) {
        return appointmentRepository.create(variables);
    } else { //vehiculo todavia tiene citas, preguntar este return
        console.error(" No puedes pedir citas para ese vehículo, o bien ya solicitaste una cita para ese día o bien tu vehículo está en una cita en curso");
        return;
    }
}

export const updateAppointment = (variables) => {
    return appointmentRepository.update(variables);
}

export const destroyAppointment = (variables) => {
    return appointmentRepository.destroy(variables);
}