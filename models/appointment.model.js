export class Appointment {
    constructor(params){
        this.id_appointment = params.id_appointment,
        this.id_vehicle = params.id_vehicle, 
        this.id_service = params.id_service, 
        this.id_picker = params.id_picker, 
        this.pick_up_latitude = params.pick_up_latitude, 
        this.pick_up_longitude = params.pick_up_longitude, 
        this.pick_up_city = params.pick_up_city, 
        this.pick_up_date = params.pick_up_date
    }
}

Appointment.init({
    id_appointment: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    id_vehicle: {
        allowNull: false,
        type: DataTypes.STRING
    },
    id_service: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    id_picker: {
        type: DataTypes.INTEGER
    },
    pick_up_latitude: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    pick_up_longitude: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    pick_up_city: {
        allowNull: false,
        type: DataTypes.STRING
    },
    pick_up_date: {
        allowNull: false,
        type: DataTypes.DATE
    },
    appointment_status: {
        allowNull: false,
        type: DataTypes.STRING
    },
    appointment_request: {
        allowNull: false,
        type: DataTypes.STRING
    },
    owner_notes: {
        type: DataTypes.STRING
    },
    picker_notes: {
        type: DataTypes.STRING
    },
    delivery_latitude: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    delivery_longitude: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    delivery_city: {
        allowNull: false,
        type: DataTypes.STRING
    },
    garage: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Appointment',
    freezeTableName: true,
})

//Appointment.belongsTo(Vehicle, { foreignKey: 'id_vehicle' })


export class AppointmentModel {
    

    async addAppointment(req, res) {
        //si el estado del vehiculo es distinto de No recogido no te deja, de lo contrario si
        if (bodyIsEmpty(req.body)) {
            res.status(400).send('Envía algo en el body.');
        } else {
            const id_vehicle = req.body.id_vehicle;
            const committedRegs = await this.searchIfvehicleCommitted(id_vehicle);
            if (committedRegs.length == 0){
                const id_service = req.body.id_service;
                const pick_up_latitude = req.body.pick_up_latitude;
                const pick_up_longitude = req.body.pick_up_longitude;
                const pick_up_city =req.body.pick_up_city;
                const pick_up_date = req.body.pick_up_date;
                const pick_up_time = req.body.pick_up_time;
                const owner_notes = req.body.owner_notes;
                const delivery_latitude = req.body.delivery_latitude;
                const delivery_longitude = req.body.delivery_longitude;
                const delivery_city = req.body.delivery_city;
                const garage = req.body.garage;
                queryExec = `insert into Appointment(id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, pick_up_date, pick_up_time, appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, delivery_city, garage) 
                VALUES('${id_vehicle}', ${id_service}, null, ${pick_up_latitude}, ${pick_up_longitude}, '${pick_up_city}', '${pick_up_date}', '${pick_up_time}', 'No recogido', 'Pendiente', '${owner_notes}', '', ${delivery_latitude}, ${delivery_longitude}, '${delivery_city}', '${garage}');`;
                data = await execQuery(queryExec);
                if (data && data.code === 'ER_DUP_ENTRY') {
                    return res.send("Cita ya insertada");
                } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
                    return res.send("Campo en el body no reconocido");
                }
                return res.send('Cita añadida correctamente');
            } else {
                return res.send('Este vehículo todavía tiene citas en curso, solicite la cita cuando el estado sea entregado');
            }
        }
    }


// export class AppointmentModel {

    // async addAppointment(req, res) {
    //     //si el estado del vehiculo es distinto de No recogido no te deja, de lo contrario si
    //     if (bodyIsEmpty(req.body)) {
    //         res.status(400).send('Envía algo en el body.');
    //     } else {
    //         const id_vehicle = req.body.id_vehicle;
    //         const committedRegs = await this.searchIfvehicleCommitted(id_vehicle);
    //         if (committedRegs.length == 0){
    //             const id_service = req.body.id_service;
    //             const pick_up_latitude = req.body.pick_up_latitude;
    //             const pick_up_longitude = req.body.pick_up_longitude;
    //             const pick_up_city =req.body.pick_up_city;
    //             const pick_up_date = req.body.pick_up_date;
    //             const pick_up_time = req.body.pick_up_time;
    //             const owner_notes = req.body.owner_notes;
    //             const delivery_latitude = req.body.delivery_latitude;
    //             const delivery_longitude = req.body.delivery_longitude;
    //             const delivery_city = req.body.delivery_city;
    //             const garage = req.body.garage;
    //             queryExec = `insert into Appointment(id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, pick_up_date, pick_up_time, appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, delivery_city, garage) 
    //             VALUES('${id_vehicle}', ${id_service}, null, ${pick_up_latitude}, ${pick_up_longitude}, '${pick_up_city}', '${pick_up_date}', '${pick_up_time}', 'No recogido', 'Pendiente', '${owner_notes}', '', ${delivery_latitude}, ${delivery_longitude}, '${delivery_city}', '${garage}');`;
    //             data = await execQuery(queryExec);
    //             if (data && data.code === 'ER_DUP_ENTRY') {
    //                 return res.send("Cita ya insertada");
    //             } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
    //                 return res.send("Campo en el body no reconocido");
    //             }
    //             return res.send('Cita añadida correctamente');
    //         } else {
    //             return res.send('Este vehículo todavía tiene citas en curso, solicite la cita cuando el estado sea entregado');
    //         }
    //     }
    // }

