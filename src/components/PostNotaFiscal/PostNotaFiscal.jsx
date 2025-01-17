import React, { useState } from "react";
import axios from "axios";
import { Container, Title, Form, Label, Input, Button } from "./PostNotaFiscal.styled";

const PostNotaFiscal = () => {
  const [formData, setFormData] = useState({
    numero: "",
    cliente: "",
    valor_total: "",
    data_emissao: "",
    numero_serie: "",
    data_vencimento: "",
    produto_servico: "",
    cnpj_emissor: "",
    status: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificar se todos os campos estão preenchidos
    const isEmptyField = Object.values(formData).some((field) => field.trim() === "");
    if (isEmptyField) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/admin", formData);
      alert(response.data.message); // Mensagem de sucesso ou erro
    } catch (error) {
      console.error("Erro ao enviar dados", error);
      alert("Erro ao criar nota fiscal!");
    }
  };
  
  return (
    <Container>
      <Title>Criar Nota Fiscal</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Número:</Label>
        <Input
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
        />

        <Label>Cliente:</Label>
        <Input
          type="text"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
        />

        <Label>Valor Total:</Label>
        <Input
          type="number"
          name="valor_total"
          value={formData.valor_total}
          onChange={handleChange}
        />

        <Label>Data de Emissão:</Label>
        <Input
          type="date"
          name="data_emissao"
          value={formData.data_emissao}
          onChange={handleChange}
        />

        <Label>Número de Série:</Label>
        <Input
          type="text"
          name="numero_serie"
          value={formData.numero_serie}
          onChange={handleChange}
        />

        <Label>Data de Vencimento:</Label>
        <Input
          type="date"
          name="data_vencimento"
          value={formData.data_vencimento}
          onChange={handleChange}
        />

        <Label>Produto ou Serviço:</Label>
        <Input
          type="text"
          name="produto_servico"
          value={formData.produto_servico}
          onChange={handleChange}
        />

        <Label>CNPJ Emissor:</Label>
        <Input
          type="text"
          name="cnpj_emissor"
          value={formData.cnpj_emissor}
          onChange={handleChange}
        />

        <Label>Status:</Label>
        <Input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />

        <Button type="submit">Criar Nota Fiscal</Button>
      </Form>
    </Container>
  );
};

export default PostNotaFiscal;
