import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CyclesContext } from '../../contexts/CycleContext'
import {
  HistoryContainer,
  HistoryList,
  HistoryListCell,
  HistoryListRow,
  Status,
} from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        {cycles.map((cycle) => (
          <HistoryListRow key={cycle.id}>
            <HistoryListCell>
              <p>Tarefa</p>
              <p>{cycle.task}</p>
            </HistoryListCell>
            <HistoryListCell>
              <p>Duração </p>
              <p>{cycle.minutesAmount}</p>
            </HistoryListCell>
            <HistoryListCell>
              <p>Início </p>
              <p>
                {formatDistanceToNow(new Date(cycle.startDate), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </p>
            </HistoryListCell>
            <HistoryListCell>
              <p>Status</p>
              <p>
                {cycle.finishedDate && (
                  <Status statusColor="green">Concluído</Status>
                )}
                {cycle.interruptDate && (
                  <Status statusColor="red">Interrompido</Status>
                )}
                {!cycle.finishedDate && !cycle.interruptDate && (
                  <Status statusColor="yellow">Em andamento</Status>
                )}
              </p>
            </HistoryListCell>
          </HistoryListRow>
        ))}
      </HistoryList>
    </HistoryContainer>
  )
}
