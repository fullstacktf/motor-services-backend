import express from 'express';
import { execQuery } from '../db/database.js';
const router = express.Router();

let queryExec = '';

let data = {};
const bodyIsEmpty = (body) => Object.keys(body).length === 0;

router.post('/', async (req, res) => { //when a user registers, is added to the database. Añadir el caso de si el usuario existe
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

router.get('/', async (req, res) => {
    queryExec ='select * from User;';
    data = await execQuery(queryExec);
    res.json({
        users: data
    });
});

router.get('/rols', async (req, res) => {
    queryExec ='select * from Rol;';
    data = await execQuery(queryExec);
    res.json({
        rols: data
    });
});

router.get('/:userID', async (req, res) => {
    const id = req.params.userID;
    queryExec =`select * from User where DNI='${id};'`;
    data = await execQuery(queryExec);
    if (data.length !== 0) {
        res.json({
            user: data
        });
    } else {
        res.send("No existe ningún usuario con ese DNI");
    }
});

router.delete('/', async (req, res) => {
    if (bodyIsEmpty(req.body)) {
        res.status(400).send('Envía algo en el body .');
    } else {
        const id = req.body.dni;
        queryExec =`DELETE FROM User where DNI=${id};`;
        data = await execQuery(queryExec);
        if (data && data.affectedRows === 0) {
            return res.send("El usuario no existe, inserte otro id");
        } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
            return res.send("Campo en el body no reconocido");
        }
        res.send("Usuario eliminado correctamente");
    }
}); //remove a specific user, if he/she wants to remove his/her account.


router.put('/:id', async (req, res) => {
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
        queryExec =`UPDATE User SET ${valuesInQuery} WHERE DNI=${dni};`;
        data = await execQuery(queryExec);
        if (data && data.affectedRows === 0) {
            return res.send("El usuario no existe, inserte otro id");
        }
        res.send("Usuario actualizado correctamente");
    }
}); //update data of a specific user, edit user profile.

router.get('/pickers', async (req, res) => {
    queryExec =`select * from User where rol=2;`;
    data = await execQuery(queryExec);
    res.json({
        msg: 'Solicitud exitosa',
        pickers: data[1]
    });
}); //get all users who are pickers.


router.get('/owners', async (req, res) => {
    queryExec =`select * from User where rol=1;`;
    data = await execQuery(queryExec);
    res.json({
        msg: 'Solicitud exitosa',
        pickers: data[1]
    });
}); //get all users who are owners.

router.get('/:userID/appointments', async (req, res) => {
    console.log("entra");
    const userId = req.params.userID;
    const status = (req.query.status) ? (req.query.status) : undefined;
    const request = (req.query.request) ? (req.query.request) : undefined;
    let append = '';
    //refactorizar cuando pueda, construir string
    if (status && !request) {
        append = ` AND appointment_status='Entregado';`;
    } else if (request && !status) {
        append = ` AND appointment_request='Pendiente'`;
    } else if (request && status && status === 'No recogido') {
        append = ` AND appointment_request='Aceptada' AND appointment_status='No recogido'`;
    } else if (request && status && status !== 'No recogido') {
        append = ` AND appointment_request='Aceptada' AND appointment_status='${status}'`;
    }
    //https://stackoverflow.com/questions/1754411/how-to-select-date-from-datetime-column

    queryExec = queryUse + `SELECT id_appointment 
    FROM Appointment
    JOIN Vehicle ON (Vehicle.plate_number = Appointment.id_vehicle) 
    JOIN User ON (User.DNI = Vehicle.id_owner) WHERE id_owner = ${userId} AND User.id_rol=1${append};`;

    data = await execQuery(queryExec);
    res.json({
        appointments: data
    });
}); //get all appointments from specific user.

export {router};