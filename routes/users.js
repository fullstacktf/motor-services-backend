import express from 'express';
import { execQuery } from '../db/database.js';
export const router = express.Router;

let queryExec = '';

let data = {};
const bodyIsEmpty = (body) => Object.keys(body).length === 0;

router.post('/users', async (req, res) => { //when a user registers, is added to the database. Añadir el caso de si el usuario existe
    if (bodyIsEmpty(req.body)) {
        res.status(400).send('Envía algo en el body.');
    } else {
        const dni = req.body.dni;
        const id_rol = req.body.id_rol;
        const email = req.body.email;
        const password = req.body.password_key;
        const city = req.body.city;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const phone_number = req.body.phone_number;
        const birth_date = req.body.birth_date;
        const profile_image = req.body.profile_image;
        queryExec = queryUse + `insert into User(DNI, id_rol, password_key, email, city, first_name, last_name, phone_number, birth_date, profile_image) VALUES(${dni}, ${id_rol}, '${password}', '${email}', '${city}', '${first_name}', '${last_name}', ${phone_number}, '${birth_date}', '${profile_image}');`;
        data = await execQuery(queryExec);
        if (data && data.code === 'ER_DUP_ENTRY') {
            return res.send("Usuario ya insertado");
        } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
            return res.send("Campo en el body no reconocido");
        }
        return res.send('Usuario añadido correctamente');
    }
});

router.get('/users', async (req, res) => {
    queryExec = queryUse + 'select * from User;';
    data = await execQuery(queryExec);
    res.json({
        users: data
    });
});

router.get('/users/rols', async (req, res) => {
    queryExec = queryUse + 'select * from Rol;';
    data = await execQuery(queryExec);
    res.json({
        rols: data
    });
});

router.get('/users/:userID', async (req, res) => {
    const id = req.params.userID;
    queryExec = queryUse + `select * from User where DNI='${id};'`;
    data = await execQuery(queryExec);
    if (data.length !== 0) {
        res.json({
            user: data
        });
    } else {
        res.send("No existe ningún usuario con ese DNI");
    }
});

router.delete('/users', async (req, res) => {
    if (bodyIsEmpty(req.body)) {
        res.status(400).send('Envía algo en el body .');
    } else {
        const id = req.body.dni;
        queryExec = queryUse + `DELETE FROM User where DNI=${id};`;
        data = await execQuery(queryExec);
        if (data && data.affectedRows === 0) {
            return res.send("El usuario no existe, inserte otro id");
        } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
            return res.send("Campo en el body no reconocido");
        }
        res.send("Usuario eliminado correctamente");
    }
}); //remove a specific user, if he/she wants to remove his/her account.


router.put('/users/:id', async (req, res) => {
    const dni = req.params.id;
    let putArr = [];
    let valuesInQuery = "";
    if (bodyIsEmpty(req.body)) {
        res.status(400).send('Envía algo en el body .');
    } else {
        let arrVarObj = {
            email: [req.body.email, "email", "string"],
            password: [req.body.password_key, "password_key", "string"],
            phone_number: [req.body.phone_number, "phone_number", "number"],
            birth_date: [req.body.birth_date, "birth_date", "string"],
            profile_image: [req.body.profile_image, "profile_image", "string"],
            city: [req.body.city, "city", "string"],
            first_name: [req.body.first_name, "first_name", "string"],
            last_name: [req.body.last_name, "last_name", "string"]
        };
        Object.values(arrVarObj).forEach(item => {
            if (item[0] && item[2] === "number") {
                putArr.push(`${item[1]}=${item[0]},`);
            } else if (item[0] && item[2] === "string") {
                putArr.push(`${item[1]}='${item[0]}',`);
            }
        });
        valuesInQuery = putArr.join(" ").slice(0, -1);
        queryExec = queryUse + `UPDATE User SET ${valuesInQuery} WHERE DNI=${dni};`;
        data = await execQuery(queryExec);
        if (data && data.affectedRows === 0) {
            return res.send("El usuario no existe, inserte otro id");
        }
        res.send("Usuario actualizado correctamente");
    }
}); //update data of a specific user, edit user profile.

router.get('/users/pickers', async (req, res) => {
    queryExec = queryUse + `select * from User where rol=2;`;
    data = await execQuery(queryExec);
    res.json({
        msg: 'Solicitud exitosa',
        pickers: data[1]
    });
}); //get all users who are pickers.


router.get('/users/owners', async (req, res) => {
    queryExec = queryUse + `select * from User where rol=1;`;
    data = await execQuery(queryExec);
    res.json({
        msg: 'Solicitud exitosa',
        pickers: data[1]
    });
}); //get all users who are owners.
