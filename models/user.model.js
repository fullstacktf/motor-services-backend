import { execQuery } from '../database/database.js';




// import Model from 'sequelize'
import pkg from 'sequelize';
const {DataTypes, Model } = pkg;
import {sequelize} from '../database/database-sequelize.js'

export class User extends Model {
    static associate(models){
        User.belongsTo(models.rol,{
            as:'rol',
            foreignKey:'id_rol'
        })

let data;
let queryExec = '';
const bodyIsEmpty = (body) => Object.keys(body).length === 0;
import bcrypt from 'bcrypt';
const saltRounds = 10;


export class UserModel {
    async getUsers(req, res) {
        queryExec = 'select * from User;';
        data = await execQuery(queryExec);
        res.json({
            users: data
        });
    }

    async addUser(req, res) {
        if (bodyIsEmpty(req.body)) {
            res.status(400).send('Envía algo en el body.');
        } else {
            const dni = req.body.DNI;
            const id_rol = req.body.id_rol;
            const email = req.body.email;
            const plainPassword = req.body.password_key;
            const city = req.body.city;
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const phone_number = req.body.phone_number;
            const birth_date = req.body.birth_date;
            const profile_image = req.body.profile_image;

            const salt = bcrypt.genSaltSync(saltRounds);
            const password = bcrypt.hashSync(plainPassword, salt);

            queryExec = `insert into User(DNI, id_rol, password_key, email, city, first_name, last_name, phone_number, birth_date, profile_image) VALUES(${dni}, ${id_rol}, '${password}', '${email}', '${city}', '${first_name}', '${last_name}', ${phone_number}, '${birth_date}', '${profile_image}');`;
            data = await execQuery(queryExec);
            if (data && data.code === 'ER_DUP_ENTRY') {
                return res.send("Usuario ya insertado");
            } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
                return res.send("Campo en el body no reconocido");
            }
            return res.send('Usuario añadido correctamente');
        }
    }
    async getRoles(req, res) {
        queryExec = 'select * from Rol;';
        data = await execQuery(queryExec);
        res.json({
            roles: data
        });
    }
    async getUser(req, res) {
        const id = req.params.userID;
        queryExec = `select * from User where DNI='${id};'`;
        data = await execQuery(queryExec);
        if (data.length !== 0) {
                console.log('The user name is: ', data[0].first_name); 
            res.json({
                user: data
            });
        } else {
            res.send("No existe ningún usuario con ese DNI");
        };
    }
    async deleteUser(req, res) {
        if (bodyIsEmpty(req.body)) {
            res.status(400).send('Envía algo en el body .');
        } else {
            const id = req.body.dni;
            queryExec = `DELETE FROM User where DNI=${id};`;
            data = await execQuery(queryExec);
            if (data && data.affectedRows === 0) {
                return res.send("El usuario no existe, inserte otro id");
            } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
                return res.send("Campo en el body no reconocido");
            }
            res.send("Usuario eliminado correctamente");
        }
    }
    async editUser(req, res) {
        const dni = req.params.id;
        if (bodyIsEmpty(req.body)) {
            res.status(400).send('Envía algo en el body .');
        } else {
            const email = req.body.email;
            const password = req.body.password_key;
            const phone_number = req.body.phone_number;
            const birth_date = req.body.birth_date;
            const profile_image = req.body.profile_image;
            const city = req.body.city;
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            queryExec = `UPDATE User SET password_key='${password}', email='${email}', city='${city}', first_name='${first_name}', last_name='${last_name}', phone_number=${phone_number}, birth_date='${birth_date}', profile_image='${profile_image}' WHERE DNI=${dni};`;
            data = await execQuery(queryExec);
        }
        if (data && data.affectedRows === 0) {
            return res.send("El usuario no existe, inserte otro id");
        }
        res.send("Usuario actualizado correctamente");
    }
    async getPickers(req, res){
        queryExec = `select * from User where id_rol=2;`;
        data = await execQuery(queryExec);
        res.json({
            pickers: data
        });

    }

}

