import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #444;
  margin-bottom: 5px;
  font-family: Arial, sans-serif;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: Arial, sans-serif;

  &:focus {
    border-color: #ffb703;
    outline: none;
    box-shadow: 0px 0px 5px rgba(255, 183, 3, 0.5);
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  background: linear-gradient(90deg, #ffba08, #faa307);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #faa307, #ffba08);
  }

  &:active {
    transform: scale(0.98);
  }
`;
