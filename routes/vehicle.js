import express  from  'express';
export const router = express.Router();


import vehicleController from '../controllers/vehicle.controller.js';


router.get('/user/:userID', (req, res) => { 
    return vehicleController.getVehiclesFromUser(req, res)
})

router.get('/:idVehicle',(req, res)=>{
    return vehicleController.getVehicleById(req,res)
})

router.post('/',(req, res)=>{
  return vehicleController.addVehicle(req, res)
})


router.put('/:idVehicle',(req, res)=>{
  return vehicleController.editVehicle(req,res)
})

router.delete('/:idVehicle',(req, res)=>{
  return vehicleController.deleteVehicle(req,res)
})


