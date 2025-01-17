import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  margin: auto;
  max-width: 1200px; /* Adicionando uma largura máxima para evitar que a página fique muito esticada */
`;

export const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  max-height: 400px; /* Definindo uma altura maior para a tabela */
  overflow-y: auto;
  display: block;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
    position: sticky;
    top: 0; /* Isso fixa o cabeçalho no topo */
    z-index: 1; /* Garante que o cabeçalho sobreponha o conteúdo */
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;


export const Button = styled.button`
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.edit {
    background-color: #4caf50;
    color: white;
  }

  &.delete {
    background-color: #f44336;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: auto;
`;

export const Input = styled.input`
  padding: 10px;
  width:300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;
`;

