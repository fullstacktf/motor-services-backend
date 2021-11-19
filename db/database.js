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
  multipleStatements: true
});



export async function execQuery(queryExec) {
  let data;
  try {
    rows = await pool.query(queryExec);
  } catch (error) {
    console.log(error);
  }
  return data;
}

