GRANT ALL PRIVILEGES ON *.* TO 'newuser'@'%' IDENTIFIED BY 'test';
USE pickauto_dn;

CREATE TABLE IF NOT EXISTS rol (
    id_rol INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    rol VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
    DNI INT UNSIGNED NOT NULL PRIMARY KEY,
    password_key VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    city ENUM('Madrid', 'Barcelona', 'Bilbao', 'Sevilla') NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    phone_number INT UNSIGNED,
    birth_date DATE NOT NULL,
    rol ENUM VARCHAR(10),
    profile_image VARCHAR(100),
    /*Las imágenes van en una carpeta y en la tabla se hace referencia a la ruta*/
    FOREIGN KEY (rol) REFERENCES rol(id_rol)
);

CREATE TABLE IF NOT EXISTS id_picker (
    id_picker INT UNSIGNED NOT NULL PRIMARY KEY,
    available BOOLEAN NOT NULL,
    start_time TIME,
    finish_time TIME,
    rating TINYINT DEFAULT 5,
    FOREIGN KEY (id_picker) REFERENCES user(DNI)
);

CREATE TABLE IF NOT EXISTS vehicles (
    plate_number VARCHAR(8) NOT NULL PRIMARY KEY,
    id_owner INT UNSIGNED NOT NULL,
    brand VARCHAR(20),
    model VARCHAR(20),
    power INT UNSIGNED,
    kilometers INT UNSIGNED,
    combustible ENUM('diesel', 'gasolina', 'electrico', 'gas'),
    vehicle_description VARCHAR(200),
    vehicle_image VARCHAR(100),
    FOREIGN KEY (id_owner) REFERENCES id_owner(id_owner)
);

CREATE TABLE IF NOT EXISTS services (
    id_service INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    service_type ENUM('A', 'B', 'C'),
    service_description VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS appointment (
    id_appointment INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_vehicle INT UNSIGNED NOT NULL,
    id_service INT UNSIGNED NOT NULL,
    id_picker INT UNSIGNED NOT NULL,
    pick_up_place VARCHAR(100) NOT NULL,
    pick_up_date DATETIME NOT NULL,
    appointment_status ENUM('No recogido', 'Camino al taller', 'En el taller', 'Camino al punto de entrega', 'Entregado'),
    notes VARCHAR(200),
    delivery_place VARCHAR(100) NOT NULL,
    garage VARCHAR(100),
    CONSTRAINT FOREIGN KEY (id_vehicle) REFERENCES vehicles(plate_number),
    CONSTRAINT FOREIGN KEY (id_service) REFERENCES services(id_service),
    CONSTRAINT FOREIGN KEY (id_picker) REFERENCES id_picker(id_picker)
)ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS rating (
    id_rating INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_appointment INT UNSIGNED NOT NULL,
    notes VARCHAR(200),
    rating TINYINT UNSIGNED,
    FOREIGN KEY (id_appointment) REFERENCES appointment(id_appointment)
);
