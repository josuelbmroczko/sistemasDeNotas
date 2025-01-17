import React, { useEffect, useState } from "react";
import { NotasContainer, Tabela, InputSearch } from "./NotasFiscais.styles";

const PutNotasFiscais = () => {
  const [notas, setNotas] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [notasFiltradas, setNotasFiltradas] = useState([]);

  // Fetch dos dados do servidor
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin'); // Certifique-se de que a URL esteja correta
        const data = await response.json();
        setNotas(data);
        setNotasFiltradas(data); // Inicializa a lista filtrada com todos os dados
      } catch (error) {
        console.error("Erro ao buscar notas fiscais:", error);
      }
    };
    fetchNotas();
  }, []);

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato DD/MM/YYYY
  };

  // Função para filtrar notas com base no texto de pesquisa
  const handleSearch = (event) => {
    const query = event.target.value;
    setPesquisa(query);

    const filteredNotas = notas.filter(nota =>
      nota.cliente.toLowerCase().includes(query.toLowerCase()) ||
      nota.numero.toString().includes(query)
    );
    setNotasFiltradas(filteredNotas);
  };

  return (
    <NotasContainer>
      <h1>Notas Fiscais</h1>
      <div>
        <InputSearch
          type="text"
          placeholder="Pesquisar por número ou cliente"
          value={pesquisa}
          onChange={handleSearch} // Atualiza a pesquisa enquanto digita
        />
      </div>
      <Tabela>
        <thead>
          <tr>
            <th>Número</th>
            <th>Cliente</th>
            <th>Valor Total</th>
            <th>Data de Emissão</th>
            <th>Número de Série</th>
            <th>Data de Vencimento</th>
            <th>Produto/Serviço</th>
            <th>CNPJ Emissor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {notasFiltradas.map((nota) => (
            <tr key={nota.numero}>
              <td>{nota.numero}</td>
              <td>{nota.cliente}</td>
              <td>{parseFloat(nota.valor_total).toFixed(2)}</td>
              <td>{formatDate(nota.data_emissao)}</td>
              <td>{nota.numero_serie}</td>
              <td>{nota.data_vencimento}</td>
              <td>{nota.produto_servico}</td>
              <td>{nota.cnpj_emissor}</td>
              <td>{nota.status}</td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </NotasContainer>
  );
};

export default PutNotasFiscais;
