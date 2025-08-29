import express from "express";
import { supabase } from "../db.js";

const router = express.Router();

// -----------------------------
// Cadastro de animal (POST)
// -----------------------------
router.post("/", async (req, res) => {
  try {
    const {
      nome,
      tipo,
      porte,
      sexo,
      idade_meses,
      descricao,
      saude,
      necessidades_especiais,
      fotos // array de URLs das fotos
    } = req.body;

    // Inserir animal
    const { data: animalData, error: animalError } = await supabase
      .from("animals")
      .insert([{
        nome,
        tipo,
        porte,
        sexo,
        idade_meses,
        descricao,
        saude,
        necessidades_especiais
      }])
      .select();

    if (animalError) throw animalError;

    const animalId = animalData[0].id;

    // Inserir fotos, se houver
    let fotosData = [];
    if (fotos && fotos.length > 0) {
      const fotosArray = fotos.map((url, index) => ({
        animal_id: animalId,
        url,
        is_capa: index === 0 // primeira foto como capa
      }));

      const { data: fotosInsert, error: fotosError } = await supabase
        .from("animal_photos")
        .insert(fotosArray)
        .select();

      if (fotosError) throw fotosError;

      fotosData = fotosInsert;
    }

    res.json({ message: "Animal cadastrado", animal: animalData[0], fotos: fotosData });

  } catch (err) {
    console.error("Erro ao cadastrar animal:", err.message);
    res.status(500).json({ message: "Erro ao cadastrar animal" });
  }
});

// -----------------------------
// Listar animais (GET)
// Pode receber ?id=UUID para buscar um animal específico
// -----------------------------
router.get("/", async (req, res) => {
  try {
    const { id } = req.query;

    // Buscar todos os animais com suas fotos
    const { data, error } = await supabase
      .from("animals")
      .select(`
        *,
        animal_photos(*)
      `);

    if (error) throw error;

    let result = data;

    if (id) {
      result = data.filter(animal => animal.id === id);
      if (result.length === 0) {
        return res.status(404).json({ message: "Animal não encontrado" });
      }
    }

    res.json(result);

  } catch (err) {
    console.error("Erro ao buscar animais:", err.message);
    res.status(500).json({ message: "Erro ao buscar animais" });
  }
});

export default router;
