// Use the MariaDB Node.js Connector
import mariadb from 'mariadb';
 
// Create a connection pool


export const pool = 
mariadb.createPool({
  host: "mariadb", 
  port: "3306",
  user: "newuser", 
  password: "test",
  database: "pickauto",
  multipleStatements: true
});




