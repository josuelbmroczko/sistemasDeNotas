import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Title,
  Table,
  Button,
  Form,
  Input
} from './GerenciarNotas.styles'; // Importando os estilos

const GerenciarNotas = () => {
  const [notas, setNotas] = useState([]);
  const [filteredNotas, setFilteredNotas] = useState([]);
  const [formData, setFormData] = useState({
    numero: "",
    cliente: "",
    valor_total: "",
    data_emissao: "",
    numero_serie: "",
    data_vencimento: "",
    produto_servico: "",
    cnpj_emissor: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

  // Carregar notas fiscais
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin");
        setNotas(response.data);
        setFilteredNotas(response.data); // Inicialmente exibe todas as notas
      } catch (error) {
        console.error("Erro ao carregar notas fiscais:", error);
      }
    };
    fetchNotas();
  }, []);

  // Atualizar formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Iniciar edição
  const startEdit = (nota) => {
    setIsEditing(true);
    setFormData(nota);
  };

  // Confirmar edição
  const confirmEdit = async () => {
    const confirm = window.confirm("Tem certeza que deseja salvar as alterações?");
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:5000/admin/editar-tabela/${formData.numero}`, formData);
      alert("Nota fiscal atualizada com sucesso!");
      setIsEditing(false);
      setNotas(notas.map((nota) => (nota.numero === formData.numero ? formData : nota))); // Atualiza a nota fiscal editada na tabela
    } catch (error) {
      console.error("Erro ao editar nota fiscal:", error);
      alert("Erro ao editar nota fiscal!");
    }
  };

  // Excluir nota fiscal
  const deleteNota = async (numero) => {
    const confirm = window.confirm("Tem certeza que deseja excluir esta nota fiscal?");
    if (!confirm) return;

    try {
      const response = await axios.delete(`http://localhost:5000/admin/excluir/${numero}`);
      if (response.status === 200) {
        alert("Nota fiscal excluída com sucesso!");
        setNotas(notas.filter((nota) => nota.numero !== numero)); // Remove a nota excluída da tabela
      } else {
        alert("Erro ao excluir nota fiscal!");
      }
    } catch (error) {
      console.error("Erro ao excluir nota fiscal:", error);
      alert("Erro ao excluir nota fiscal!");
    }
  };

  // Função de pesquisa em tempo real
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = notas.filter((nota) => {
      return (
        nota.numero.toString().includes(value) ||
        nota.cliente.toLowerCase().includes(value.toLowerCase()) ||
        nota.valor_total.toString().includes(value) ||
        nota.data_emissao.includes(value)
      );
    });
    setFilteredNotas(filtered);
  };

  return (
    <Container>
      <Title>Gerenciar Notas Fiscais</Title>

      {/* Caixa de pesquisa */}
      <Input
        type="text"
        placeholder="Pesquise por número, cliente ou valor..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <Table>
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
          {filteredNotas.map((nota) => (
            <tr key={nota.numero}>
              <td>{nota.numero}</td>
              <td>{nota.cliente}</td>
              <td>{nota.valor_total}</td>
              <td>{nota.data_emissao}</td>
              <td>{nota.numero_serie}</td>
              <td>{nota.data_vencimento}</td>
              <td>{nota.produto_servico}</td>
              <td>{nota.cnpj_emissor}</td>
              <td>{nota.status}</td>
              <td>
                <Button className="edit" onClick={() => startEdit(nota)}>
                  Editar
                </Button>
                <Button className="delete" onClick={() => deleteNota(nota.numero)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isEditing && (
        <Form>
          <h3>Editar Nota Fiscal</h3>
          <Input
  type="text"
  name="cliente"
  value={formData.cliente}
  onChange={handleInputChange}
  placeholder="Cliente"
/>
<Input
  type="number"
  name="valor_total"
  value={formData.valor_total}
  onChange={handleInputChange}
  placeholder="Valor Total"
/>
<Input
  type="date"
  name="data_emissao"
  value={formData.data_emissao}
  onChange={handleInputChange}
  placeholder="Data de Emissão"
/>
<Input
  type="text"
  name="numero_serie"
  value={formData.numero_serie}
  onChange={handleInputChange}
  placeholder="Número de Série"
/>
<Input
  type="date"
  name="data_vencimento"
  value={formData.data_vencimento}
  onChange={handleInputChange}
  placeholder="Data de Vencimento"
/>
<Input
  type="text"
  name="produto_servico"
  value={formData.produto_servico}
  onChange={handleInputChange}
  placeholder="Produto/Serviço"
/>
<Input
  type="text"
  name="cnpj_emissor"
  value={formData.cnpj_emissor}
  onChange={handleInputChange}
  placeholder="CNPJ Emissor"
/>
<Input
  type="text"
  name="status"
  value={formData.status}
  onChange={handleInputChange}
  placeholder="Status"
/>
<Input
  type="number"
  name="numero"
  value={formData.numero}
  onChange={handleInputChange}
  placeholder="Número"
/>
          <Button className="edit" onClick={confirmEdit}>
            Salvar Alterações
          </Button>
          <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
        </Form>
      )}
    </Container>
  );
};

export default GerenciarNotas;
