DELIMITER //
CREATE TRIGGER pickauto.add_picker
AFTER INSERT ON User
FOR EACH ROW
BEGIN
    IF NEW.id_rol = 2 THEN
        INSERT INTO Picker(id_picker) VALUES (NEW.DNI);
    END IF;
END; //
DELIMITER ;