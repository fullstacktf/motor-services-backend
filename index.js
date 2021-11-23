import { router as vehicleRouter } from './routes/vehicle.js';
import express from 'express';
import { execQuery } from './db/database.js';
const app = express();
const port = 3000;


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

let queryExec = '';
let queryUse = 'use pickauto;';
let data = {};
const bodyIsEmpty = (body) => Object.keys(body).length === 0;


app.post('/users', async (req, res) => { //when a user registers, is added to the database. Añadir el caso de si el usuario existe
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

app.get('/users', async (req, res) => {
  queryExec = queryUse + 'select * from User;';
  data = await execQuery(queryExec);
  res.json({
    users: data
  });
});

app.get('/rols', async (req, res) => {
  queryExec = queryUse + 'select * from Rol;';
  data = await execQuery(queryExec);
  res.json({
    rols: data
  });
});

app.get('/users/:userID', async (req, res) => {
  const id = req.params.userID;
  queryExec = queryUse + `select * from User where DNI='${id};'`;
  data = await execQuery(queryExec);
  if (data.length!==0){
  res.json({
    user: data
  });
} else {
  res.send("No existe ningún usuario con ese DNI");
}
});

app.delete('/users', async (req, res) => {
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


app.put('/users/:id', async (req, res) => {
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
      if (item[0] && item[2] ==="number"){
        putArr.push(`${item[1]}=${item[0]},`);
      } else if(item[0] && item[2] ==="string"){
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

app.get('/users/pickers', async (req, res) => {
  queryExec = queryUse + `select * from User where rol=2;`;
  data = await execQuery(queryExec);
  res.json({
    msg: 'Solicitud exitosa',
    pickers: data[1]
  });
}); //get all users who are pickers.


app.get('/users/owners', async (req, res) => {
  queryExec = queryUse + `select * from User where rol=1;`;
  data = await execQuery(queryExec);
  res.json({
    msg: 'Solicitud exitosa',
    pickers: data[1]
  });
}); //get all users who are owners.

// app.get('/vehicle', async (req, res) => {
//   queryExec = `use pickauto; select * from Vehicle;`;
//   data = await execQuery(queryExec);
//   return res.json({
//     msg: 'Solicitud exitosa',
//     pickers: data[1]
//   });
// });

//VEHICLES ENDPOINTS

app.use('/me/vehicles',vehicleRouter);

app.get('/users/:userID/appointments?from=&to='); //get all dates from a specific date to specific date.
app.get('/users/:userID/appointments?status="Pendiente"'); //get all pending dates from a specific user.
///appointments/:userID/:vehicleID'
app.post('/vehicles/:vehicleID/appointments', async(req, res)=>{ //poner cita de un determinado vehiculo. Las de vehiculo no llevan user, pq se peude sacar.
  // si un usuario pone un id de un vehiculo que no es suyo no te deja. Funcion comprobar que el vehiculo es del usuario.
  console.log("entra");
  if (bodyIsEmpty(req.body)) {
    res.status(400).send('Envía algo en el body.');
  } else {
    const id_vehicle = req.params.vehicleID;
    const id_service = req.body.id_service;
    //const id_picker = searchPicker();
    const id_picker = req.body.id_picker;
    //const id_picker = req.body.id; //<-- el picker se le pone automaticamente, el que esté disponible
    //funcion obtener picker disponible, el primero que salga en la consulta. 
    const pick_up_place = req.body.pick_up_place;
    const pick_up_date = req.body.pick_up_date; 
    //const appointment_status = req.body.appointment_status; <-- lo cambia el picker
    //const appointment_request = req.body.appointment_request; <-- lo cambia el picker
    const notes = req.body.notes;
    const delivery_place = req.body.delivery_place;
    const garage = req.body.garage;
    queryExec = queryUse + `insert into Appointment(id_vehicle, id_service, id_picker, pick_up_place, pick_up_date, appointment_status, appointment_request, notes, delivery_place, garage) 
    VALUES('${id_vehicle}', ${id_service}, '${id_picker}', '${pick_up_place}', '${pick_up_date}', 'No recogido', 'Pendiente', '${notes}', '${delivery_place}', '${garage}');`;
    data = await execQuery(queryExec);
    res.json({
      appointments: data
    });
  };
}); //set an appointment to a specific user.


app.get('/users/:userID/appointments',async (req, res) => {
  //select * from Appointments where DNI = {req.params.userID}
  //queryExec = queryUse + `SELECT plate_number FROM Vehicle LEFT JOIN User ON Vehicle.id_owner = User.DNI WHERE id_owner = ${req.params.userID}`;
  const userId = req.params.userID;
  const fromDate = (req.query.from) ? new Date(req.query.from) : undefined;
  const toDate = (req.query.to) ? new Date(req.query.to) : undefined;
  const status = (req.query.status) ? (req.query.status) : undefined;
  //cambiar esto cuando pueda
  queryExec = queryUse + `SELECT id_appointment 
  FROM Appointment
  JOIN Vehicle ON (Vehicle.plate_number = Appointment.id_vehicle) 
  JOIN User ON (User.DNI = Vehicle.id_owner) WHERE id_owner = ${userId} AND User.id_rol=1;`; 
  data = await execQuery(queryExec);
  res.json({
    appointments: data
  });
}); //get all appointments from specific user.

app.get('/users/:userID/appointments/:appointmentID'); //get an specific appointment from an specific user.
app.put('/users/:userID/appointments/:appointmentID'); //picker updates information of a date. 
app.delete('/users/:userID/appointments/:appointmentID'); //to cancel an appointment.


app.get('/services', async (req, res) => {
  queryExec = queryUse + 'select * from Services;';
  data = await execQuery(queryExec);
  res.json({
    services: data
  });
 }); //get all services.

app.get('/services/:serviceID', async (req, res) => { 
  const service_id = req.params.serviceID;
  queryExec = queryUse + `select * from Services where id_service=${service_id};`;
  data = await execQuery(queryExec);
  if (data.length!==0){
    res.json({
      service: data
    });
  } else {
    res.send("No existe ningún servicio con ese ID");
  }
}); //get a specific service.


app.get('/users/:userID/appointments/:appointmentID/review'); //get a review of a past appointment, if it has it.
app.get('/users/:userID/reviews'); //get all reviews form an specific user, if it has it.
app.post('/users/:userID/appointments/:appointmentID/review'); //post a review to an specific appointment.
app.delete('/users/:userID/appointments/:appointmentID/review'); //remove a review of a specific appointment, if it has it.



app.get('/', (req, res) => {
  res.send('Hello! World')
});


app.listen(port, () => console.log(`Listening on port ${port}`));

