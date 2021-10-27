import express from 'express';
import {pool} from './db/database.js';
const app = express();
const port = 3000;

// Create a connection pool

 


app.get('/products', (req, res) => {
  try {
    const query1 = 'use mydatabase';
    const query = 'select * from products';
    pool.query(query1).then(result =>{
      console.log("entra");
      res.send(result);
    }).catch(error => console.log(error));

  } catch (error) {
    console.log(error);
  }
});


app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.listen(port, () => console.log(`Listening on port ${port}`));

