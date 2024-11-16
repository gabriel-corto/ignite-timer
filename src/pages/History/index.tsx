import { useContext } from "react";
import { CycleContext } from "../../contexts/cyclesContext";

import { formatDistanceToNow} from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

import { HistoryContainer, HistoryList, Status } from "./style";

export function History() {

  const { cycles } = useContext(CycleContext) 

  return (
    <HistoryContainer>
      <h1>Histórico</h1>

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
            {cycles.map(cycle => {
              return (
                <tr>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{formatDistanceToNow(cycle.startDate, {
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
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  ) 
}