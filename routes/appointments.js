import express from 'express';
import { async } from 'regenerator-runtime';
import appointmentController from '../controllers/appointment.controller.js';
// import { isAuthenticated} from '../middleware/Authenticated.js';
const router = express.Router();



router.get('/owner/:userID', async (req, res) => {
    // /?
    return appointmentController.getOwnerAppointments(req, res); //hacer el join
})

router.get('/owner/:userID/filter', async (req,res) => {
    return appointmentController.filterOwnerAppointmentsByStatus(req, res);
})

router.get('/picker/:pickerID', async (req, res) => {
    return appointmentController.getPickerAppointments(req, res); // hacer el join
});

router.get('/availablePickers', async(req, res) => {
    return appointmentController.getAvailablePickers(req, res); 
});

router.get('/:userID/vehicle/:vehicleID', async (req, res) => {
    return appointmentController.getAppointmentByVehicleID(req, res);
});

router.get('/:userID/:appointmentID', async (req, res) => {
    return appointmentController.getAppointmentByID(req,res);
});

router.post('/:userID/vehicle/:vehicleID', async (req, res) => { 
    return appointmentController.addAppointment(req, res);
});

router.put('/:userID/:appointmentID', async (req, res) => {
    return appointmentController.editAppointment(req, res);
});

router.delete('/:userID/:appointmentID', async (req, res) => {
    return appointmentController.deleteAppointment(req, res);
});


export { router }