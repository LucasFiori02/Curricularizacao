import express from "express";
import { supabase } from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Role padrão para novos usuários
const rolePadrao = "voluntario";

// Cadastro 
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }


    const { data: existente, error: errorBusca } = await supabase // verificar se email já existe no banco
      .from("app_users")
      .select("*")
      .eq("email", email)
      .single();

    if (errorBusca && errorBusca.code !== "PGRST116") { // PGRST116 = nenhum registro encontrado
      console.error("Erro ao buscar email:", errorBusca);
      return res.status(500).json({ message: "Erro ao verificar email" });
    }

    if (existente) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Hash da senha
    const senha_hash = await bcrypt.hash(senha, 10);

    // Inserir usuário no Supabase
    const { data, error } = await supabase
      .from("app_users")
      .insert([{ nome, email, senha_hash, role: rolePadrao }])
      .select();

    if (error) {
      console.error("Erro ao inserir usuário:", error);
      return res.status(400).json({ message: error.message });
    }

    res.json({ message: "Usuário cadastrado com sucesso", user: data[0] });
  } catch (err) {
    console.error("Erro inesperado no register:", err);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

// Login de usuário
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    // Buscar usuário pelo email
    const { data, error } = await supabase
      .from("app_users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return res.status(400).json({ message: "Email ou senha incorretos" });
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, data.senha_hash);
    if (!senhaValida) {
      return res.status(400).json({ message: "Email ou senha incorretos" });
    }

    // Retornar dados do usuário sem a senha
    const { senha_hash, ...user } = data;
    res.json({ message: "Login realizado com sucesso", user });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

export default router;
