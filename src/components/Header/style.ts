import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${props => props.theme["gray-100"]};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-top: 3px solid ${props => props.theme["green-500"]};
        border-bottom: 3px solid ${props => props.theme["green-500"]};
      }

      &.active{
        color: ${props => props.theme["green-500"]};
      }
    }
  }
`
export const MarkCyleAsFinishedButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 0.5rem 1.5rem;
  font-size: 1rem;

  border: 0;
  border-radius: 8px;
  color: ${props => props.theme.white};
  background: ${props => props.theme["green-500"]};

  &:focus {
    box-shadow: 0px 0px 0px 2px ${props => props.theme["green-700"]};
  }
  &:hover {
    cursor: pointer;
    opacity: .9;
  }
  `