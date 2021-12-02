import { Vehicle } from '../models/vehicle.model.js'


export const findVehicles = (req, res) => {
    Vehicle.findAll({
        where: {
            id_owner: req.body.UserId
        }
    });
}

export const findVehicle = (req, res) => {
    Vehicle.findByPk(req.params.idVehicle);
}

export const findVehicleAppointments = (req, res) => {
    Vehicle.findAll(
        {
            where: { id_owner: req.body.userID },
            include: {
                model: Appointment
            }
        })
}

export const createVehicle = (req, res) => {
    Vehicle.create({
        plate_number: req.body.plate_number,
        id_owner: req.body.id_owner,
        brand: req.body.brand,
        model: req.body.model,
        powered: req.body.powered,
        kilometers: req.body.kilometers,
        fuel: req.body.fuel,
        vehicle_description: req.body.vehicle_description,
        vehicle_image: req.body.vehicle_image,
    })
}

export const updateVehicle = (req, res) => {

    Vehicle.update({
        brand: req.body.brand,
        model: req.body.model,
        powered: req.body.powered,
        kilometers: req.body.kilometers,
        fuel: req.body.fuel,
        vehicle_description: req.body.vehicle_description,
        vehicle_image: req.body.vehicle_image,
    }, {
        where: {
            plate_number: req.params.idVehicle,
        }
    })
}

export const destroyVehicle = (req, res) => {
    Vehicle.destroy({
        where: {
            plate_number: req.params.idVehicle
        }
    })
}