User.init({ // hay que decirle que picker hereda de user
    DNI:{
        primaryKey:true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    id_rol:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    password_key:{
        allowNull: false,
        type: DataTypes.STRING
    },
    email:{
        allowNull: false,
        type: DataTypes.STRING
    },
    city:{
        allowNull: false,
        type: DataTypes.STRING
    },
    first_name:{
        allowNull: false,
        type:DataTypes.STRING
    },
    last_name:{
        allowNull: false,
        type:DataTypes.STRING
    },
    phone_number:{
        type:DataTypes.INTEGER
    },
    birth_date:{
        allowNull: false,
        type: DataTypes.DATE
    },
    profile_image:{
        type:DataTypes.STRING
    }

},{
    sequelize,
    modelName: 'User',
    freezeTableName: true,
});


// export class UserModel {
//     async getUsers(req, res) {
//         queryExec = 'select * from User;';
//         data = await execQuery(queryExec);
//         res.json({
//             users: data
//         });
//     }
//     async addUser(req, res) {
//         if (bodyIsEmpty(req.body)) {
//             res.status(400).send('Envía algo en el body.');
//         } else {
//             const dni = req.body.dni;
//             const id_rol = req.body.id_rol;
//             const email = req.body.email;
//             const password = req.body.password_key;
//             const city = req.body.city;
//             const first_name = req.body.first_name;
//             const last_name = req.body.last_name;
//             const phone_number = req.body.phone_number;
//             const birth_date = req.body.birth_date;
//             const profile_image = req.body.profile_image;
//             queryExec = `insert into User(DNI, id_rol, password_key, email, city, first_name, last_name, phone_number, birth_date, profile_image) VALUES(${dni}, ${id_rol}, '${password}', '${email}', '${city}', '${first_name}', '${last_name}', ${phone_number}, '${birth_date}', '${profile_image}');`;
//             data = await execQuery(queryExec);
//             if (data && data.code === 'ER_DUP_ENTRY') {
//                 return res.send("Usuario ya insertado");
//             } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
//                 return res.send("Campo en el body no reconocido");
//             }
//             return res.send('Usuario añadido correctamente');
//         }
//     }
//     async getRoles(req, res) {
//         queryExec = 'select * from Rol;';
//         data = await execQuery(queryExec);
//         res.json({
//             roles: data
//         });
//     }
//     async getUser(req, res) {
//         const id = req.params.userID;
//         queryExec = `select * from User where DNI='${id};'`;
//         data = await execQuery(queryExec);
//         if (data.length !== 0) {
//             res.json({
//                 user: data
//             });
//         } else {
//             res.send("No existe ningún usuario con ese DNI");
//         }
//     }
//     async deleteUser(req, res) {
//         if (bodyIsEmpty(req.body)) {
//             res.status(400).send('Envía algo en el body .');
//         } else {
//             const id = req.body.dni;
//             queryExec = `DELETE FROM User where DNI=${id};`;
//             data = await execQuery(queryExec);
//             if (data && data.affectedRows === 0) {
//                 return res.send("El usuario no existe, inserte otro id");
//             } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
//                 return res.send("Campo en el body no reconocido");
//             }
//             res.send("Usuario eliminado correctamente");
//         }
//     }
//     async editUser(req, res) {
//         const dni = req.params.id;
//         if (bodyIsEmpty(req.body)) {
//             res.status(400).send('Envía algo en el body .');
//         } else {
//             const email = req.body.email;
//             const password = req.body.password_key;
//             const phone_number = req.body.phone_number;
//             const birth_date = req.body.birth_date;
//             const profile_image = req.body.profile_image;
//             const city = req.body.city;
//             const first_name = req.body.first_name;
//             const last_name = req.body.last_name;
//             queryExec = `UPDATE User SET password_key='${password}', email='${email}', city='${city}', first_name='${first_name}', last_name='${last_name}', phone_number=${phone_number}, birth_date='${birth_date}', profile_image='${profile_image}' WHERE DNI=${dni};`;
//             data = await execQuery(queryExec);
//         }
//         if (data && data.affectedRows === 0) {
//             return res.send("El usuario no existe, inserte otro id");
//         }
//         res.send("Usuario actualizado correctamente");
//     }
//     async getPickers(req, res){
//         queryExec = `select * from User where id_rol=2;`;
//         data = await execQuery(queryExec);
//         res.json({
//             pickers: data
//         });
//     }
//     async getOwners(req, res){
//         queryExec = `select * from User where id_rol=1;`;
//         data = await execQuery(queryExec);
//         res.json({
//             owners: data
//         });
//     }
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
// }

        data = await execQuery(queryExec);
        res.json({
            appointments: data
        });
    }
    async getPickerAppointments(req, res){
        const pickerId = req.params.pickerID;
        const status = (req.query.status) ? (req.query.status) : undefined;
        const request = (req.query.request) ? (req.query.request) : undefined;
        let append = '';
        if (status && !request) {
            append = `AND appointment_status='Entregado' `;
        } else if (request && !status) {
            append = `AND appointment_request='Pendiente' `;
        } else if (request && status && status === 'No recogido') {
            append = `AND appointment_request='Aceptada' AND appointment_status='No recogido' `;
        } else if (request && status && status !== 'No recogido') {
            append = `AND appointment_request='Aceptada' AND appointment_status='${status}' `;
        }
        queryExec = `SELECT id_appointment, id_vehicle, id_service, id_picker, pick_up_date, pick_up_place, 
        appointment_status, appointment_request, owner_notes, picker_notes, delivery_place, garage
        FROM Appointment WHERE id_picker = ${pickerId} ${append}ORDER BY pick_up_date DESC;`;
        data = await execQuery(queryExec);
        res.json({
            appointments: data
        });
    }
}
