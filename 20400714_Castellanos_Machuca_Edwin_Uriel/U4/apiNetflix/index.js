const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;


const MONGO_URI = "mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix";

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "clientNetflix")));

const peliculaSchema = new mongoose.Schema(
  {
    titulo:{type: String,required:true,trim:true},
    genero:{type: String,required:true,trim:true},
    año:{type: Number,required:true,min:1888},
    duracion:{type: Number,required:true,min:1},
    idioma:{type: String,required:true,trim:true},
    calificacion:{type: Number,required:true,min:0,max:10},
    nc:{type: String,trim:true},         
    portada:{type: String,trim:true}      

  },
  {
    timestamps:true
  }
);
const Pelicula = mongoose.model("Pelicula",peliculaSchema,"peliculas");

const serieSchema = new mongoose.Schema(
  {
    titulo:{type: String,required:true,trim:true},
    genero:{type: String,required:true,trim:true},
    año:{type: Number,required:true,min:1888},
    temporadas:{type: Number,required:true,min:1},
    episodios:{type: Number,required:true,min:1},
    idioma:{type: String,required:true,trim:true},
    calificacion:{type: Number,required:true,min:0,max:10},
    nc:{type: String,trim:true}           

  },
  {
    timestamps:true
  }
);
const Serie = mongoose.model("Serie",serieSchema,"series");

app.get("/peliculas", async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las peliculas",
      error: error
    });
  }
});

app.get("/peliculas/:id", async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) {
      return res.status(404).json({
        mensaje: "Pelicula no encontrada",
      });
    }
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la pelicula",
      error: error
    });
  }
});

app.post("/peliculas", async (req, res) => {
  try {
    const { titulo, genero, año, duracion, idioma, calificacion, nc, portada } = req.body;

    // calificacion puede ser 0, por eso se compara contra null/undefined
    if (!titulo || !genero || !año || !duracion || !idioma || calificacion == null) {
      return res.status(400).json({
        mensaje: "Faltan datos de la pelicula",
      });
    }

    const nuevaPelicula = new Pelicula({
      titulo: titulo,
      genero: genero,
      año: año,
      duracion: duracion,
      idioma: idioma,
      calificacion: calificacion,
      nc: nc,
      portada: portada,
    });

    const peliculaGuardada = await nuevaPelicula.save();

    res.status(201).json({
      mensaje: "Pelicula registrada correctamente",
      pelicula: peliculaGuardada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar la pelicula",
      error: error
    });
  }
});

app.put("/peliculas/:id", async (req, res) => {
  try {
    const { titulo, genero, año, duracion, idioma, calificacion, nc, portada } = req.body;

    if (!titulo || !genero || !año || !duracion || !idioma || calificacion == null) {
      return res.status(400).json({
        mensaje: "Faltan datos de la pelicula",
      });
    }

    const peliculaActualizada = await Pelicula.findByIdAndUpdate(
      req.params.id,
      { titulo, genero, año, duracion, idioma, calificacion, nc, portada },
      { new: true, runValidators: true }
    );

    if (!peliculaActualizada) {
      return res.status(404).json({
        mensaje: "Pelicula no encontrada",
      });
    }

    res.json({
      mensaje: "Pelicula actualizada correctamente",
      pelicula: peliculaActualizada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la pelicula",
      error: error
    });
  }
});

app.delete("/peliculas/:id", async (req, res) => {
  try {
    const peliculaEliminada = await Pelicula.findByIdAndDelete(req.params.id);

    if (!peliculaEliminada) {
      return res.status(404).json({
        mensaje: "Pelicula no encontrada",
      });
    }

    res.json({
      mensaje: "Pelicula eliminada correctamente",
      pelicula: peliculaEliminada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la pelicula",
      error: error
    });
  }
});

app.get("/series", async (req, res) => {
  try {
    const series = await Serie.find();
    res.json(series);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las series",
      error: error
    });
  }
});

app.get("/series/:id", async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);
    if (!serie) {
      return res.status(404).json({
        mensaje: "Serie no encontrada",
      });
    }
    res.json(serie);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la serie",
      error: error
    });
  }
});

app.post("/series", async (req, res) => {
  try {
    const { titulo, genero, año, temporadas, episodios, idioma, calificacion, nc } = req.body;

    if (!titulo || !genero || !año || !temporadas || !episodios || !idioma || calificacion == null) {
      return res.status(400).json({
        mensaje: "Faltan datos de la serie",
      });
    }

    const nuevaSerie = new Serie({
      titulo: titulo,
      genero: genero,
      año: año,
      temporadas: temporadas,
      episodios: episodios,
      idioma: idioma,
      calificacion: calificacion,
      nc: nc,
    });

    const serieGuardada = await nuevaSerie.save();

    res.status(201).json({
      mensaje: "Serie registrada correctamente",
      serie: serieGuardada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar la serie",
      error: error
    });
  }
});

app.put("/series/:id", async (req, res) => {
  try {
    const { titulo, genero, año, temporadas, episodios, idioma, calificacion, nc } = req.body;

    if (!titulo || !genero || !año || !temporadas || !episodios || !idioma || calificacion == null) {
      return res.status(400).json({
        mensaje: "Faltan datos de la serie",
      });
    }

    const serieActualizada = await Serie.findByIdAndUpdate(
      req.params.id,
      { titulo, genero, año, temporadas, episodios, idioma, calificacion, nc },
      { new: true, runValidators: true }
    );

    if (!serieActualizada) {
      return res.status(404).json({
        mensaje: "Serie no encontrada",
      });
    }

    res.json({
      mensaje: "Serie actualizada correctamente",
      serie: serieActualizada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la serie",
      error: error
    });
  }
});

app.delete("/series/:id", async (req, res) => {
  try {
    const serieEliminada = await Serie.findByIdAndDelete(req.params.id);

    if (!serieEliminada) {
      return res.status(404).json({
        mensaje: "Serie no encontrada",
      });
    }

    res.json({
      mensaje: "Serie eliminada correctamente",
      serie: serieEliminada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la serie",
      error: error
    });
  }
});

app.get("/mensaje", (req, res) => {
  res.send("Mensaje desde Express");
});


app.get("/pelicula", (req, res) => {
  res.json({
    titulo: "Interestelar",
    genero: "Ciencia ficcion",
    duracion: 169,
  });
});

app.get("/categorias", (req, res) => {
  res.json([
    {
      nombre: "Accion",
      horario: "8:00 - 11:00",
    },
    {
      nombre: "Comedia",
      horario: "14:00 - 17:00",
    },
  ]);
});

app.get("/mensaje/:nombre", (req, res) => {
  res.send(`Hola ${req.params.nombre}`);
});


async function iniciarServidor() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado correctamente a MongoDB");

    app.listen(PORT, () => {
      console.log("Servidor iniciado en http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("No se pudo conectar con MongoDB");
    console.error(error.message);
  }
}
iniciarServidor();

// Vercel necesita la app exportada
module.exports = app;
