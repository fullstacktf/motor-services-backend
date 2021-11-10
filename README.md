
![image](https://drive.google.com/uc?export=view&id=1i8OzH4Ip6_4Csz6jgZcKed6TzSmV7l9E)


# Pick Auto 🚗

Pick Auto is an application to help people with little time to manage the maintenance of their vehicles and keep the revisions up to date


## 📁Project Structure
```
pickauto
│   README.md
│   start.sh
│   docker-compose.yml    
│
└───motor-services-backend
│   ├── controllers
│   ├── db
│   │   └── database.js
│   ├── Dockerfile
│   ├── index.js
│   ├── init
│   │   ├── 01_database_creation.sql
│   │   ├── 02_user_creation.sql
│   │   └── 03_db_tasks.sql
│   ├── models
|   ├── node_modules
│   ├── mysql_data
│   │   ├── aria_log.00000001
│   │   ├── aria_log_control
│   │   ├── ...
│   ├── package.json
│   ├── package-lock.json
│   └── routes
│   
└───motor-services-frontend
│   ├── dist
│   │   ├── index.3aefa2fc.css
│   │   ├── index.e37c8fbd.js
│   │   └── index.html
|   ├── node_modules
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── index.html
│   │   ├── js
│   │   │   └── index.js
│   │   └── styles
│   │       └── index.css
│   └── vite.config.js
```
## 🖥️ Tech Stack

* Node
* Express
* MariaDB
* Nginx



## API Reference (Endpoints)

* app.post('/api/users/register'); when a user registers, it adds to database.
* app.get('/api/users'); get all users.
* app.delete('/api/users/:_id'); remove a specific user, if he/she wants to remove his/her account.
* app.put('/api/users/:_id'); update data of a specific user, edit user profile.

* app.get('/api/users/pickers'); get all users who are pickers.
* app.get('/api/users/owners'); get all users who are owners.


* app.get('/api/users/:_id/cars'); get all cars of a specific user.
* app.post('/api/users/:_id/cars'); add a car to a specific user.
* app.delete('/api/users/:_id/cars/:_id'); remove a specific car from a specific user.
* app.put('/api/users/:_id/cars/:_id'); update car data from a specific user.
* app.get('/api/users/:_id/dates?from=&to='); get all dates from a specific date to specific date.
* app.get('/api/users/:_id/dates?status="Pendiente"); get all pending dates from a specific user.

* app.post('/api/users/:_id/dates'); set an appointment to a specific user.
* app.get('/api/users/:_id/dates/:_id'); get an specific appointment from an specific user.
* app.put('/api/users/:_id/dates/:_id'); picker updates information of a date. 
* app.delete('/api/users/:_id/dates/:_id'); to cancel an appointment.


* app.get('api/services/'); get all services.
* app.get('api/services/:_id'); get a specific service.


* app.get('/api/users/:_id/dates/:_id/review'); get a review of a past date, if it has it.
* app.post('/api/users/:_id/dates/:_id/review'); post a review to an specific date.
* app.delete('/api/users/:_id/dates/:_id/review'); remove a review of a specific date, if it has it.

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Database Schema

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## 👥 Authors

- [@ricmiber96](https://github.com/ricmiber96)
- [@JuanFran928](https://github.com/JuanFran928)
- [@Marta-ramiro](https://github.com/Marta-ramiro)

