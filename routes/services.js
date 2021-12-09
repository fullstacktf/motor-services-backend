import express from 'express';
const router = express.Router();
import serviceController from '../controllers/services.controller.js';


router.get('/', async (req, res) => {
    return serviceController.getServices(req, res);
}); 

router.get('/:serviceID', async (req, res) => {
    return serviceController.getService(req, res);
}); 

export {router}