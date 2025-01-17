import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Estilização para o Container, Título e Links
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
  font-family: 'Arial', sans-serif;
  color: #333;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.1rem;
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  width: 250px;
  border: 1px solid #007bff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Bem-vindo ao Sistema de Notas Fiscais</Title>
      <ButtonContainer>
        <StyledLink to="/verNotas">Ver Notas Fiscais</StyledLink>
        <StyledLink to="/novo">Adicionar Nova Nota Fiscal</StyledLink>
        <StyledLink to="/GerenciarNotas">Gerenciar Notas Fiscais</StyledLink>
      </ButtonContainer>
    </Container>
  );
};

export default Home;
