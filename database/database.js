// Use the MariaDB Node.js Connector
import mariadb from 'mariadb';
 
// Create a connection pool


export const pool = 
mariadb.createPool({
  host: "127.0.0.1",  //mariadb en produccion
  port: "3307",      //3306 en produccion
  user: "newuser", 
  password: "test",
  database: "pickauto",
  multipleStatements: true,
  connectionLimit: 10,
  acquireTimeout: 30000,
  idleTimeout: 10000
});



export async function execQuery(queryExec) {
  let queryUse = 'use pickauto;';
  let data;
  try {
    data = await pool.query(queryUse + queryExec);
  } catch (error) {
    console.log(error);
    return error;
  }
  return data[1];
}

// Exportar database entero, cuando lo investigue