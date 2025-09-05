import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hola desde TypeScript + Express 🚀");
});
app.get("/cambio", (_req, res) => {
  res.send("Prueba de cambio 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
