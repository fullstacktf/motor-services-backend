USE pickauto;
CALL Insert_role(1, 'Owner');
CALL Insert_role(2, 'Picker');
CALL Insert_user(
    12345678,
    1,
    'seguridad',
    'sawyer@lost.org',
    'Sevilla',
    'James',
    'Ford',
    123456789,
    '1969-07-20',
    'Sawyer'
);
CALL Insert_user(
    12345679,
    1,
    'seguridad',
    'jackshephard@lost.org',
    'Barcelona',
    'Jack',
    'Shephard',
    123456389,
    '1966-07-14',
    'Doctor'
);
CALL Insert_user(
    12345671,
    1,
    'seguridad',
    'kateausten@lost.org',
    'Sevilla',
    'Kate',
    'Hudson',
    123356789,
    '1979-08-03',
    'Kate'
);
CALL Insert_user(
    12345672,
    2,
    'seguridad',
    'johnlocke@lost.org',
    'Madrid',
    'John',
    'Locke',
    123356289,
    '1952-07-15',
    'Locke'
);
CALL Insert_user(
    12345673,
    1,
    'seguridad',
    'Hurley@lost.org',
    'Bilbao',
    'Hugo',
    'Reyes',
    123356729,
    '1973-04-28',
    'Hurley'
);
CALL Insert_user(
    12345674,
    2,
    'seguridad',
    'Charliepace@lost.org',
    'Bilbao',
    'Charlie',
    'Pace',
    113356729,
    '1976-12-08',
    'Charlie'
);
CALL Insert_user(
    12345675,
    1,
    'seguridad',
    'BooneCarlyle@lost.org',
    'Barcelona',
    'Boone',
    'Carlyle',
    123356029,
    '1978-12-08',
    'Boone'
);
CALL Insert_user(
    12345676,
    2,
    'seguridad',
    'sayidjarrah@lost.org',
    'Sevilla',
    'Sayid',
    'Jarrah',
    123356720,
    '1969-01-17',
    'Sayid'
);
CALL Insert_user(
    12345677,
    2,
    'seguridad',
    'shannonrutherford@lost.org',
    'Sevilla',
    'Shannon',
    'Rutherford',
    103356729,
    '1983-09-21',
    'Shannon'
);
CALL Insert_vehicle(
    '1134abd',
    12345677,
    'Ford',
    'Fiesta',
    140,
    38909,
    'diesel',
    'Precioso ford fiesta morado, 5 puertas',
    'Coche morado'
);
CALL Insert_vehicle(
    '1134fbd',
    12345673,
    'Mercedes',
    'Blanco',
    140,
    323879,
    'gasolina',
    'Edicion Veneno',
    'Mercedes blanco'
);
CALL Insert_vehicle(
    '1154abd',
    12345672,
    'Renault',
    'Megane',
    115,
    29000,
    'gasolina',
    'RENAULT Megane Limited TCe GPF 85 kW 115CV 5p',
    'Coche morado'
);
CALL Insert_vehicle(
    '5154abd',
    12345678,
    'Harley Davidson',
    'Softail heritage',
    88,
    24000,
    'gasolina',
    'Softail heritage. Nacional 5HD. TC 88  Inyeccion. Estado impecable. Ruedas, pastillas de freno y bateria nuevos.',
    'La mochillo'
);
CALL Insert_picker(12345677, 0, '12:00', '17:30', 4);
CALL Insert_picker(12345676, 0, '09:00', '16:30', 5);
CALL Insert_picker(12345674, 0, '11:30', '20:30', 5);
CALL Insert_picker(12345672, 1, '00:00', '23:49', 5);
CALL Insert_service(
    'Chapa y Pintura',
    'Distintos tipos de reparaciones y modificaciones sobre la carroceria del vehículo'
);
CALL Insert_service(
    'Electricidad',
    'Reparación de averias electricas, reconfiguracion de la electronica o instalacion de equipos'
);
CALL Insert_service(
    'Mantenimiento',
    'Verificar el motor, cambiar el aceite, cambiar los neumaticos o medir la presion del aire'
);
CALL Insert_service(
    'Transporte del Vehículo',
    'Transporte del vehiculo de un punto a otro'
);
CALL Insert_service(
    'Limpieza',
    'Limpieza exterior, limpieza interior, limpieza de tapicerias, desinfeccion, pulido a maquina, restauracion de faros '
);
CALL Insert_service('ITV', 'Traslado del vehiculo al centro ITV');
CALL Insert_appointment(
    '1154abd',
    2,
    12345672,
    'Calle de la piruleta, 32',
    '2021-10-23 11:30',
    'Entregado',
    'Aceptada',
    'Cambio de aceite y revisión de neumaticos.',
    'Calle de la piruleta, 32',
    'Taller Pepe el Potencia'
);
CALL Insert_appointment(
    '5154abd',
    1,
    12345677,
    'Avenida del boniato, 88',
    '2021-11-29 11:30',
    'En el taller',
    'Aceptada',
    'Pintar verde menta.',
    'Calle amarilla, 12',
    'Taller Camaleon'
);
CALL Insert_appointment(
    '1134fbd',
    5,
    12345672,
    'Calle imaginaria, 15',
    '2021-11-29 12:30',
    'Camino al punto de entrega',
    'Aceptada',
    'Limpieza de tapiceria.',
    'Calle imaginaria, 15',
    'LimpiAuto'
);
CALL Insert_appointment(
    '1154abd',
    1,
    12345672,
    'Calle imaginaria, 15',
    '2021-11-29 12:30',
    'No recogido',
    'Cancelada',
    'Píntenlo de azul',
    'Calle imaginaria, 15',
    'Taller de Chapa y pintura, Florencio'
);
CALL Insert_appointment(
    '1154abd',
    5,
    12345672,
    'Calle imaginaria, 15',
    '2021-11-29 12:30',
    'No recogido',
    'Pendiente',
    'Limpieza de tapiceria.',
    'Calle imaginaria, 15',
    'LimpiAuto'
);
CALL Insert_rating(2, 'Todo correcto, muy puntual', 5);
CALL Insert_rating(3, 'Dejo el coche aparcado al sol', 4);