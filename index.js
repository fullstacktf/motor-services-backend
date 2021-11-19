import express from 'express';
import { pool } from './db/database.js';
import { execQuery } from './db/database.js';
const app = express();
const port = 3000;


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const bodyIsEmpty = (body) => body === {};
let queryExec = '';
let queryUse = 'use pickauto;';


app.post('/users', async (req, res) => { //when a user registers, is added to the database. Añadir el caso de si el usuario existe
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

    queryExec = queryUse + `INSERT INTO User (DNI, password_key, email, city, first_name, last_name, rol, phone_number, birth_date, profile_image) 
    VALUES (${dni}, ${password}, ${email}, ${city}, ${first_name}, ${last_name}, ${id_rol}, ${phone_number}, ${birth_date}, ${profile_image});`;
    let data = await execQuery(queryExec);
    res.send({
        msg: 'Usuario añadido correctamente',
        resultado: data
    });
  }
});

app.get('/users', async (req, res) => {
    queryExec = queryUse + 'select * from User;';
    let data = await execQuery(queryExec);
    res.json({
        msg: 'Solicitud exitosa',
        users: data[1]
    });
});

app.get('/rols', async (req, res) => {
    queryExec = queryUse + 'select * from Rol;';
    let data = await execQuery(queryExec);
    res.json({
        msg: 'Solicitud exitosa',
        rols: data[1]
    });
});

app.get('/users/:userID', async (req, res) => {
  const id = req.params.userID;
  queryExec = queryUse + `select * from User where user_id='${id};'`;
  let data = await execQuery(queryExec);
  res.json({
      msg: 'Solicitud exitosa',
      user: data[1]
  });
});

app.delete('/users', (req, res) => {
  if (bodyIsEmpty(req.body)) {
    res.status(400).send('Envía algo en el body .');
  } else {
    try {
      const id = req.body.id;
      const queryExist = queryUse + `select exists(select * from User where DNI=${id} limit 1);`;
      pool.query(queryExist).then(user => {
        let objUser = user[1][0];
        if (objUser[Object.keys(objUser)[0]] === 1) {
          try {
            let queryDelete = queryUse + `DELETE FROM User where DNI=${id};`;
            pool.query(queryDelete).then(userToDelete => console.log(userToDelete)).catch(error => console.log(error));
          } catch (error) {
            console.log(error);
          }
         //res.send(users);
        } else {
          res.status(400).send("Error, no existe el usuario")
        }
      }).catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }
}); //remove a specific user, if he/she wants to remove his/her account.


app.put('/users/:id', (req, res) => {
  if (bodyIsEmpty(req.body)) {
    res.status(400).send('Envía algo en el body .');
  } else {
    const name = req.body.name;
    const id = req.params.id;
    try {
      const queryExist = queryUse + `select exists(select * from User where DNI=${id} limit 1);`;
      pool.query(queryExist).then(user => {
        let objUser = user[1][0];
        if (objUser[Object.keys(objUser)[0]] === 1) {
          try {
            let queryDelete = queryUse + `ALTER TABLE User where DNI=${id};`;
            pool.query(queryDelete).then(userToDelete => console.log(userToDelete)).catch(error => console.log(error));
          } catch (error) {
            console.log(error);
          }
         //res.send(users);
        } else {
          res.status(400).send("Error, no existe el usuario")
        }
      }).catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
    //const user = users.find(user => user.id === parseInt(id));

    //const userIndex = users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) {
      res.status(400).send('Pa la próxima me pones un user que exista😉.');
    }
    user.name = name;
    users[userIndex] = user;
    res.send({ users });
  }
}); //update data of a specific user, edit user profile.

app.get('/users/pickers', async (req, res) => {
    queryExec = queryUse + `select * from User where rol=2;`;
    let data = await execQuery(queryExec);
    res.json({
        msg: 'Solicitud exitosa',
        pickers: data[1]
    });
}); //get all users who are pickers.
app.get('/users/owners', async (req, res) => {
  queryExec = queryUse + `select * from User where rol=1;`;
  let data = await execQuery(queryExec);
  res.json({
      msg: 'Solicitud exitosa',
      pickers: data[1]
  });
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
  res.send('Hello! World')
});

app.get('/products', (req, res) => {
  try {
    const thirdquery = 'use pickauto; select * from products;';
    console.log("entra");
    pool.query(thirdquery).then(result => {
      res.send(result);
    }).catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

