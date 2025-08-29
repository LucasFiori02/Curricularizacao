import express from "express";
import userRoutes from "./routes/users.js";
import adoptionRoutes from "./routes/adoption.js";
import animalRoutes from "./routes/animals.js";

const app = express();
app.use(express.json());

// Rotas
app.use("/usuarios", userRoutes);
app.use("/adocoes", adoptionRoutes);
app.use("/animais", animalRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
