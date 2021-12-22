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
    //if (owner_id==req.userDNI){
        findVehicles(owner_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    //}else {res.status(403).json({error: "No tiene permisos"})}

}

const getVehicleById = async (req, res) => {
    const user_id =req.params.userID;
    const vehicle_id = req.params.idVehicle;
    //if (user_id==req.userDNI){
        findVehicle(vehicle_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    //}else {res.status(403).json({error: "No tiene permisos"})}
}

const addVehicle = async (req, res) => {
    const variables = {
        id_owner: req.params.userID,
        ...req.body
    };
    //if (variables.id_owner==req.userDNI){
        createVehicle(variables)
            .then(() => res.status(200).send("Vehiculo añadido correctamente"))
            .catch(err =>res.status(500).json(String(err)));
    //}else {res.status(403).json({error: "No tiene permisos"})}
}

const editVehicle = async (req, res) => {
    const user_id = req.params.userID;
    console.log(user_id, req.userDNI);
    const variables = {
        plate_number: req.params.idVehicle,
        ...req.body
    };
    //if (user_id==req.userDNI){
        updateVehicle(variables)
            .then(() => res.status(200).send("Vehículo actualizado correctamente"))
            .catch(err => {res.status(500).json(String(err))});
    //}else {res.status(403).json({error: "No tiene permisos"})}
}

const deleteVehicle = async (req, res) => {
    const user_id = req.params.userID;
    const vehicle_id = req.params.idVehicle;
    //if (user_id==req.userDNI){
        destroyVehicle(vehicle_id)
            .then(() => res.send("Vehiculo eliminado correctamente"))
            .catch(err => res.status(500).json(String(err)));
    //}else {res.status(403).json({error: "No tiene permisos"})}
}

const uploadImage = async (req, res, next) => {
    const userID = req.params.userID
    //if (userID==req.userDNI){
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
    //}else {res.status(403).json({error: "No tiene permisos"})}
}   

export default {
    getVehiclesFromUser,
    getVehicleById,
    addVehicle,
    editVehicle,
    deleteVehicle,
    uploadImage
}
