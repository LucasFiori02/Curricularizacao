import express from "express";
import { supabase } from "../db.js";

const router = express.Router();

// Cadastro de candidato à adoção
router.post("/", async (req, res) => {
  try {
    const {
      nome_completo,
      cpf,
      email,
      telefone,
      data_nascimento,
      renda,
      cep,
      rua,
      numero,
      cidade,
      estado,
      bairro,
      complemento,
      possui_outros_animais,
      tipo_moradia,
      possui_espaco_animal,
      ja_adotou_animal,
      motivo_adocao,
      animal_interesse,
      tipo_moradia_pet,
      residencia_concorda,
      tem_outros_animais,
      quantos_quais,
      castrados_vacinados,
      residencia_tem_telas,
      animal_acesso_rua,
      condicoes_manter_animal,
      concorda_castracao,
      concorda_taxa_adocao,
      documentos_urls
    } = req.body;

    // Inserir no banco de dados
    const { data, error } = await supabase
      .from("adoption_applications")
      .insert([{
        nome_completo,
        cpf,
        email,
        telefone,
        data_nascimento,
        renda,
        cep,
        rua,
        numero,
        cidade,
        estado,
        bairro,
        complemento,
        possui_outros_animais,
        tipo_moradia,
        possui_espaco_animal,
        ja_adotou_animal,
        motivo_adocao,
        animal_interesse,
        tipo_moradia_pet,
        residencia_concorda,
        tem_outros_animais,
        quantos_quais,
        castrados_vacinados,
        residencia_tem_telas,
        animal_acesso_rua,
        condicoes_manter_animal,
        concorda_castracao,
        concorda_taxa_adocao,
        documentos_urls
      }])
      .select();

    if (error) throw error;

    res.json({ message: "Candidato à adoção cadastrado com sucesso", application: data[0] });
  } catch (err) {
    console.error("Erro ao cadastrar candidato:", err.message);
    res.status(500).json({ message: "Erro ao cadastrar candidato" });
  }
});

export default router;
