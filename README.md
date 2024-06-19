# API REST DE HOTEL
 Esta aplicación permite gestionar los clientes, habitaciones, productos y reservas de una empresa hotelera.


 ## Lanzar la aplicacion
asegurarse que estén instaladas estas dependencias 
```
"dependencies": {
    "body-parser": "^1.20.2",
    "express": "^4.19.2",
    "joi": "^17.13.1",
    "moment": "^2.30.1",
    "nodemon": "^3.1.0",
    "pg": "^8.11.5",
    "sequelize": "^6.37.2"
  },
  "devDependencies": {
    "sequelize-cli": "^6.6.2"
  }
```
 En caso de no estar instaladas, se debe correr el siguiente comando para instalarlas: 

```npm install```

A continuación, se puede lanzar la aplicacion. Por defecto la aplicación se inicia en el puerto 3001 pero se puede cambiar a otro valor siemplemente configurando la variable de entorno PORT en su sistema operativo. 

Correr el comando

 ```npm run dev```






 ## Base de datos 
Esta aplicación utiliza una base de datos postgres que nos permite persistir la informacion para realizar operaciones de consulta, creación, modificación y eliminación de Clientes, Habitaciones, Productos, Reservas y registros. Con pequeños cambios en la configuracion se puede utilizar con otros motores de base de datos.

## Modelo de datos
El modelo de datos posee 7 tablas
* Clientes
* Habitaciones
* Reservas
* Productos
* RegistroHabis
* reservaProdus
* RegistroProdus

# Diagrama de base de datos 

![Diagrama de base de datos](./imagen/diagrama%20de%20base%20de%20datos.png
)

 ## Si ya se tiene Docker y dbeaver
 Hacer correr el siguiente comando

  ```npx sequelize-cli db:migrate```



# Endpoints de la aplicación

### Clientes

| verbo |  endpoint  |descripcion|
|-------|------------|-----------|
|  GET  |/clientes/:dni|Recupera un Cliente por su DNI|
|  GET  |/clientes     |Recupera el total de Clientes registrados|
| POST  |/clientes     |Crea un nuevo Cliente|
|DELETE|/clientes/:dni |Elimina un Cliente por su DNI| 


### Productos

| verbo |  endpoint  |descripcion|
|-------|------------|-----------|
|  GET  |/productos/:id|Recupera un Producto por su ID|
|  GET  |/productos     |Recupera el total de Productos existentes|
| POST  |/productos     |Crea un nuevo Producto|
|DELETE|/productos/:id |Elimina un Producto por su ID|


### Habitaciones 

| verbo |  endpoint  |descripcion|
|-------|------------|-----------|
|  GET  |/habitaciones/:num|Recupera una Habitación por su número|
|  GET  |/habitaciones|Recupera el total de Habitaciones existentes|
| POST  |/habitaciones |Crea una nueva Habitación|
|DELETE|/habitaciones/:id|Elimina una Habitación por su número|



### Registros

| verbo |  endpoint  |descripcion|
|-------|------------|-----------|
|  GET  |/Registros/habitaciones/:id|Recupera un Registro de Habitación por su ID|
|  GET  |/Registros/habitaciones|Recupera el total de Registro de Habitaciones existentes|
|  GET  |/Registros/habitaciones/vencidos|Recupera el total de Registros de Habitaciones vencidas existentes|
|  GET  |/Registros/productos/:id|Recupera un Registro de un Producto por su ID|
|  GET  |/Registros/productos|Recupera el total de Registros de Productos existentes|
|  GET  |/Registros/productos/vencidos|Recupera el total de Registros de Productos vencidos existentes|
| POST  |/Registros/habitaciones/checkin/:id |Realiza el check-in de una Habitación|
| POST  |/Registros/productos/checkin/:id |Realiza el check-in de un Producto|
| PUT  |/Registros/habitaciones/checkout/:id |Realiza el check-out de una habitación|
| PUT  |/Registros/habitaciones/:id |Realiza modificaciones de una Habitación existente|
| PUT  |/Registros/productos/:id |Realiza modificaciones de un Producto existente|
|DELETE|/Registros/habitaciones/:id|Elimina un Registro de una Habitación por su ID|
|DELETE|/Registros/productos/:id|Elimina un Registro de un Producto por su ID|


### Reservas

