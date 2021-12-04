import { Vehicle } from '../models/vehicle.model.js';


export const findVehicles = (owner_id) => {
    return Vehicle.findAll({
        where: {
            id_owner: owner_id
        }
    });
}

export const findVehicle = (vehicle_id) => {
    return Vehicle.findByPk(vehicle_id);
}
/*
export const findVehicleAppointments = (req, res) => {
    Vehicle.findAll(
        {
            where: { id_owner: req.body.userID },
            include: {
                model: Appointment
            }
        })
}*/

export const createVehicle = (variables) => {  
    return Vehicle.create(variables);
}

export const updateVehicle = (variables, plate_number) => {
    return Vehicle.update(variables, {
        where: {
            plate_number: plate_number,
        }
    })
}

export const destroyVehicle = (vehicle_id) => {
    return Vehicle.destroy({
        where: {
            plate_number: vehicle_id
        }
    })
}