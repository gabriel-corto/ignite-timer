import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem; 
  }
`
const BaseCountDownButton = styled.button`
  border: 0;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 0.5rem;
  
  cursor: pointer;
  transform: background-color 0.1s;
  
  color: ${props => props.theme["gray-100"]};
` 
export const StartCountDownButton = styled(BaseCountDownButton)`
  background: ${props => props.theme["green-500"]};

  &:not(:disabled):hover {
    background: ${props => props.theme["green-700"]};
  } 
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`
export const StopCountDownButton = styled(BaseCountDownButton)`
  background: ${props => props.theme["red-500"]};

  &:hover {
    background: ${props => props.theme["red-700"]};
  } 
  &:focus {
    box-shadow: 0px 0px 0px 2px ${props => props.theme["red-500"]};
  }
`