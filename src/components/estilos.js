import styled from 'styled-components';

// Container principal
export const Container = styled.div`
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

// Título
export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
`;

// Container para os botões
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Link estilizado para os botões
export const StyledLink = styled.div`
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
