import { createUser, 
    findUser, 
    updateUser,
    destroyUser 
} from '../services/user.service.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const getUser = async (req, res) => {
    const user_id = req.params.userID;
    findUser(user_id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({error: String(err)})); // quizas no es status 500
}

const addUser = async (req, res) => {
    const password = req.body.password_key;
    const variables = {
        password_key: bcrypt.hashSync(password, salt),
        ...req.body
    }

    createUser(variables)
        .then((data) => res.status(200).send("Usuario añadido correctamente"))
        .catch(err => res.status(500).json({error: String(err)}));

}

const editUser = async (req, res) => {
    const password = req.body.password_key;
    const variables = {
        password: bcrypt.hashSync(password, salt),
        dni: req.params.userID,
        ...req.body
    };
    updateUser(variables)
        .then((data) => res.status(200).send("Usuario actualizado correctamente"))
        .catch(err => res.status(500).json({error: String(err)}));
}

const deleteUser = async (req, res) => {
    const dni = req.params.userID;
    destroyUser(dni)
        .then(() => res.status(200).send("Usuario eliminado correctamente"))
        .catch(err => res.status(500).json({error: String(err)}));
}

export default {
    getUser,
    addUser,
    editUser,
    updateUser,
    deleteUser
}