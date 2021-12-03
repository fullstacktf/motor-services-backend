
import {Appointment} from '../models/appointment.model.js'
import {Vehicle} from '../models/vehicle.model.js'


export class AppointmentController {

    getOwnerAppointments = async (req, res) => {
        const id = req.params.userID;
        const status = req.query.status;
        const request = req.query.request;

        if(status != '' && request != ''){
            Appointment.findAll(
                {
                where: {
                    appointment_status: status,
                    appointment_request: request,
                },
                include:{
                    model:Vehicle,
                    where: {
                        id_owner:id, 
                        },
                    }
                })
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))
        }
    }

    getPickerAppointments = async (req, res) => {
        const pickerID = req.params.pickerID;
        Appointment.findAll({
            where: {
                id_picker: pickerID,
            }
        })
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))

    }


}