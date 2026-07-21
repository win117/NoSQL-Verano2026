// El frontend se sirve desde el mismo Express, asi que las rutas son relativas.
// Si quieres apuntar a otro servidor, pon aqui la URL completa de Vercel.
const API_URL = "";

// Obtener peliculas
async function obtenerPeliculas() {

    const respuesta = await fetch(`${API_URL}/peliculas`);

    if (!respuesta.ok) {
        throw new Error("Error al consultar las películas");
    }

    return await respuesta.json();

}

// Agregar pelicula
async function agregarPelicula(pelicula) {

    const respuesta = await fetch(`${API_URL}/peliculas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pelicula)
    });

    if (!respuesta.ok) {
        throw new Error("Error al guardar la película");
    }

    return await respuesta.json();

}

// Eliminar pelicula
async function eliminarPelicula(id) {

    const respuesta = await fetch(`${API_URL}/peliculas/${id}`, {
        method: "DELETE"
    });

    if (!respuesta.ok) {
        throw new Error("Error al eliminar la película");
    }

    return await respuesta.json();

}
