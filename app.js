const express = require("express");
const mysql = require('mysql2');
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());


// Habilitar CORS para todas as origens
const cors = require('cors');
app.use(cors());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  
  database: 'sistemadenotas',
});

// Testar a conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados");
  }
});

// Rota para ver as informações do banco de dados 'sistemadenotas'
app.get('/admin', (req, res) => {
  // Consultar todas as notas fiscais da tabela
  db.query('SELECT * FROM notas_fiscais', (err, results) => {
    if (err) {
      console.error("Erro ao buscar os dados:", err);
      return res.status(500).send("Erro ao buscar os dados");
    }
    // Enviar os resultados para o cliente
    res.status(200).json(results);
  });
});

// Rota POST para criar uma nova nota fiscal
app.post('/admin', async (req, res) => {
  console.log(req.body);

  const {
    numero, 
    cliente, 
    valor_total,
    data_emissao,
    numero_serie,
    data_vencimento,
    produto_servico,
    cnpj_emissor, 
    status
  } = req.body;

  // Inserção no banco de dados
  const query = `
    INSERT INTO notas_fiscais (numero, cliente, valor_total, data_emissao, numero_serie, data_vencimento, produto_servico, cnpj_emissor, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    numero,
    cliente,
    valor_total,
    data_emissao,
    numero_serie,
    data_vencimento,
    produto_servico,
    cnpj_emissor,
    status
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir dados", err);
      return res.status(500).json({ message: "Erro ao inserir nota fiscal", error: err });
    }
    return res.status(200).json({ message: "Nota fiscal criada com sucesso!", result });
  });
});



//////////////////////EDITAR

app.put('/admin/editar-tabela/:numero', async (req, res) => {
    const numero = req.params.numero; // Obtém o 'numero' da rota
    const {
      cliente,
      valor_total,
      data_emissao,
      numero_serie,
      data_vencimento,
      produto_servico,
      cnpj_emissor,
      status,
    } = req.body;
  
    try {
      // Atualiza os dados na tabela notas_fiscais
      const [resultNotas] = await db.promise().query(
        `UPDATE notas_fiscais
         SET 
           cliente = ?, 
           valor_total = ?, 
           data_emissao = ?, 
           numero_serie = ?, 
           data_vencimento = ?, 
           produto_servico = ?, 
           cnpj_emissor = ?, 
           status = ?
         WHERE numero = ?`,
        [
          cliente,
          valor_total,
          data_emissao,
          numero_serie,
          data_vencimento,
          produto_servico,
          cnpj_emissor,
          status,
          numero,
        ]
      );
  
      // Verifica se alguma linha foi afetada
      if (resultNotas.affectedRows === 0) {
        return res.status(404).json({ message: "Nota fiscal não encontrada." });
      }
  
      // Retorna uma mensagem de sucesso
      res.status(200).json({ message: "Nota fiscal atualizada com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar nota fiscal:", error);
      res.status(500).json({ message: "Erro ao atualizar nota fiscal.", error });
    }
  });
  
///deletar linha
app.delete('/admin/excluir/:numero', async (req, res) => {
    const { numero } = req.params; // Pega o 'numero' da URL
  
    try {
      // Excluir a nota fiscal com base no número fornecido
      const [result] = await db.promise().query('DELETE FROM notas_fiscais WHERE numero = ?', [numero]);
  
      // Verifica se alguma linha foi afetada
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Nota fiscal não encontrada.' });
      }
  
      return res.status(200).json({ message: 'Nota fiscal excluída com sucesso!' });
    } catch (err) {
      console.error("Erro ao excluir a nota fiscal:", err);
      return res.status(500).json({ message: "Erro ao excluir a nota fiscal", error: err });
    }
  });
  


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
