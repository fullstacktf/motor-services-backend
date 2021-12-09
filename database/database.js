// Use the MariaDB Node.js Connector
import mariadb from 'mariadb';
 
// Create a connection pool


const pool = 
mariadb.createPool({
  host: "127.0.0.1" || "mariadb", //quiero que en desarrollo sea una ip y en produccion otra, pero asi no me funciona
  port: "3307" || "3306", 
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
    throw new Error(error);
  }
  return data[1];
}

// Exportar database entero, cuando lo investigue