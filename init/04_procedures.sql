DELIMITER //
//
CREATE PROCEDURE pickauto.Insert_user(
  DNI_value int(10) unsigned,
  password_key_value varchar(20),
  email_value varchar(50),
  city_value varchar(9),
  first_name_value varchar(20),
  last_name_value varchar(40),
  rol_value int(10) unsigned,
  phone_number_value int(10) unsigned,
  birth_date_value date,
  profile_image_value varchar(100))
    BEGIN
      insert into User (DNI, password_key, email, city, first_name, last_name, rol, phone_number, birth_date, profile_image) VALUES
      (DNI_value, password_key_value, email_value, city_value, first_name_value, last_name_value, rol_value, phone_number_value, birth_date_value, profile_image_value);
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
