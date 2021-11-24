import {execQuery} from '../db/database.js' 

let data;

export class VehicleModel{

   async getVehicles(req, res){
        data = await execQuery(`SELECT * FROM Vehicle;`)
        return res.json({
            msg:'Solicitud exitosa',
            vehicle:data[0]
        })
    }

    async getVehiclesFromUser(req,res,id){

        data = await execQuery(`SELECT * FROM Vehicle Where id_owner=${id};`)
        return res.json({
            msg: 'Solicitud exitosa',
            vehicle: data
        })
    }

    async getVehicleById(req,res){
        const idUser = req.body.userId;
        const idVehicle = req.params.idVehicle;
        data = await execQuery(`Select * from Vehicle Where id_owner=${idUser} && plate_number LIKE '${idVehicle}'`)
        return res.json({
            msg: 'Solicitud exitosa',
            vehicle: data
        })
    }

    async addVehicle(req,res){
      const plate_number = req.body.plate_number;
      const id_owner = req.body.id_owner;
      const brand = req.body.brand;
      const model = req.body.model;
      const powered = req.body.powered;
      const kilometers = req.body.kilometers;
      const fuel = req.body.fuel;
      const vehicle_description = req.body.vehicle_description;
      const vehicle_image = req.body.vehicle_image;
      
      data = await execQuery(`INSERT INTO Vehicle (plate_number, id_owner, brand, model, powered, kilometers, fuel, vehicle_description, vehicle_image) VALUES ('${plate_number}', ${id_owner}, '${brand}', '${model}', ${powered}, ${kilometers}, '${fuel}', '${vehicle_description}', '${vehicle_image}')`)
      return res.json({
            msg: 'Vehiculo insertado correctamente',
            vehicle: data
        })

    }

    async updateVehicle(req,res){
        const idVehicle = req.params.idVehicle;
        let brand = req.body.brand;
        let model = req.body.model;
        let powered = req.body.powered;
        let kilometers = req.body.kilometers;
        let fuel = req.body.fuel;
        let vehicle_description = req.body.vehicle_description;
        let vehicle_image = req.body.vehicle_image;
        data = await execQuery(`Update Vehicle set brand='${brand}', model='${model}', powered='${powered}', kilometers=${kilometers}, fuel='${fuel}', vehicle_description='${vehicle_description}', vehicle_image='${vehicle_image}'
        WHERE plate_number LIKE '${idVehicle}';`)
        return res.json({
            msg: 'Vehiculo actualizado correctamente',
            vehicle: data
        })
    }

    async deleteVehicle(req, res) {
        const idVehicle = req.params.idVehicle;
        data = await execQuery(`DELETE FROM Vehicle Where plate_number LIKE '${idVehicle}'`)
        return res.json({
            msg: 'Vehiculo borrado correctamente',
            vehicle: data
        })
    }

};