| verbo |  endpoint  |descripcion|
|-------|------------|-----------|
|  GET  |/reservas/habitaciones/:id|Recupera una Reserva de Habitación por su ID|
|  GET  |/reservas/habitaciones|Recupera el total de Reservas de Habitaciones existentes|
|  GET  |/reservas/habitaciones/vencidos|Recupera el total de Reservas de Habitaciones vencidas existentes|
|  GET  |/reservas/productos/:id|Recupera una Reserva de un Producto por su ID|
|  GET  |/reservas/productos|Recupera el total de Reservas de Productos existentes|
|  GET  |/reservas/productos/vencidos|Recupera el total de Reservas de Productos vencidas existentes|
| POST  |/reservas/habitaciones/:num |Crea una nueva Reserva de Habitación para el número especificado|
| POST  |/reservas/productos/:id |Crea una nueva Reserva de un Producto|
| PUT  |/reservas/habitaciones/:id |Realiza  modificaciones en una Reserva de una habitación|
| PUT  |/reservas/productos/:id |Realiza modificaciones en una Reserva de un Producto existente|
|DELETE|/reservas/habitaciones/:id|Elimina una Reserva de una Habitación por su ID|
|DELETE|/reservas/productos/:id|Elimina una Reserva de un Producto por su ID|



### cURL para

* Crear Cliente

```
curl --location 'http://localhost:3001/clientes'\
--header 'Content-Type: application/json' \
--data '{
            "dni": 123578,
            "nombre": "Julia",
            "apellido": "Avalos", 
            "fechaNacimiento": "1971-10-20", 
            "email": "leo@yahoo.com",
            "tarjeta": 123
        }'

```
* Crear Habitaciones

```
curl --location 'http://localhost:3001/Habitaciones' \
--header 'Content-Type: application/json' \
--data '{
            "numero": 3,
            "Estrellas": 2,
            "CantPersonas": 4, 
            "Precio": 15000
        }'
```



* Crear Reservas de Habitaciones
```
curl --location 'http://localhost:3001/Reservas/Habitaciones/8' \
--header 'Content-Type: application/json' \
--data '{
            "CantPersonas": 3,
            "FechaIngreso": "2024-05-17", "CantDias": 10,
            "FechaEgreso": "2024-05-25",
            "Precio": 200000
        }'
```

* Crear Reservas Productos

```
curl --location 'http://localhost:3001/Reservas/Productos/5' \
--header 'Content-Type: application/json' \
--data '{
            "CantPersonas": 3,
            "FechaIngreso": "2024-05-17", "CantDias": 10,
            "FechaEgreso": "2024-05-25", "Precio": 200000
        }'
```

* CheckIn Registros Habitaciones por ID

```
curl --location 'http://localhost:3001/Registros/habitaciones/checkin/488' \
--header 'Content-Type: application/json' \
--data '{
            "CantPersonas": 3,
            "FechaIngreso": "2024-05-17",
            "CantDias": 10,
            "FechaEgreso": "2024-05-25",
            "Precio": 200000
        }'
```


* CheckIn Registros Productos By ID

```
curl --location 'http://localhost:3001/Registros/Productos/checkin/14' \
--header 'Content-Type: application/json' \
--data '{
           "CantPersonas": 3,
           "FechaIngreso": "2024-05-17",
           "CantDias": 10,
           "FechaEgreso": "2024-05-25",
           "Precio": 200000
        }'
```
 
* Modificar Reservas Habitaciones By ID
```
curl --location --request PUT 'http://localhost:3001/reservas/habitaciones/8' \
--header 'Content-Type: application/json' \
--data '{
    "CantPersonas": 2,
    "FechaIngreso": "2024-05-20",
    "CantDias": 7,
    "FechaEgreso": "2024-05-27",
    "Precio": 180000
}'
```

* Modificar Reservas Productos

```
curl --location --request PUT 'http://localhost:3001/reservas/productos/5' \
--header 'Content-Type: application/json' \
--data '{
    "CantPersonas": 4,
    "FechaIngreso": "2024-05-18",
    "CantDias": 8,
    "FechaEgreso": "2024-05-26",
    "Precio": 220000
}'
```


* Modificar Registros Productos By ID

```
curl --location --request PUT 'http://localhost:3001/Registros/Productos/14' \
--header 'Content-Type: application/json' \
--data '{
    "CantPersonas": 4,
    "FechaIngreso": "2024-05-16",
    "CantDias": 12,
    "FechaEgreso": "2024-05-28",
    "Precio": 250000
}'

```
* CheckOut Registros Habitaciones By ID
```
curl --location --request PUT 'http://localhost:3001/Registros/habitaciones/checkout/488' \
--header 'Content-Type: application/json' \
--data '{
    "FechaCheckOut": "2024-05-25"
}'



```

* Modificar Registros Habitaciones By ID

```
curl --location --request PUT 'http://localhost:3001/Registros/habitaciones/488' \
--header 'Content-Type: application/json' \
--data '{
    "CantPersonas": 2,
    "FechaIngreso": "2024-05-18",
    "CantDias": 5,
    "FechaEgreso": "2024-05-23",
    "Precio": 150000
}'
```