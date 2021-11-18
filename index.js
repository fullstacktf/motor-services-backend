const express =  require ('express');
//import bodyParser from 'body-parser';
//import {pool} from './db/database.js';
const app = express();
const port = 3000;
import carRouter from ('./routes/cars');


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

app.use( express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
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
  },
  {  
    id: 2,
    name: 'Juan',
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



//app.post('/register'); //when a user registers, is added to the database.
app.post('/users', (req, res) => { //when a user registers, is added to the database.
  if (bodyIsEmpty(req.body)) {
    res.status(400).send('Envía algo en el body .');
  } else {
  const userNewId =  users.length +1
  const userNewName = req.body.name;
  res.send(userNewName)
  const postUser = {
    id: userNewId,
    name: userNewName,
    rol: 'owner'
  }
  users.push(postUser);
}
}); 
app.get('/users', (req, res) => {
    res.json(users);
}); //get all users.

app.get('/users/:userID',(req, res) => {
  const id = req.params.userID;
  const user = users.find(user => user.id == id);
  if(user){
    res.json(user);
  }else{
    res.status(400).send("Error no existe el usuario")
  }

});
app.delete('/users', (req, res) => {
  if (bodyIsEmpty(req.body)) {
    res.status(400).send('Envía algo en el body .');
  } else {
  const id = req.body.id;
  const user = users.find(user => user.id === parseInt(id));
  if(user){
    users = users.filter(user => user.id !== parseInt(id));
    res.send(users);
  }else{
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

app.get('/users/pickers', (req, res) => {}); //get all users who are pickers.
app.get('/users/owners', (req, res) => {}); //get all users who are owners.


//VEHICLES ENDPOINTS
app.use('/users/:userID/cars',carRouter);

app.get('/users/:userID/cars',(req, res) => {

}); 

//get all cars of a specific user.
app.post('/users/:userID/cars',(req, res)=>{

  if(bodyIsEmpty(req.body)){
    res.status(400).send('Fallo al añadir el coche')
  }else{
    const id = cars.length + 1
    const id_user = req.body.user_id
    const car_name = req.params.car_name;
    const car_model = req.params.car_model;
    const car_color = req.params.car_color;
    const car_model_year = req.params.car_model_year;
    const car_registration = req.params.car_registration;

    const newCar = {
      id: id,
      id_user: id_user,
      car_name: car_name,
      car_model: car_model,
      car_color: car_color,
      car_model_year: car_model_year,
      car_registration: car_registration
    }
    cars.push(newCar);
  }
}); //add a car to a specific user.
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

//Added car router
app.use('/users/:userID/cars',carRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.listen(port, () => console.log(`Listening on port ${port}`));

