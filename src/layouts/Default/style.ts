import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  width: 70rem;
  height: calc(100vh - 12rem);
  margin:  5rem auto;
  padding: 2.5rem;
  
  border-radius: 8px;
  background: ${props => props.theme["gray-800"]};
  border: 3px solid ${props => props.theme["gray-600"]};
`