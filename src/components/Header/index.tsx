import { NavLink } from "react-router-dom";

import { Timer, Scroll, CheckCircle } from "phosphor-react";

import { HeaderContainer, MarkCyleAsFinishedButton } from "./style";
import { useContext } from "react";
import { CycleContext } from "../../contexts/cyclesContext";

export function Header() {

  const { activeCycle, finishActiveCycle } = useContext(CycleContext)

  return(
    <HeaderContainer>
      <img src="/assets/logo.svg" />

      <nav>
        {
          activeCycle && (
            <MarkCyleAsFinishedButton onClick={finishActiveCycle}>
              <CheckCircle size={24} />
              Marcar como Finzalizado
            </MarkCyleAsFinishedButton>
          )
        }

        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}