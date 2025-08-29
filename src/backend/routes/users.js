import express from "express";
import { supabase } from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Roles válidas de acordo com sua tabela
const rolesValidos = ["gestor", "voluntario"];

// Cadastro de usuário
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    // Valida role
    if (!rolesValidos.includes(role)) {
      return res.status(400).json({
        message: "Role inválida. Use 'gestor' ou 'voluntario'."
      });
    }

    // Hash da senha
    const senha_hash = await bcrypt.hash(senha, 10);

    // Inserir usuário no Supabase
    const { data, error } = await supabase
      .from("app_users")
      .insert([{ nome, email, senha_hash, role }])
      .select();

    if (error) throw error;

    res.json({ message: "Usuário cadastrado com sucesso", user: data[0] });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err.message);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

// Login de usuário
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

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
    console.error("Erro ao fazer login:", err.message);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

export default router;
