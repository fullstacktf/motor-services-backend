// Use the MariaDB Node.js Connector
import mariadb from 'mariadb';
 
// Create a connection pool


export const pool = 
mariadb.createPool({
  host: "127.0.0.1", 
  port: "3307",
  user: "newuser", 
  password: "test",
  database: "mydatabase"
});