//     async getAppointment(req, res) {
//         const id_appointment = req.params.appointmentID;
//         queryExec = `select * from User where DNI='${id_appointment};'`;
//         data = await execQuery(queryExec);
//         if (data.length !== 0) {
//             res.json({
//                 appointment: data
//             });
//         } else {
//             res.send("No existe ninguna cita con ese identificador");
//         }
//     }

//     async editUserAppointment(req, res) {
//         if (bodyIsEmpty(req.body)) {
//             res.status(400).send('Envía algo en el body.');
//         } else {
//             const id_service = req.body.id_service;
//             const id_picker = req.body.id_picker;
//             const pick_up_place = req.body.pick_up_place;
//             const pick_up_date = req.body.pick_up_date;
//             const appointment_status = req.body.appointment_status;
//             const appointment_request = req.body.appointment_request;
//             const owner_notes = req.body.owner_notes;
//             const delivery_place = req.body.delivery_place;
//             const garage = req.body.garage;
//             queryExec = `Update Appointment SET Appointment( id_service, id_picker, pick_up_place, pick_up_date, appointment_status, appointment_request, owner_notes, picker_notes, delivery_place, garage) 
//           VALUES(id_service=${id_service}, id_picker=${id_picker}, pick_up_place='${pick_up_place}', pick_up_date='${pick_up_date}', appointment_status='${appointment_status}', appointment_request='${appointment_request}', '${owner_notes}', '${picker_notes}', '${delivery_place}', '${garage}');`;
//             data = await execQuery(queryExec);
//             res.json({
//                 appointments: data
//             });
//         };
//     }

//     async editPickerAppointment(req, res) {
//         if (bodyIsEmpty(req.body)) {
//             res.status(400).send('Envía algo en el body.');
//         } else {
//             const id_service = req.body.id_service;
//             const id_picker = req.body.id_picker;
//             const pick_up_place = req.body.pick_up_place;
//             const pick_up_date = req.body.pick_up_date;
//             const appointment_status = req.body.appointment_status;
//             const appointment_request = req.body.appointment_request;
//             const owner_notes = req.body.owner_notes;
//             const delivery_place = req.body.delivery_place;
//             const garage = req.body.garage;
//             queryExec = `Update Appointment SET Appointment( id_service, id_picker, pick_up_place, pick_up_date, appointment_status, appointment_request, owner_notes, picker_notes, delivery_place, garage) 
//           VALUES(id_service=${id_service}, id_picker=${id_picker}, pick_up_place='${pick_up_place}', pick_up_date='${pick_up_date}', appointment_status='${appointment_status}', appointment_request='${appointment_request}', '${owner_notes}', '${picker_notes}', '${delivery_place}', '${garage}');`;
//             data = await execQuery(queryExec);
//             res.json({
//                 appointments: data
//             });
//         };
//     }

//     async removeAppointment(req, res) {
//         const id_appointment = req.params.appointmentID;
//         queryExec =`DELETE FROM Appointment where id_appointment=${id_appointment};`;
//         data = await execQuery(queryExec);
//         if (data && data.affectedRows === 0) {
//             return res.send("La cita no existe, inserte otro id");
//         } else if (data && data.code === 'ER_BAD_FIELD_ERROR') {
//             return res.send("Campo en el body no reconocido");
//         }
//         res.send("Cita eliminada correctamente");
//     }
// }
// async searchIfvehicleCommitted(id_vehicle) {
//     //data = await execQuery(`SELECT id_appointment FROM Appointment Where plate_number LIKE '${idVehicle}' and appointment_status='Entregado' and pick_up_date < today;`);
//     data = await execQuery(`SELECT pick_up_date FROM Appointment Where id_vehicle LIKE '${id_vehicle}' and appointment_status='Entregado' ORDER BY pick_up_date DESC limit 1;`);
//     return data;
// }

    async searchIfvehicleCommitted(id_vehicle) {
        //data = await execQuery(`SELECT id_appointment FROM Appointment Where plate_number LIKE '${idVehicle}' and appointment_status='Entregado' and pick_up_date < today;`);
        data = await execQuery(`SELECT pick_up_date FROM Appointment Where id_vehicle LIKE '${id_vehicle}' and appointment_status='Entregado' ORDER BY pick_up_date DESC limit 1;`);
        return data;
    }
}

