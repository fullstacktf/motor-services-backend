import {execQuery} from '../database/database.js' 
import {Sequelize} from 'sequelize'
import {Vehicle} from '../models/vehicle.model.js'
import {Appointment} from '../models/appointment.model.js'
import { async } from 'regenerator-runtime'



export class VehicleController {

    
   getVehiclesFromUser = async (req, res) => {
       const id = req.body.userId
 
        Vehicle.findAll({where:{
            id_owner: id
        }})
        .then(data => res.status(200).json(data))
        .catch(err =>console.log(err))
    
    }

    getVehicleById = async (req, res) =>{
        Vehicle.findByPk(req.params.idVehicle)
            .then(data => res.status(200).json(data))
            .catch(err =>console.log(err))
    }

    getVehicleAppointment = async (req, res) => {
        const id = req.body.userID;
        Vehicle.findAll(
            {
            where: {id_owner:id},
            include:{
            model:Appointment
        }})
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
    }

    addVehicle = async (req, res)=>{
        const plate_number = req.body.plate_number;
        const id_owner = req.body.id_owner;
        const brand = req.body.brand;
        const model = req.body.model;
        const powered = req.body.powered;
        const kilometers = req.body.kilometers;
        const fuel = req.body.fuel;
        const vehicle_description = req.body.vehicle_description;
        const vehicle_image = req.body.vehicle_image;
        
        await Vehicle.create({
            plate_number: plate_number,
            id_owner: id_owner,
            brand: brand,
            model: model,
            powered: powered,
            kilometers: kilometers,
            fuel: fuel,
            vehicle_description: vehicle_description,
            vehicle_image: vehicle_image,
        })
        .then((data) => res.status(200).json(data))
        .catch(function(err) {console.log(err)})

    }

    updateVehicle = async (req, res) =>{
        const plate_number = req.params.idVehicle;
        const brand = req.body.brand;
        const model = req.body.model;
        const powered = req.body.powered;
        const kilometers = req.body.kilometers;
        const fuel = req.body.fuel;
        const vehicle_description = req.body.vehicle_description;
        const vehicle_image = req.body.vehicle_image;

        await Vehicle.update({    
            brand: brand,
            model: model,
            powered: powered,
            kilometers: kilometers,
            fuel: fuel,
            vehicle_description: vehicle_description,
            vehicle_image: vehicle_image,
        },{
            where:{
                plate_number: plate_number,
            }
        })
        .then((data) => res.status(200).json(data))
        .catch(function(err) {console.log(err)})
    }

    deleteVehicle = async (req, res) =>{
        await Vehicle.destroy({
            where:{
                plate_number: req.params.idVehicle
        }})
        .then(() => res.send("Vehiculo eliminado Correctamente"))
        .catch((err) => {console.log(err)})

    }

}

