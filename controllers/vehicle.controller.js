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
            ...req.body
        };
        createVehicle(variables)
            .then(() => res.status(200).send("Vehiculo añadido correctamente"))
            .catch(err =>res.status(500).json(String(err)));
    }

    const editVehicle = async (req, res) => {
        const variables = {
            plate_number: req.params.idVehicle,
            ...req.body
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
