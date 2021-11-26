import express from 'express';
const router = express.Router();
import {ServiceModel} from '../models/service.model.js';

const service = new ServiceModel();

router.get('/', async (req, res) => {
    return service.getServices(req, res);
}); //get all services.

router.get('/:serviceID', async (req, res) => {
    return service.getService(req, res);
}); //get a specific service.

export {router}