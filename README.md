
![image](https://drive.google.com/uc?export=view&id=1i8OzH4Ip6_4Csz6jgZcKed6TzSmV7l9E)

# Pick Auto π

Pick Auto is an application to help people with little time to manage the maintenance of their vehicles and keep the revisions up to date


## πProject Structure
```
pickauto
β   README.md
β   start.sh
β   docker-compose.yml    
β
ββββmotor-services-backend
β   βββ controllers
β   βββ db
β   β   βββ database.js
β   βββ Dockerfile
β   βββ index.js
β   βββ init
β   β   βββ 01_database_creation.sql
β   β   βββ 02_user_creation.sql
β   β   βββ 03_db_tasks.sql
β   βββ models
|   βββ node_modules
β   βββ mysql_data
β   β   βββ aria_log.00000001
β   β   βββ aria_log_control
β   β   βββ ...
β   βββ package.json
β   βββ package-lock.json
β   βββ routes
β   
ββββmotor-services-frontend
β   βββ dist
β   β   βββ index.3aefa2fc.css
β   β   βββ index.e37c8fbd.js
β   β   βββ index.html
|   βββ node_modules
β   βββ Dockerfile
β   βββ package.json
β   βββ package-lock.json
β   βββ postcss.config.js
β   βββ public
β   βββ src
β   β   βββ assets
β   β   βββ components
β   β   βββ index.html
β   β   βββ js
β   β   β   βββ index.js
β   β   βββ styles
β   β       βββ index.css
β   βββ vite.config.js
```
## π₯οΈ Tech Stack

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

#### EndPoints Vehicles π
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


## π₯ Authors

- [@ricmiber96](https://github.com/ricmiber96)
- [@JuanFran928](https://github.com/JuanFran928)
- [@Marta-ramiro](https://github.com/Marta-ramiro)

