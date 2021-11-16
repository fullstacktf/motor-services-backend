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
