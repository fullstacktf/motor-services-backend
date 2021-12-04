DELIMITER //
//
CREATE PROCEDURE pickauto.Insert_role(
  id_rol_value int(10) unsigned,
  rol_value VARCHAR(10))
    BEGIN
      insert into Rol (id_rol, rol) VALUES (id_rol_value, rol_value);
    END;//

DELIMITER ;

DELIMITER //
//
CREATE PROCEDURE pickauto.Insert_user(
  DNI_value int(10) unsigned,
  id_rol_value int(10) unsigned,
  password_key_value varchar(20),
  email_value varchar(50),
  city_value varchar(9),
  first_name_value varchar(20),
  last_name_value varchar(40),
  phone_number_value int(10) unsigned,
  birth_date_value date,
  profile_image_value varchar(100))
    BEGIN
      insert into User (DNI, id_rol, password_key, email, city, first_name, last_name, phone_number, birth_date, profile_image) VALUES
      (DNI_value,id_rol_value, password_key_value, email_value, city_value, first_name_value, last_name_value, phone_number_value, birth_date_value, profile_image_value);
    END;//

DELIMITER ;

DELIMITER //
//
CREATE PROCEDURE pickauto.Insert_vehicle(
  plate_number_value varchar(8),
  id_owner_value int(10) unsigned,
  brand_value varchar(20),
  model_value varchar(20),
  powered_value int(10) unsigned,
  kilometers_value int(10) unsigned,
  fuel_value varchar(10),
  vehicle_description_value varchar(200),
  vehicle_image_value varchar(200))
    BEGIN
      insert into Vehicle (plate_number, id_owner, brand, model, powered, kilometers, fuel, vehicle_description, vehicle_image) VALUES
      (plate_number_value, id_owner_value, brand_value, model_value, powered_value, kilometers_value, fuel_value, vehicle_description_value, vehicle_image_value);
    END;//

DELIMITER ;

DELIMITER //
//
CREATE PROCEDURE pickauto.Update_picker(
  id_picker_value int(10) unsigned,
  start_time_value TIME,
  finish_time_value TIME,
  rating_value tinyint(4))
    BEGIN
     UPDATE Picker SET start_time = start_time_value, finish_time = finish_time_value, rating = rating_value WHERE id_picker = id_picker_value;
    END;//

DELIMITER ;

DELIMITER //
//
CREATE PROCEDURE pickauto.Insert_service(
  service_value varchar(25),
  service_description_value varchar(200))
    BEGIN
      INSERT INTO Services (service_type, service_description) VALUES (service_value, service_description_value);
    END;//

DELIMITER ;

DELIMITER //
//
CREATE PROCEDURE pickauto.Insert_appointment(
  id_vehicle_value varchar(8),
  id_service_value int(10) unsigned,
  id_picker_value int(10) unsigned,
  pick_up_latitude_value FLOAT,
  pick_up_longitude_value FLOAT,
  pick_up_city_value VARCHAR(100),
  pick_up_date_value date,
  pick_up_time_value time,
  appointment_status_value varchar(40),
  appointment_request_value varchar(40),
  owner_notes_value varchar(200),
  picker_notes_value varchar(200),
  delivery_latitude_value FLOAT,
  delivery_longitude_value FLOAT,
  delivery_city_value varchar(100),
  garage_value varchar(100))
    BEGIN
      insert into Appointment (id_vehicle, id_service, id_picker, pick_up_latitude, pick_up_longitude, pick_up_city, pick_up_date, pick_up_time, appointment_status, appointment_request, owner_notes, picker_notes, delivery_latitude, delivery_longitude, delivery_city, garage) VALUES
      (id_vehicle_value, id_service_value, id_picker_value, pick_up_latitude_value, pick_up_longitude_value, pick_up_city_value, pick_up_date_value, pick_up_time_value, appointment_status_value, appointment_request_value, owner_notes_value, picker_notes_value, delivery_latitude_value, delivery_longitude_value, delivery_city_value, garage_value);
    END;//

DELIMITER ;

DELIMITER //
//
CREATE PROCEDURE pickauto.Insert_review(
  id_appointment_value int(10) unsigned,
  notes_value varchar(200),
  rating_value tinyint(3) unsigned)
    BEGIN
      INSERT INTO Rating (id_appointment, notes, rating) VALUES 
      (id_appointment_value, notes_value, rating_value);
    END;//

DELIMITER ;