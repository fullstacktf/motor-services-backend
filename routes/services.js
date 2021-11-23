import express from 'express';
import { execQuery } from '../db/database.js';
const router = express.Router();




let queryExec = '';

let data = {};
const bodyIsEmpty = (body) => Object.keys(body).length === 0;

router.get('/', async (req, res) => {
    queryExec = queryUse + 'select * from Services;';
    data = await execQuery(queryExec);
    res.json({
        services: data
    });
}); //get all services.

router.get('/:serviceID', async (req, res) => {
    const service_id = req.params.serviceID;
    queryExec = queryUse + `select * from Services where id_service=${service_id};`;
    data = await execQuery(queryExec);
    if (data.length !== 0) {
        res.json({
            service: data
        });
    } else {
        res.send("No existe ningún servicio con ese ID");
    }
}); //get a specific service.

export {router}