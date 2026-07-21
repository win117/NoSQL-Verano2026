const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

// Cadena de conexion a MongoDB Atlas
// El caracter @ de la contrasena va codificado como %40
const MONGO_URI = "mongodb+srv://Edwin:12345678%40@cluster0.krogocc.mongodb.net/netflix?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI).then(()=>{

  console.log("Conectado correctamente a mongo DB");
}).catch((error)=>{
  console.error("Error al conectar a mongoDB",error);
});

app.use(morgan("dev"));

// Frontend: sirve public/index.html, public/api.js y public/app.js
app.use(express.static(path.join(__dirname, "public")));

const peliculaSchema = new mongoose.Schema(
  {
    titulo:{type: String,required:true,trim:true},
    genero:{type: String,required:true,trim:true},
    duracion:{type: Number,required:true,min:1}

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
    temporadas:{type: Number,required:true,min:1}

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
    const { titulo, genero, duracion } = req.body;

    if (!titulo || !genero || !duracion) {
      return res.status(400).json({
        mensaje: "Faltan datos de la pelicula",
      });
    }

    const nuevaPelicula = new Pelicula({
      titulo: titulo,
      genero: genero,
      duracion: duracion,
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
    const { titulo, genero, duracion } = req.body;

    if (!titulo || !genero || !duracion) {
      return res.status(400).json({
        mensaje: "Faltan datos de la pelicula",
      });
    }

    const peliculaActualizada = await Pelicula.findByIdAndUpdate(
      req.params.id,
      { titulo, genero, duracion },
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
    const { titulo, genero, temporadas } = req.body;

    if (!titulo || !genero || !temporadas) {
      return res.status(400).json({
        mensaje: "Faltan datos de la serie",
      });
    }

    const nuevaSerie = new Serie({
      titulo: titulo,
      genero: genero,
      temporadas: temporadas,
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
    const { titulo, genero, temporadas } = req.body;

    if (!titulo || !genero || !temporadas) {
      return res.status(400).json({
        mensaje: "Faltan datos de la serie",
      });
    }

    const serieActualizada = await Serie.findByIdAndUpdate(
      req.params.id,
      { titulo, genero, temporadas },
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

app.get("/pagina", (req, res) => {
  const nombre = "Alfredo";
  res.send(`
    <style>
      .p1 {
        color: red;
        background: black;
      }
    </style>

    <h1>Mi catalogo</h1>
    <p class="p1"> Creada con Express</p>
    <p> Hola ${nombre}</p>
  `);
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

app.get("/suma/:a/:b", (req, res) => {
  const a = parseInt(req.params.a);
  const b = Number(req.params.b);

  res.send(`Resultado: ${a + b}`);
});

app.get("/multiplicar/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  res.send(`Resultado: ${a * b}`);
});

app.get("/aleatorio", (req, res) => {
  const numero = Math.floor(Math.random() * 100) + 1;
  res.send(`Numero generado: ${numero}`);
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en localhost:${PORT}`);
});

// Vercel necesita la app exportada
module.exports = app;
