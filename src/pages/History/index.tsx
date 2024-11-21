import { useContext } from "react";
import { CycleContext } from "../../contexts/cyclesContext";

import { formatDistanceToNow} from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

import { CleanCycleStorageButton, HistoryContainer, HistoryHeader, HistoryList, Status, WarningContainer } from "./style";
import { Backspace, WarningCircle } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function History() {

  const { cycles, activeCycle, cleanCyclesStored } = useContext(CycleContext) 

  return (
    <HistoryContainer>
      <HistoryHeader>
        <h1>Histórico</h1>

        {activeCycle?.id === undefined && cycles.length !== 0 && (
          <CleanCycleStorageButton onClick={cleanCyclesStored}>
            <Backspace size={24} />
            <span>Limpar Histórico</span>
          </CleanCycleStorageButton>
        )}
      </HistoryHeader>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.length !== 0 && (
              cycles.map(cycle => {
                return (
                  <tr>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>{formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR  
                    })}</td>
                    <td>
                      {cycle.finishedDate && <Status variant="completed">Concluído</Status>}
                      {cycle.interruptDate && <Status variant="interrupted">Interompido</Status>}
                      {!cycle.finishedDate && !cycle.interruptDate && 
                        <Status variant="in_progress">Em andamento</Status>
                      }
                    </td>
                  </tr>
                )
              })
            )}

            
          </tbody>
        </table>

        {cycles.length === 0 && (
          <WarningContainer>
            <WarningCircle size={58} />
            <strong>OPS! Não existe ciclo criado ainda.</strong>
            <span>Aproveite e crie um, e gerencie melhor o seu tempo</span>

            <NavLink to="/">
              Criar Novo Ciclo
            </NavLink>
          </WarningContainer>
        )}
      </HistoryList>
    </HistoryContainer>
  ) 
}