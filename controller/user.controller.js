
import {User} from '../models/user.model.js'


export class UserController {

    getUser = async (req, res) => {
        
        User.findByPk(req.params.userID)
            .then(data => res.status(200).json(data))
            .catch(err => console.error(err))
    }

    addUser = async (req,res) => {
        const dni = req.body.dni;
        const id_rol = req.body.id_rol;
        const password = req.body.password_key;
        const email = req.body.email;
        const city = req.body.city;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const phone_number = req.body.phone_number;
        const birth_date = req.body.birth_date;
        const profile_image = req.body.profile_image;

        await User.create({
            DNI: dni,
            id_rol: id_rol,
            password_key: password,
            email: email,
            city: city,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            birth_date: birth_date,
            profile_image: profile_image
        })
        .then((data) => res.status(200).json(data))
        .catch(err => console.log(err))
        
    }

    updateUser = async (req,res) => {

        const dni = req.params.userID;
        const id_rol = req.body.id_rol;
        const email = req.body.email;
        const password = req.body.password_key;
        const city = req.body.city;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const phone_number = req.body.phone_number;
        const birth_date = req.body.birth_date;
        const profile_image = req.body.profile_image;

        await User.update({
            id_rol: id_rol,
            email: email,
            password: password,
            city: city,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            birth_date: birth_date,
            profile_image: profile_image
        },{
            where:{
                DNI: dni,
            }
        })
        .then((data) => res.status(200).json(data))
        .catch(err => console.log(err))
    }

    deleteUser = async (req,res) => {
        await User.destroy({
            where: {
                dni: req.params.userID
            }
        })
        .then(()=> res.send("Usuario eliminado correctamente"))
        .catch(err => console.log(err))
    }


    getOwnerAppointments = async (req, res) =>{
        const dni = req.params.userID;
        const status = (req.query.status) ? (req.query.status) : undefined;
        const request = (req.query.request) ? (req.query.request) : undefined;

        Appointment.findAll()

    }
//     async getOwnerAppointments(req, res){
//         const userId = req.params.userID;
//         const status = (req.query.status) ? (req.query.status) : undefined;
//         const request = (req.query.request) ? (req.query.request) : undefined;
//         let append = '';
//         if (status && !request) {
//             append = `AND appointment_status='Entregado' `; //pasadas
//         } else if (request && !status) {
//             append = `AND appointment_request='Pendiente' `; // pendientes de aceptar
//         } else if (request && status && status === 'No recogido') {
//             append = `AND appointment_request='Aceptada' AND appointment_status='No recogido' `;//futuras
//         } else if (request && status && status !== 'No recogido') {
//             append = `AND appointment_request='Aceptada' AND appointment_status='${status}' `; // en curso
//         }
    
//         queryExec = `SELECT * FROM Appointment JOIN Vehicle ON (Vehicle.plate_number = Appointment.id_vehicle) WHERE id_owner =${userId} ${append}ORDER BY pick_up_date DESC;`;
    
//         data = await execQuery(queryExec);
//         res.json({
//             appointments: data
//         });
//     }
//     async getPickerAppointments(req, res){
//         const pickerId = req.params.pickerID;
//         const status = (req.query.status) ? (req.query.status) : undefined;
//         const request = (req.query.request) ? (req.query.request) : undefined;
//         let append = '';
//         if (status && !request) {
//             append = `AND appointment_status='Entregado' `;
//         } else if (request && !status) {
//             append = `AND appointment_request='Pendiente' `;
//         } else if (request && status && status === 'No recogido') {
//             append = `AND appointment_request='Aceptada' AND appointment_status='No recogido' `;
//         } else if (request && status && status !== 'No recogido') {
//             append = `AND appointment_request='Aceptada' AND appointment_status='${status}' `;
//         }
//         queryExec = `SELECT * FROM Appointment WHERE id_picker = ${pickerId} ${append}ORDER BY pick_up_date DESC;`;
//         data = await execQuery(queryExec);
//         res.json({
//             appointments: data
//         });
//     }



}
