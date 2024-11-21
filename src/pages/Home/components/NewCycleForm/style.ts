import { styled } from "styled-components"

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${props => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`
const BaseInput = styled.input`
  background: ${props => props.theme["gray-900"]};
  color: ${props => props.theme["gray-100"]};
  height: 2.5rem;
  border: 0;
  border-bottom: 1px solid ${props => props.theme["gray-500"]};
  font-size: 1.125rem;
  font-weight: bold;
  padding: 0 0.5rem;  
  border-radius: 4px;

  &:focus {
    box-shadow: none;
    border-color: ${props => props.theme["green-500"]};
  }

  &::placeholder{
    color: ${props => props.theme["gray-500"]};
  }
`
export const TaskInput = styled(BaseInput)`
  flex: 1;
`
export const MinuteAmountInput = styled(BaseInput)`
  width: 5rem;
  text-align: center;
`
