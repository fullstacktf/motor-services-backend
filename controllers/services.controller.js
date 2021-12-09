import {findServices, findService} from '../services/services.service.js';

    const getServices = async (req, res) => {
        findServices()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    }
    const getService = async (req, res) => {
        const service_id = req.params.serviceID;
        findService(service_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    }

    export default {getServices, getService}