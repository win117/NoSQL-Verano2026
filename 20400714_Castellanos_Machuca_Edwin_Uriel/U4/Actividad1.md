Actividad 1 Unidad 4
Diseño de API REST: Servicio de Películas
Alumno: Edwin Uriel Castellanos Machuca No. de Control: 20400714 Instituto Tecnológico de Tepic


Estructura del recurso
Cada película se representa con el siguiente objeto JSON:

{

  "id": 1,

  "nombre": "El Padrino",

  "director": "Francis Ford Coppola",

  "año": 1972,

  "duracion": 175,

  "genero": "Drama"

}

Campo
Tipo
Descripción
id
Number
Identificador único de la película
nombre
String
Título de la película
director
String
Nombre del director
año
Number
Año de estreno
duracion
Number
Duración en minutos
genero
String
Género cinematográfico


Recurso base: /peliculas


1. Crear una película




Método HTTP
POST
URI
/peliculas


JSON enviado:

{

  "id": 1,

  "nombre": "El Padrino",

  "director": "Francis Ford Coppola",

  "año": 1972,

  "duracion": 175,

  "genero": "Drama"

}

JSON recibido:

{

  "code": 200,

  "msj": "Película creada"

}



2. Consultar una película por su ID




Método HTTP
GET
URI
/peliculas/{id}


Ejemplo: GET /peliculas/1

JSON enviado: ninguno (el ID viaja en la URI).

JSON recibido:

{

  "code": 200,

  "msj": "Película encontrada",

  "data": {

    "id": 1,

    "nombre": "El Padrino",

    "director": "Francis Ford Coppola",

    "año": 1972,

    "duracion": 175,

    "genero": "Drama"

  }

}



3. Actualizar el año, director y duración de una película por su ID




Método HTTP
PUT
URI
/peliculas/{id}


Ejemplo: PUT /peliculas/1

JSON enviado: solo los campos actualizables.

{

  "director": "F. F. Coppola",

  "año": 1973,

  "duracion": 177

}

JSON recibido:

{

  "code": 200,

  "msj": "Película actualizada"

}

Posibles errores:

{ "code": 400, "msj": "Datos inválidos" }

{ "code": 404, "msj": "Película no encontrada" }


4. Borrar una película




Método HTTP
DELETE
URI
/peliculas/{id}


Ejemplo: DELETE /peliculas/1

JSON enviado: ninguno (el ID viaja en la URI).

JSON recibido:

{

  "code": 200,

  "msj": "Película eliminada"

}



