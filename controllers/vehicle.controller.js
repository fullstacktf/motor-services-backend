import {
    findVehicles,
    findVehicle,
    createVehicle,
    updateVehicle,
    destroyVehicle
} from '../services/vehicle.service.js';
import fs from 'fs';


const getVehiclesFromUser = async (req, res) => {
    const owner_id = req.params.userID;
    findVehicles(owner_id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(String(err)));

}

const getVehicleById = async (req, res) => {
    const vehicle_id = req.params.idVehicle;
    findVehicle(vehicle_id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(String(err)));
}


const addVehicle = async (req, res) => {
    const variables = {
        ...req.body
    };
    createVehicle(variables)
        .then(() => res.status(200).send("Vehiculo añadido correctamente"))
        .catch(err => res.status(500).json(String(err)));
}

const editVehicle = async (req, res) => {
    const variables = {
        plate_number: req.params.idVehicle,
        ...req.body
    };
    updateVehicle(variables)
        .then(() => res.status(200).send("Vehículo actualizado correctamente"))
        .catch(err => { res.status(500).json(String(err)) });
}

const deleteVehicle = async (req, res) => {
    const vehicle_id = req.params.idVehicle;
    destroyVehicle(vehicle_id)
        .then(() => res.send("Vehiculo eliminado correctamente"))
        .catch(err => res.status(500).json(String(err)));
}


const uploadImage = async (req, res, next) => {
    //cambiar el nombre al archivo
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'Sube una foto.' });
    }
    const fileToCheck = process.cwd() +'/uploads/vehicles/ultimo.jpg';
    try {
        if (fs.existsSync(fileToCheck)) {
            fs.rename(process.cwd() +'/uploads/vehicles/ultimo.jpg', process.cwd() + `/uploads/vehicles/${req.params.vehicleID}.jpg`, function (err) { //solo archivos jpg
                if (err) console.log('ERROR: ' + err);
            });
        }
      } catch(err) {
        console.error(err)
      }

    return res.send({ message: 'Foto subida correctamente.', file });
}

export default {
    getVehiclesFromUser,
    getVehicleById,
    addVehicle,
    editVehicle,
    deleteVehicle,
    uploadImage
}
