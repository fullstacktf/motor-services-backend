
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

* app.post('/api/users/register'); when a user registers, is added to the database.
* app.get('/api/users'); get all users.
* app.delete('/api/users/{userID}'); remove a specific user, if he/she wants to remove his/her account.
* app.put('/api/users/{userID}'); update data of a specific user, edit user profile.

* app.get('/api/users/pickers'); get all users who are pickers.
* app.get('/api/users/owners'); get all users who are owners.

* app.put('/api/users/{userID}/cars/{carID}'); update car data from a specific user.

* app.get('/api/users/{userID}/dates?from=&to='); get all dates from a specific date to specific date.
* app.get('/api/users/{userID}/dates?status="Pendiente"); get all pending dates from a specific user.

* app.post('/api/users/{userID}/dates'); set an appointment to a specific user.
* app.get('/api/users/{userID}/dates/{dateID}'); get an specific appointment from an specific user.
* app.put('/api/users/{userID}/dates/{dateID}'); picker updates information of a date. 
* app.delete('/api/users/{userID}/dates/{dateID}'); to cancel an appointment.


* app.get('api/services/'); get all services.
* app.get('api/services/{serviceID}'); get a specific service.


* app.get('/api/users/{userID}/dates/{dateID}/review'); get a review of a past date, if it has it.
* app.post('/api/users/{userID}/dates/{dateID}/review'); post a review to an specific date.
* app.delete('/api/users/{userID}/dates/{dateID}/review'); remove a review of a specific date, if it has it.

#### EndPoints Vehicles 🚗
#### Get all vehicles from an user

```http
  GET /api/users/:userID/vehicles
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userID`  | `string` | **Required**.id of the user|

#### Get one specific vehicle from an user

```http
  GET /api/users/:userID/vehicles/:vehicleID
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userID`  | `string` | **Required**.id of the user|
| `vehicleID`  | `string` | **Required**.id vehicle|

#### Add vehicle to specific user

```http
  POST /api/users/:userID/vehicle
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userID`  | `string` | **Required**.id of the user|


#### Update one specific vehicle from an user

```http
  PUT /api/users/:userID/vehicles/:vehicleID
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userID`  | `string` | **Required**.id of the user|
| `vehicleID`  | `string` | **Required**.id vehicle|

#### Delete one specific vehicle from an user

```http
  DELETE /api/users/:userID/vehicles/:vehicleID
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userID`  | `string` | **Required**.id of the user|
| `vehicleID`  | `string` | **Required**.id vehicle|

## Database Schema

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## 👥 Authors

- [@ricmiber96](https://github.com/ricmiber96)
- [@JuanFran928](https://github.com/JuanFran928)
- [@Marta-ramiro](https://github.com/Marta-ramiro)

