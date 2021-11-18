import express from 'express';
<<<<<<< HEAD
import { pool } from './db/database.js';
=======
//import bodyParser from 'body-parser';
import {pool} from './db/database.js';
>>>>>>> main
const app = express();
const port = 3000;


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
<<<<<<< HEAD
}));

const bodyIsEmpty = (body) => body === {};
=======
})); 

let users = [
  { 
    id: 0,
    name: 'Antonio',
    rol: 'picker'
  },
  {  
    id: 1,
    name: 'Domingo',
    rol: 'owner'
  }
];

let services = [
  {
    name:"Chapa y pintura",
    descripcion: "Conjunto o proceso de cambios superficiales del vehículo."
  },
  {
    name: "Electricidad",
    descripción: "La electricidad del automovil involucra partes y sistemas de vital importancia para el funcionamiento correcto de nuestro automóvil."
  }
];

const bodyIsEmpty = (body) =>  body === {};
>>>>>>> main
let query = '';


app.post('/users', (req, res) => { //when a user registers, is added to the database.
  if (bodyIsEmpty(req.body)) {
    res.status(400).send('Envía algo en el body.');
  } else {
    const dni = req.body.dni;
    const id_rol = req.body.id_rol; //mirar esto luego, para ver como se introduce el id_rol
    const email = req.body.email;
    const city = req.body.city;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const phone_number = req.body.phone_number;
    const birth_date = req.body.birth_date;
    const profile_image = req.body.profile_image;
    try { //mirar si todos estos campos son obligatorios o qué
      query = `INSERT INTO User (DNI, id_rol, password_key, email, city, first_name, last_name, phone_number, birth_date, profile_image)
  VALUES (${dni}, ${id_rol}, ${password}, ${email}, ${city}, ${first_name}, ${last_name}, ${phone_number}, ${birth_date}, ${profile_image});`;
      pool.query(query).then(user => {
<<<<<<< HEAD
        res.send("Usuario insertado correctamente");
=======
        res.send(`Usuario ${user} insertado correctamente`);
>>>>>>> main
      }).catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }
});

app.get('/users', (req, res) => {
  try {
<<<<<<< HEAD
    query = 'select * from User;'
=======
    query = 'use pickauto; select * from User;';
>>>>>>> main
    pool.query(query).then(users => {
      res.json(users);
    }).catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
});

<<<<<<< HEAD
app.get('/users/:userID', (req, res) => {
  const id = req.params.userID;
  try {
    query = `select * from User where user_id='${id}'`;
    pool.query(query).then(user => {
      res.json(user);
=======
app.get('/rols', (req, res) => {
  try {
    query = 'use pickauto; select * from Rol;';
    pool.query(query).then(users => {
      res.json(users);
>>>>>>> main
    }).catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
<<<<<<< HEAD
=======
});

app.get('/users/:userID', (req, res) => {
  const id = req.params.userID;
  try {
    query = `select * from User where user_id='${id}'`;
    pool.query(query).then(user => {
      res.json(user);
    }).catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
>>>>>>> main
});

app.delete('/users', (req, res) => {
  if (bodyIsEmpty(req.body)) {
    res.status(400).send('Envía algo en el body .');
  } else {
    const id = req.body.id;
    const user = users.find(user => user.id === parseInt(id));
    if (user) {
      users = users.filter(user => user.id !== parseInt(id));
      res.send(users);
    } else {
      res.status(400).send("Error no existe el usuario")
    }
  }
}); //remove a specific user, if he/she wants to remove his/her account.


app.put('/users/:id', (req, res) => {
  if (bodyIsEmpty(req.body)) {
    res.status(400).send('Envía algo en el body .');
  } else {
    const name = req.body.name;
    const id = req.params.id;
    const user = users.find(user => user.id === parseInt(id));
    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) {
      res.status(400).send('Pa la próxima me pones un user que exista😉.');
    }
    user.name = name;
    users[userIndex] = user;
    res.send({ users });
  }
}); //update data of a specific user, edit user profile.

app.get('/users/pickers', (req, res) => {

}); //get all users who are pickers.
app.get('/users/owners', (req, res) => {

}); //get all users who are owners.


app.get('/users/:userID/cars'); //get all cars of a specific user.
app.post('/users/:userID/cars'); //add a car to a specific user.
app.delete('/users/:userID/cars/:carID'); //remove a specific car from a specific user.
app.put('/users/:userID/cars/:carID'); //update car data from a specific user.
app.get('/users/:userID/appointments?from=&to='); //get all dates from a specific date to specific date.
app.get('/users/:userID/appointments?status="Pendiente"'); //get all pending dates from a specific user.

app.post('/users/:userID/appointments'); //set an appointment to a specific user.
app.get('/users/:userID/appointments/:appointmentID'); //get an specific appointment from an specific user.
app.put('/users/:userID/appointments/:appointmentID'); //picker updates information of a date. 
app.delete('/users/:userID/appointments/:appointmentID'); //to cancel an appointment.


app.get('/services', (req, res) => { }); //get all services.
app.get('/services/:serviceID', (req, res) => { }); //get a specific service.


app.get('/users/:userID/appointments/:appointmentID/review'); //get a review of a past appointment, if it has it.
app.post('/users/:userID/appointments/:appointmentID/review'); //post a review to an specific appointment.
app.delete('/users/:userID/appointments/:appointmentID/review'); //remove a review of a specific appointment, if it has it.



app.get('/', (req, res) => {
<<<<<<< HEAD
  res.send('Hello world');
});

app.get('/hola', (req, res) => {
  res.send('Hello');
=======
  res.send('Hello! World')
>>>>>>> main
});

app.get('/products', (req, res) => {
  try {
    const thirdquery = 'use pickauto; select * from products;';
    console.log("entra");
    pool.query(thirdquery).then(result =>{
      res.send(result);
    }).catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

