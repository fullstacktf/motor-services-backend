import {
    findVehicles,
    findVehicle,
    createVehicle,
    updateVehicle,
    destroyVehicle
} from '../services/vehicle.service.js';


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
            plate_number: req.body.plate_number,
            id_owner: req.body.id_owner,
            brand: req.body.brand,
            model: req.body.model,
            powered: req.body.powered,
            kilometers: req.body.kilometers,
            fuel: req.body.fuel,
            vehicle_description: req.body.vehicle_description,
            vehicle_image: req.body.vehicle_image
        };
        createVehicle(variables)
            .then(() => res.status(200).send("Vehiculo añadido correctamente"))
            .catch(err =>res.status(500).json(String(err)));
    }

    const editVehicle = async (req, res) => {
        const variables = {
            plate_number: req.params.idVehicle,
            brand: req.body.brand,
            model: req.body.model,
            powered: req.body.powered,
            kilometers: req.body.kilometers,
            fuel: req.body.fuel,
            vehicle_description: req.body.vehicle_description,
            vehicle_image: req.body.vehicle_image
        };
        updateVehicle(variables)
            .then(() => res.status(200).send("Vehículo actualizado correctamente"))
            .catch(err => {res.status(500).json(String(err))});
    }

    const deleteVehicle = async (req, res) => {
        const vehicle_id = req.params.idVehicle;
        destroyVehicle(vehicle_id)
            .then(() => res.send("Vehiculo eliminado correctamente"))
            .catch(err => res.status(500).json(String(err)));
    }



export default {
    getVehiclesFromUser,
    getVehicleById,
    addVehicle,
    editVehicle,
    deleteVehicle
}
