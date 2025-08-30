import express from "express";
import { supabase } from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configuração do Multer para salvar arquivos na pasta "uploads/"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


//(POST)
router.post("/", upload.array("fotos"), async (req, res) => {
  try {
    const {
      nome,
      tipo,
      porte,
      sexo,
      idade_meses,
      saude,
      status,
      necessidades_especiais,
      data_adocao,
      tutor_nome,
      tutor_contato,
      temperamento,
      data_resgate,
      peso,
    } = req.body;

    // Converte strings vazias em null, pois o PostgreSQL trata null como valor ausente
    const novoAnimal = {
      nome,
      tipo,
      porte,
      sexo,
      idade_meses,
      saude,
      status,
      necessidades_especiais: necessidades_especiais || null,
      data_adocao: data_adocao || null,
      tutor_nome: tutor_nome || null,
      tutor_contato: tutor_contato || null,
      temperamento,
      data_resgate: data_resgate || null,
      peso,
    };

    // Inserir animal
    const { data: animalData, error: animalError } = await supabase
      .from("animals")
      .insert([novoAnimal])
      .select();

    if (animalError) throw animalError;

    const animalId = animalData[0].id;

    // Inserir fotos no banco
    let fotosData = [];
    if (req.files && req.files.length > 0) {
      const fotosArray = req.files.map((file, index) => ({
        animal_id: animalId,
        url: `/uploads/${file.filename}`, // caminho para servir a imagem
        is_capa: index === 0,
      }));

      const { data: fotosInsert, error: fotosError } = await supabase
        .from("animal_photos")
        .insert(fotosArray)
        .select();

      if (fotosError) throw fotosError;
      fotosData = fotosInsert;
    }

    res.json({
      message: "Animal cadastrado",
      animal: animalData[0],
      fotos: fotosData,
    });
  } catch (err) {
    console.error("Erro ao cadastrar animal:", err.message);
    res.status(500).json({ message: "Erro ao cadastrar animal" });
  }
});

export default router;


//(GET)
router.get("/", async (req, res) => {
  try {
    const { id } = req.query;

    // Buscar os animais com suas fotos
    const { data, error } = await supabase.from("animals").select(`
        *,
        animal_photos(*)
      `);

    if (error) throw error;

    let result = data;

    if (id) {
      result = data.filter((animal) => animal.id === id);
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
