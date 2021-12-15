USE pickauto;
CALL Insert_role(1, 'Owner');
CALL Insert_role(2, 'Picker');

/*-------------------------------*/

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
    2,
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
    'Madrid',
    'Shannon',
    'Rutherford',
    103356729,
    '1983-09-21',
    'Shannon'
);

/*-------------------------------*/

CALL Insert_vehicle(
    '1134abd',
    12345671,
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
    12345673,
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
CALL Insert_vehicle(
    '6278geb',
    12345679,
    'Ford',
    'Puma',
    125,
    2000,
    'híbrido',
    'FORD Puma 1.0 EcoBoost 92kW 125cv STLine MHEV 5p',
    'Coche morado'
);
CALL Insert_vehicle(
    '2863aaf',
    12345671,
    'BMW',
    'Serie 1',
    116,
    6699,
    'diesel',
    'BMW Serie 1 116d 5p blanco',
    'Coche ab'
);
CALL Insert_vehicle(
    '3456fdh',
    12345671,
    'Mini',
    'Clubman Cooper',
    150,
    55400,
    'diesel',
    'MINI CLUBMAN COOPER D automatico 5p verde',
    'Mini verde'
);
CALL Insert_vehicle(
    '3247jhr',
    12345678,
    'Lexus',
    'NX',
    197,
    75400,
    'híbrido',
    'LEXUS NX 2.5300h F Sport 4WD Panoramico Navibox 5p rojo',
    'Lexus rojo'
);

/*-------------------------------*/

CALL Update_picker(12345677, '12:00', '17:30', 4);
CALL Update_picker(12345676, '09:00', '16:30', 5);
CALL Update_picker(12345674, '11:30', '20:30', 5);
CALL Update_picker(12345672, '18:00', '00:00', 5);

/*-------------------------------*/

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

/*-------------------------------*/

CALL Insert_appointment(
    '1154abd',
    2,
    12345672,
    40.4167, 
    -3.7167,
    'Madrid',
    '2021-10-23',
    '11:30',
    'Entregado',
    'Aceptada',
    'Cambio de aceite y revisión de neumaticos.',
    'Proximo cambio de aceite 2000km, neumaticos OK',
    40.4167, 
    -3.7167,
    'Madrid',
    'Taller Pepe el Potencia'
);
CALL Insert_appointment(
    '5154abd',
    1,
    12345677,
    40.4167,
    -3.7167, 
    'Madrid',
    '2021-11-29',
    '11:30',
    'En el taller',
    'Aceptada',
    'Pintar verde menta.',
    'Aparcar en garage durante 1 semana',
    40.4167,
    -3.7167, 
    'Madrid',
    'Taller Camaleon'
);
CALL Insert_appointment(
    '1134fbd',
    5,
    12345672,
    40.4167,
    -3.7167, 
    'Madrid',
    '2021-11-29',
    '12:30',
    'Camino al punto de entrega',
    'Aceptada',
    'Limpieza de tapiceria.',
    'Han dejado las monedas en el cenicero',
    40.4167,
    -3.7167, 
    'Madrid',
    'LimpiAuto'
);
CALL Insert_appointment(
    '1154abd',
    1,
    12345672,
    40.4167,
    -3.7167,
    'Madrid',
    '2021-11-29',
    '12:30',
    'No recogido',
    'Cancelada',
    'Píntenlo de azul',
    '',
    40.4167,
    -3.7167,
    'Madrid',
    'Taller de Chapa y pintura, Florencio'
);
CALL Insert_appointment(
    '1154abd',
    5,
    Null,
    40.4167,
    -3.7167,
    'Madrid',
    '2021-01-01', 
    '12:30',
    'No recogido',
    'Pendiente',
    'Limpieza de tapiceria.',
    '',
    40.4167,
    -3.7167,
    'Madrid',
    'LimpiAuto'
);
CALL Insert_appointment(
    '3247jhr',
    6,
    12345676,
    40.4167,
    -3.7167,
    'Madrid',
    '2021-10-29',
    '11:17',
    'Entregado',
    'Aceptada',
    'ITV.',
    'ITV pasada',
    40.4167,
    -3.7167,
    'Madrid',
    'Centro ITV 2'
);
CALL Insert_appointment(
    '6278geb',
    4,
    12345672,
    41.3825, 
    2.1769, 
    'Barcelona',
    '2021-11-29',
    '12:30',
    'Entregado',
    'Aceptada',
    'Llame al llegar a Santiago',
    'Pago de peajes adicional',
    41.3825, 
    2.1769, 
    'Barcelona',
    Null
);
CALL Insert_appointment(
    '2863aaf',
    2,
    12345674,
    41.3825, 
    2.1769, 
    'Barcelona',
    '2021-09-14',
    '10:15',
    'Entregado',
    'Aceptada',
    'Cambio de radio y sistema de audio',
    'Las cajas de la radio y los altavoces están en el maletero',
    41.3825, 
    2.1769, 
    'Barcelona',
    'Taller TechnoElectrico'
);
CALL Insert_appointment(
    '1134abd',
    1,
    12345676,
    41.3825, 
    2.1769, 
    'Barcelona',
    '2021-08-13',
    '16:30',
    'Entregado',
    'Aceptada',
    'Quitar golpe puerta derecha',
    'Tambien han reparado un pequeño roce en la puerta',
    41.3825, 
    2.1769, 
    'Barcelona',
    'Taller Quitagolpes'
);
CALL Insert_appointment(
    '3456fdh',
    5,
    12345674,
    41.3825, 
    2.1769, 
    'Barcelona',
    '2022-12-19',
    '16:30',
    'No recogido',
    'Aceptada',
    'Limpiar el exterior',
    '',
    41.3825, 
    2.1769, 
    'Barcelona',
    'LimpiAuto'
);
CALL Insert_appointment(
    '3456fdh',
    5,
    12345674,
    41.3825, 
    2.1769, 
    'Barcelona',
    '2022-12-19',
    '16:30',
    'No recogido',
    'Pendiente',
    'Limpiar el exterior',
    '',
    41.3825, 
    2.1769, 
    'Barcelona',
    'LimpiAuto'
);
CALL Insert_appointment(
    '3456fdh',
    5,
    12345674,
    41.3825, 
    2.1769, 
    'Barcelona',
    '2021-12-19',
    '16:30',
    'No recogido',
    'Cancelada',
    'Limpiar el exterior',
    '',
    41.3825, 
    2.1769, 
    'Barcelona',
    'LimpiAuto'
);
CALL Insert_appointment(
    '3456fdh',
    5,
    12345674,
    41.3825, 
    2.1769, 
    'Barcelona',
    '2021-12-19',
    '16:30',
    'Entregado',
    'Aceptada',
    'Limpiar el exterior',
    '',
    41.3825, 
    2.1769, 
    'Barcelona',
    'LimpiAuto'
);
CALL Insert_appointment(
    '3456fdh',
    5,
    12345674,
    41.3825, 
    2.1769, 
    'Barcelona',
    '2021-12-19',
    '16:30',
    'Entregado',
    'Aceptada',
    'Limpiar el exterior',
    '',
    41.3825, 
    2.1769, 
    'Barcelona',
    'LimpiAuto'
);


/*-------------------------------*/

CALL Insert_review(1, 'Todo correcto, muy puntual', 5);
CALL Insert_review(2, 'Dejo el coche aparcado al sol', 4);
CALL Insert_review(3, 'Me ha rozado el coche', 0);
