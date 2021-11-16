USE pickauto;

INSERT INTO Rol (rol) VALUES ('Owner'), ('Picker');

CALL Insert_user(12345678, 'seguridad', 'sawyer@lost.org' , 'Sevilla', 'James', 'Ford', 1, 123456789, '1969-07-20', 'Sawyer');
CALL Insert_user(12345679, 'seguridad', 'jackshephard@lost.org' , 'Barcelona', 'Jack', 'Shephard', 1, 123456389, '1966-07-14', 'Doctor');
CALL Insert_user(12345671, 'seguridad', 'kateausten@lost.org' , 'Sevilla', 'Kate', 'Hudson', 1, 123356789, '1979-08-03', 'Kate');
CALL Insert_user(12345672, 'seguridad', 'johnlocke@lost.org' , 'Madrid', 'John', 'Locke', 2, 123356289, '1952-07-15', 'Locke');
CALL Insert_user(12345673, 'seguridad', 'Hurley@lost.org' , 'Bilbao', 'Hugo', 'Reyes', 1, 123356729, '1973-04-28', 'Hurley');
CALL Insert_user(12345674, 'seguridad', 'Charliepace@lost.org' , 'Bilbao', 'Charlie', 'Pace', 2, 113356729, '1976-12-08', 'Charlie');
CALL Insert_user(12345675, 'seguridad', 'BooneCarlyle@lost.org' , 'Barcelona', 'Boone', 'Carlyle', 1, 123356029, '1978-12-08', 'Boone');
CALL Insert_user(12345676, 'seguridad', 'sayidjarrah@lost.org' , 'Sevilla', 'Sayid', 'Jarrah', 2, 123356720, '1969-01-17', 'Sayid');
CALL Insert_user(12345677, 'seguridad', 'shannonrutherford@lost.org' , 'Sevilla', 'Shannon', 'Rutherford', 2, 103356729, '1983-09-21', 'Shannon');

CALL Insert_vehicle('1134abd',12345677, 'Ford', 'Fiesta', 140, 38909, 'diesel', 'Precioso ford fiesta morado, 5 puertas', 'Coche morado');
CALL Insert_vehicle('1134fbd',12345673, 'Mercedes', 'Blanco', 140, 323879, 'gasolina', 'Edicion Veneno', 'Mercedes blanco');
CALL Insert_vehicle('1154abd',12345672, 'Renault', 'Megane', 115, 29000, 'gasolina', 'RENAULT Megane Limited TCe GPF 85 kW 115CV 5p', 'Coche morado');
CALL Insert_vehicle('5154abd',12345678, 'Harley Davidson', 'Softail heritage', 88, 24000, 'gasolina', 'Softail heritage. Nacional 5HD. TC 88  Inyeccion. Estado impecable. Ruedas, pastillas de freno y bateria nuevos.', 'La mochillo');
