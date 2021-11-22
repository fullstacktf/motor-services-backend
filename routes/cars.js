import {pool} from '../db/database.js';
import express  from  'express'

var router = express.Router()
let query = ''

//Get all vehicles from expecific user
router.get('/users/:userID/vehicle',(req, res) => {
    const id = req.params.userID;
    try {
        query = `use pickauto; Select * from Vehicle Where id_owner= ${id}`
        pool.query(query)
            .then(vehicle => res.json(vehicle))
            .catch(err=>console.error(err))
    } catch (err) {
        console.error(err)
    }
  })

//Get especific vehicle
router.get('/users/:userID/vehicle/:idVehicle',(req, res) => {
    const idUser = req.params.userID;
    const idVehicle = req.params.idVehicle;

    try {
        query = `use pickauto; Select * from Vehicle Where id_owner= ${idUser} and plate_number= ${idVehicle}`
        pool.query(query)
            .then(vehicle => res.json(vehicle))
            .catch(err=> console.error(err))
    } catch (err) {
        console.log(err);
    }

})


//Create new vehicle
router.post('/users/:userID/vehicle',(req, res)=>{

    if(bodyIsEmpty(req.body)){
      res.status(400).send('Fallo al añadir el coche')
    }else{
      const plate_number = req.body.plate_number;
      const id_owner = req.body.id_owner;
      const brand = req.body.brand;
      const model = req.body.model;
      const powered = req.body.powered;
      const kilometers = req.body.kilometers;
      const fuel = req.body.fuel;
      const vehicle_description = req.body.vehicle_description;
      const vehicle_image = req.body.vehicle_image;
  
      try {
          query = `use pickauto; INSERT INTO Vehicle (plate_number, id_user, brand, model, powered, kilometers, fuel, vehicle_description, vehicle_image)
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

export {router};
