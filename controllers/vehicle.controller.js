import { execQuery } from '../database/database.js'
import { Sequelize } from 'sequelize'
import { Vehicle } from '../models/vehicle.model.js'
import { Appointment } from '../models/appointment.model.js'
import { async } from 'regenerator-runtime'
import { findVehicles, findVehicle, findVehicleAppointments } from '../services/vehicle.service.js'


export class VehicleController {
    getVehiclesFromUser = async (req, res) => {
        findVehicles(req, res)
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))

    }

    getVehicleById = async (req, res) => {
        findVehicle(req, res)
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))
    }

    getVehicleAppointments = async (req, res) => {
        findVehicleAppointments(req, res)
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))
    }

    addVehicle = async (req, res) => {
        createVehicle(req, res)
            .then((data) => res.status(200).json(data))
            .catch(function (err) { console.log(err) })
    }

    upgradeVehicle = async (req, res) => {
        updateVehicle(req, res)
            .then((data) => res.status(200).json(data))
            .catch(function (err) { console.log(err) })
    }

    deleteVehicle = async (req, res) => {
        destroyVehicle(req, res)
            .then(() => res.send("Vehiculo eliminado Correctamente"))
            .catch((err) => { console.log(err) })
    }

}

