import express from 'express';
import {pool} from './db/database.js';
const app = express();
const port = 3000;

// Create a connection pool

 


app.get('/products', (req, res) => {
  try {
    //const firstquery = 'use mydatabase;';
    //const secondquery = 'select * from products;';

    const thirdquery = 'use mydatabase; select * from products;'

    pool.query(thirdquery).then(result =>{
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

