import express from 'express';
import { execQuery } from './db/database.js';

const app = express();
const port = 3000;


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

import {userRoute} from './routes/users.js'





app.get('/', (req, res) => {
  res.send('Hello! World')
});


app.listen(port, () => console.log(`Listening on port ${port}`));

