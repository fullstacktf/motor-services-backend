import { createUser, 
    findUser, 
    updateUser,
    destroyUser 
} from '../services/user.service.js';


const getUser = async (req, res) => {
    const user_id = req.params.userID;
    findUser(user_id)
        .then(data => res.status(200).json(data))
        .catch(err => console.error(err))
}

const addUser = async (req, res) => {
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
        .catch(err => res.status(500).json(err));

}

const editUser = async (req, res) => {

    const variables = {
        dni: req.params.userID,
        email: req.body.email,
        password: req.body.password_key,
        city: req.body.city,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        birth_date: req.body.birth_date,
        profile_image: req.body.profile_image
    };
    updateUser(variables)
        .then((data) => res.status(200).send("Usuario actualizado correctamente"))
        .catch(err => res.status(500).json(err))
}

const deleteUser = async (req, res) => {
    const dni = req.params.userID;
    destroyUser(dni)
        .then(() => res.status(200).send("Usuario eliminado correctamente"))
        .catch(err => res.status(500).json(err));
}

export default {
    getUser,
    addUser,
    editUser,
    updateUser,
    deleteUser
}