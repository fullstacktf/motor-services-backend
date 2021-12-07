import { VehicleRepository } from '../repositories/vehicle.repository.js';

const vehicleRepository = new VehicleRepository();

export const findVehicles = (owner_id) => {
    return vehicleRepository.findVehiclesByOwner(owner_id);
}

export const findVehicle = (vehicle_id) => {
    return vehicleRepository.findVehicleByPk(vehicle_id);
}

export const createVehicle = (variables) => {  
    return vehicleRepository.create(variables);
}

export const updateVehicle = (variables, plate_number) => {
    return vehicleRepository.update(variables);
}

export const destroyVehicle = (vehicle_id) => {
    return vehicleRepository.destroy(vehicle_id);
}