import express from "express";
import userRoutes from "./routes/users.js";
import adoptionRoutes from "./routes/adoption.js";
import animalRoutes from "./routes/animals.js";
import cors from "cors";



const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static('src')) // teste



// Rotas
app.use("/usuarios", userRoutes); //http://localhost:3000/usuarios
app.use("/adocoes", adoptionRoutes); //http://localhost:3000/adocoes
app.use("/animais", animalRoutes); //http://localhost:3000/animais


app.listen(3000, () => { // inicia servidor na porta :3000
  console.log("Servidor rodando em http://localhost:3000");
});
