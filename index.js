import express from 'express';
//import {pool} from './db/database.js';
const app = express();
const port = 3000;

// Create a connection pool
/*
app.get('/products', (req, res) => {
  try {

    const thirdquery = 'use mydatabase; select * from products;'

    pool.query(thirdquery).then(result =>{
      res.send(result);
    }).catch(error => console.log(error));

  } catch (error) {
    console.log(error);
  }
});
*/

let users = [
  { 
    name: 'Antonio',
    rol: 'picker'
  },
  { 
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

//app.post('/register'); //when a user registers, is added to the database.
app.post('/users', (req, res) => { //when a user registers, is added to the database.

}); 
app.get('/users', (req, res) => {}); //get all users.
app.delete('/users/:userID', (req, res) => {}); //remove a specific user, if he/she wants to remove his/her account.
app.put('/users/:userID', (req, res) => {}); //update data of a specific user, edit user profile.

app.get('/users/pickers', (req, res) => {}); //get all users who are pickers.
app.get('/users/owners', (req, res) => {}); //get all users who are owners.


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


app.get('/services/', (req, res) => {}); //get all services.
app.get('/services/:serviceID', (req, res) => {}); //get a specific service.


app.get('/users/:userID/appointments/:appointmentID/review'); //get a review of a past appointment, if it has it.
app.post('/users/:userID/appointments/:appointmentID/review'); //post a review to an specific appointment.
app.delete('/users/:userID/appointments/:appointmentID/review'); //remove a review of a specific appointment, if it has it.



app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.listen(port, () => console.log(`Listening on port ${port}`));

