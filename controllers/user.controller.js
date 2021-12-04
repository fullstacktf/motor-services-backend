import { User } from '../models/user.model.js';
import { createUser, findUser, updateUser, destroyUser } from '../services/user.service.js';
const bodyIsEmpty = (body) => Object.keys(body).length === 0;
export class UserController {

    getUser = async (req, res) => {
        const user_id = req.params.userID;
        findUser(user_id)
            .then(data => res.status(200).json(data))
            .catch(err => console.error(err))
    }

    addUser = async (req, res) => {
        const variables = {
            DNI: req.body.dni,
            id_rol: req.body.id_rol,
            password_key: req.body.password_key,
            email: req.body.email,
            city: req.body.city,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birth_date: req.body.birth_date,
            profile_image: req.body.profile_image
        }
        createUser(variables)
            .then((data) => res.status(200).send("Usuario añadido correctamente"))
            .catch(err => console.log(err)); //añadirle errores comunes

    }

    upgradeUser = async (req, res) => {
        const dni = req.params.userID;
        const variables = {
            id_rol: req.body.id_rol,
            email: req.body.email,
            password: req.body.password_key,
            city: req.body.city,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birth_date: req.body.birth_date,
            profile_image: req.body.profile_image
        };

        updateUser(variables, dni)
            .then((data) => res.status(200).send("Usuario actualizado correctamente"))
            .catch(err => console.log(err))
    }

    deleteUser = async (req, res) => {
        const dni = req.params.userID;
        destroyUser(dni)
            .then(() => res.send("Usuario eliminado correctamente"))
            .catch(err => console.log(err));
    }
}
