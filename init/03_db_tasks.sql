GRANT ALL PRIVILEGES ON *.* TO 'newuser'@'%' IDENTIFIED BY 'test';
USE pickauto;

CREATE TABLE IF NOT EXISTS Rol (
    id_rol INT UNSIGNED NOT NULL AUTO_INCREMENT,
    rol VARCHAR(10) NOT NULL,
    PRIMARY KEY (ID_rol)
);

CREATE TABLE IF NOT EXISTS User (
    DNI INT UNSIGNED NOT NULL PRIMARY KEY,
    id_rol INT UNSIGNED NOT NULL, 
    password_key VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    city VARCHAR(100),  
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    phone_number INT UNSIGNED,
    birth_date DATE NOT NULL,
    profile_image VARCHAR(100),
    /*Las imágenes van en una carpeta y en la tabla se hace referencia a la ruta*/
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Picker (
    id_picker INT UNSIGNED NOT NULL PRIMARY KEY,
    start_time TIME,
    finish_time TIME,
    rating TINYINT DEFAULT 5,
    FOREIGN KEY (id_picker) REFERENCES User(DNI) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Vehicle (
    plate_number VARCHAR(8) NOT NULL PRIMARY KEY,
    id_owner INT UNSIGNED NOT NULL,
    brand VARCHAR(20),
    model VARCHAR(20),
    powered INT UNSIGNED,
    kilometers INT UNSIGNED,
    fuel ENUM('diesel', 'gasolina','híbrido', 'electrico', 'gas'), /*Cambiar esto por varchars y añadirlo en data insertion*/
    vehicle_description VARCHAR(200),
    vehicle_image VARCHAR(100),
    FOREIGN KEY (id_owner) REFERENCES User(DNI) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Services (
    id_service INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    service_type ENUM('Chapa y Pintura', 'Electricidad', 'Mantenimiento', 'Transporte del Vehículo', 'Limpieza', 'ITV'),
    service_description VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS Appointment (
    id_appointment INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_vehicle VARCHAR(8) NOT NULL,
    id_service INT UNSIGNED NOT NULL,
    id_picker INT UNSIGNED,
    pick_up_latitude FLOAT NOT NULL,
    pick_up_longitude FLOAT NOT NULL,
    pick_up_city VARCHAR(100) NOT NULL,
    pick_up_date DATE NOT NULL,
    pick_up_time TIME NOT NULL,
    appointment_status ENUM('No recogido', 'Camino al taller', 'En el taller', 'Camino al punto de entrega', 'Entregado') DEFAULT 'No recogido',
    appointment_request ENUM ('Pendiente','Aceptada', 'Cancelada') DEFAULT 'Pendiente',
    owner_notes VARCHAR(200),
    picker_notes VARCHAR(200),
    delivery_latitude FLOAT NOT NULL,
    delivery_longitude FLOAT NOT NULL,
    delivery_city VARCHAR(100) NOT NULL,
    garage VARCHAR(100),
    CONSTRAINT FOREIGN KEY (id_vehicle) REFERENCES Vehicle(plate_number) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (id_service) REFERENCES Services(id_service) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (id_picker) REFERENCES Picker(id_picker) ON DELETE CASCADE
    /* PRIMARY KEY (id_vehicle, pick_up_date) un vehiculo solo puede pedir una cita por dia */ 
);

CREATE TABLE IF NOT EXISTS Review (
    id_review INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    notes VARCHAR(200),
    rating TINYINT UNSIGNED,
    CONSTRAINT FOREIGN KEY (id_review) REFERENCES Appointment (id_appointment) ON DELETE CASCADE
);
