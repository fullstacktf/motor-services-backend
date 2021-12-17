import {
    createUser,
    findUser,
    updateUser,
    destroyUser
} from '../services/user.service.js';
import bcrypt from 'bcrypt';
import fs from 'fs';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const getUser = async (req, res) => {
    const user_id = req.params.userID;
    findUser(user_id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: String(err) })); // quizas no es status 500
}

const addUser = async (req, res) => {
    const password = req.body.password_key;
    const variables = {
        password_key: bcrypt.hashSync(password, salt),
        ...req.body
    }

    createUser(variables)
        .then((data) => res.status(200).send("Usuario añadido correctamente"))
        .catch(err => res.status(500).json({ error: String(err) }));

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
        .catch(err => res.status(500).json({ error: String(err) }));
}

const deleteUser = async (req, res) => {
    const dni = req.params.userID;
    destroyUser(dni)
        .then(() => res.status(200).send("Usuario eliminado correctamente"))
        .catch(err => res.status(500).json({ error: String(err) }));
}

const uploadImage = async (req, res, next) => {
    //cambiar el nombre al archivo
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'Sube una foto.' });
    }
    const fileToCheck = process.cwd() +'/uploads/users/ultimo.jpg';
    try {
        if (fs.existsSync(fileToCheck)) {
            fs.rename(process.cwd() +'/uploads/users/ultimo.jpg', process.cwd() + `/uploads/users/${req.params.userID}.jpg`, function (err) { //solo archivos jpg
                if (err) console.log('ERROR: ' + err);
            });
        }
      } catch(err) {
        console.error(err)
      }

    return res.send({ message: 'Foto subida correctamente.', file });
}

export default {
    getUser,
    addUser,
    editUser,
    updateUser,
    deleteUser,
    uploadImage
}