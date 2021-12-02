import express  from  'express'
export const router = express.Router()


import {VehicleController} from '../controller/vehicle.controller.js'
const vehicle = new VehicleController();


router.get('/', (req, res) => {
    return vehicle.getVehiclesFromUser(req, res)
})

router.get('/:idVehicle',(req, res)=>{
    return vehicle.getVehicleById(req,res)
})

router.get('/:idVehicle/appointments',(req, res)=>{
  return vehicle.getVehicleAppointment(req,res)
})


router.post('/add',(req, res)=>{
  return vehicle.addVehicle(req, res)
})


router.put('/update/:idVehicle',(req, res)=>{
  return vehicle.updateVehicle(req,res)
})

router.delete('/delete/:idVehicle',(req, res)=>{
  return vehicle.deleteVehicle(req,res)
})


