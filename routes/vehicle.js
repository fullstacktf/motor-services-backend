import express  from  'express'
export const router = express.Router()
import {VehicleModel} from '../models/vehicle.model.js'

const vehicle = new VehicleModel()

router.get('/', (req, res) => {
    const id = req.body.userId
    return vehicle.getVehiclesFromUser(req, res,id)
  
})

router.get('/:idVehicle',(req, res)=>{
    return vehicle.getVehicleById(req,res)
})

router.post('/add',(req, res)=>{
    return vehicle.addVehicle(req,res)
})


router.put('/update/:idVehicle',(req, res)=>{
  return vehicle.updateVehicle(req,res)
})

router.delete('/delete/:idVehicle',(req, res)=>{
  return vehicle.deleteVehicle(req,res)
})


