import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://valsdicfpcljowgcygvy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbHNkaWNmcGNsam93Z2N5Z3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMzk1MDAsImV4cCI6MjA3MTkxNTUwMH0.ZCEXNLdLJqBVF4GWe9EByofFvWU3Ux2yDwJYEu8XoYs'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function testarConexao() {
  try {
    
    const { data, error } = await supabase
      .from('app_users')
      .select('*')
      .limit(5)

    if (error) {
      console.error('Erro ao consultar o banco:', error.message)
    } else {
      console.log('Conexão bem-sucedida! Registros encontrados:')
      console.log(data)
    }
  } catch (err) {
    console.error('Erro inesperado:', err)
  }
}

testarConexao()
