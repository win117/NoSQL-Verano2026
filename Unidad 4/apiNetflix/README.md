# API Netflix

API REST de peliculas y series hecha con Express y Mongoose (MongoDB).

## Instalacion

```bash
npm install
npm start
```

Servidor en `http://localhost:3000`, base de datos `mongodb://127.0.0.1:27017/netflix`.

## Endpoints

### Peliculas
| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/peliculas` | Lista todas las peliculas |
| GET | `/peliculas/:id` | Obtiene una pelicula |
| POST | `/peliculas` | Registra una pelicula |
| PUT | `/peliculas/:id` | Actualiza una pelicula |
| DELETE | `/peliculas/:id` | Elimina una pelicula |

Body: `{ "titulo": "Interestelar", "genero": "Ciencia ficcion", "duracion": 169 }`

### Series
| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/series` | Lista todas las series |
| GET | `/series/:id` | Obtiene una serie |
| POST | `/series` | Registra una serie |
| PUT | `/series/:id` | Actualiza una serie |
| DELETE | `/series/:id` | Elimina una serie |

Body: `{ "titulo": "Stranger Things", "genero": "Terror", "temporadas": 5 }`

### Rutas de ejemplo
`/`, `/mensaje`, `/pagina`, `/pelicula`, `/categorias`, `/mensaje/:nombre`, `/suma/:a/:b`, `/multiplicar/:a/:b`, `/aleatorio`
