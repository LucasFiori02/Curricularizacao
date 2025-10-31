import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/users.js";
import adoptionRoutes from "./routes/adoption.js";
import animalRoutes from "./routes/animals.js";

// Corrigir caminhos absolutos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve arquivos estáticos da pasta src (onde estão HTML, CSS, JS, img)
app.use(express.static(path.join(__dirname, "../")));

// ✅ Rota inicial (abre seu initial.html, por exemplo)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../initial.html"));
});

// ✅ Suas rotas existentes
app.use("/usuarios", userRoutes);
app.use("/adocoes", adoptionRoutes);
app.use("/animais", animalRoutes);

// ✅ Inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
