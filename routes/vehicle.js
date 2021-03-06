import express  from  'express';
export const router = express.Router();
import vehicleController from '../controllers/vehicle.controller.js';
import uploadUtils from '../uploadUtils/uploadImageVehicle.js';

router.get('/user/:userID', (req, res) => { 
    return vehicleController.getVehiclesFromUser(req, res)
})

router.get('/:userID/:idVehicle',(req, res)=>{
    return vehicleController.getVehicleById(req,res)
})

router.post('/:userID/',(req, res)=>{
  return vehicleController.addVehicle(req, res)
})


router.put('/:userID/:idVehicle',(req, res)=>{
  return vehicleController.editVehicle(req,res)
})

router.delete('/:userID/:idVehicle',(req, res)=>{
  return vehicleController.deleteVehicle(req,res)
})

router.post('/uploadImage/:vehicleID', uploadUtils.upload.single('dataFile'), (req, res, next) => {
  return vehicleController.uploadImage(req, res, next);
});


