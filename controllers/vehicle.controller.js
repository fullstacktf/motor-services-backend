import { execQuery } from '../database/database.js'
import { Sequelize } from 'sequelize'
import { Vehicle } from '../models/vehicle.model.js'
import { Appointment } from '../models/appointment.model.js'
import { async } from 'regenerator-runtime'
import { findVehicles, findVehicle, createVehicle, updateVehicle, destroyVehicle } from '../services/vehicle.service.js'


export class VehicleController {
    getVehiclesFromUser = async (req, res) => {
        const owner_id = req.body.owner_id;
        findVehicles(owner_id)
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))

    }

    getVehicleById = async (req, res) => {
        const vehicle_id = req.params.idVehicle;
        findVehicle(vehicle_id)
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))
    }
    /*
        getVehicleAppointments = async (req, res) => {
            findVehicleAppointments(req, res)
                .then(data => res.status(200).json(data))
                .catch(err => console.log(err))
        }*/

    addVehicle = async (req, res) => {
        const variables = {
            plate_number: req.body.plate_number,
            id_owner: req.body.id_owner,
            brand: req.body.brand,
            model: req.body.model,
            powered: req.body.powered,
            kilometers: req.body.kilometers,
            fuel: req.body.fuel,
            vehicle_description: req.body.vehicle_description,
            vehicle_image: req.body.vehicle_image
        };
        createVehicle(variables)
            .then((data) => res.status(200).send("Vehiculo añadido correctamente"))
            .catch(function (err) { console.log(err) });
    }

    upgradeVehicle = async (req, res) => {
        const plate_number = req.params.idVehicle;
        const variables = {
            brand: req.body.brand,
            model: req.body.model,
            powered: req.body.powered,
            kilometers: req.body.kilometers,
            fuel: req.body.fuel,
            vehicle_description: req.body.vehicle_description,
            vehicle_image: req.body.vehicle_image
        };
        updateVehicle(variables, plate_number)
            .then((data) => res.status(200).send("Vehículo actualizado correctamente"))
            .catch(function (err) { console.log(err) })
    }

    deleteVehicle = async (req, res) => {
        const vehicle_id = req.params.idVehicle;
        destroyVehicle(vehicle_id)
            .then(() => res.send("Vehiculo eliminado correctamente"))
            .catch((err) => { console.log(err) })
    }
}

