import {pool} from '../db/database.js';
import express  from  'express'

var router = express.Router()
let query = ''

//Get vehicles from expecific user
router.get('/users/:userID/vehicle'),(req, res) => {
    if(bodyIsEmpty(req.body)){
        res.status(400).send('Fallo al visualizar vehiculos')
    }else{
        try {
            query = `SELECT * FROM VEHICLES WHERE id_owner = ${req.body.id_owner}`
            pool.query(query)
                .then(vehicle => res.json(vehicle))
                .catch(err=>console.error(err))
        } catch (err) {
            console.error(err)
        }

    }
}

//Get especific vehicle
router.get('/users/:userID/vehicle/:idVehicle'),(req, res) => {

}


//Create new vehicle
router.post('/users/:userID/vehicle',(req, res)=>{

    if(bodyIsEmpty(req.body)){
      res.status(400).send('Fallo al añadir el coche')
    }else{
      const plate_number = req.body.params.plate_number;
      const id_owner = req.body.id_owner;
      const brand = req.params.brand;
      const model = req.params.model;
      const powered = req.params.powered;
      const kilometers = req.params.kilometers;
      const fuel = req.params.fuel;
      const vehicle_description = req.params.vehicle_description;
      const vehicle_image = req.params.vehicle_image;
  
      try {
          query = `INSERT INTO Vehicle (plate_number, id_user, brand, model, powered, kilometers, fuel, vehicle_description, vehicle_image)
            values(${plate_number}, ${id_owner}, ${brand}, ${model}, ${powered}, ${kilometers}, ${fuel}, ${vehicle_description}, ${vehicle_image})`
            pool.query(query)
                .then(vehicle =>{
                    res.send(`Vehiculo ${vehicle} insertado correctamente`)
                })
                .catch(err =>console.log(error))
      } catch (err) {
          console.log(err)
      }

    }
  });


// module.exports = router;
export {router}