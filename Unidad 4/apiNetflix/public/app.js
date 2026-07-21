const formulario = document.getElementById("formulario");
const btnConsultar = document.getElementById("btnConsultar");
const listaPeliculas = document.getElementById("listaPeliculas");
const mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, esError) {
    mensaje.textContent = texto;
    mensaje.style.color = esError ? "red" : "green";
}

async function cargarPeliculas() {

    try {
        const peliculas = await obtenerPeliculas();

        listaPeliculas.innerHTML = "";

        if (peliculas.length === 0) {
            listaPeliculas.innerHTML = "<li>No hay películas registradas</li>";
            return;
        }

        peliculas.forEach((pelicula) => {

            const li = document.createElement("li");
            li.textContent = `${pelicula.titulo} - ${pelicula.genero} - ${pelicula.duracion} min `;

            const btnBorrar = document.createElement("button");
            btnBorrar.textContent = "Eliminar";
            btnBorrar.addEventListener("click", async () => {
                try {
                    await eliminarPelicula(pelicula._id);
                    mostrarMensaje("Película eliminada", false);
                    cargarPeliculas();
                } catch (error) {
                    mostrarMensaje(error.message, true);
                }
            });

            li.appendChild(btnBorrar);
            listaPeliculas.appendChild(li);

        });

    } catch (error) {
        mostrarMensaje(error.message, true);
    }

}

formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const pelicula = {
        titulo: document.getElementById("titulo").value,
        genero: document.getElementById("genero").value,
        duracion: Number(document.getElementById("duracion").value)
    };

    try {
        await agregarPelicula(pelicula);
        mostrarMensaje("Película registrada correctamente", false);
        formulario.reset();
        cargarPeliculas();
    } catch (error) {
        mostrarMensaje(error.message, true);
    }

});

btnConsultar.addEventListener("click", cargarPeliculas);

// Carga inicial
cargarPeliculas();
