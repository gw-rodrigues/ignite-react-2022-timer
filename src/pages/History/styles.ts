import styled from 'styled-components'

export const HistoryContainer = styled.div`
  flex: 1;
  padding: 3.5rem;

  width: 100%;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }

  @media (max-width: 765px) {
    padding: 3.5rem 0;
  }
`

export const HistoryList = styled.div`
  flex: 1;

  margin-top: 2rem;

  /* table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-400']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  } */
`
export const HistoryListRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  & + & {
    margin-top: 1rem;
  }

  background-color: ${(props) => props.theme['gray-600']};
  border-top: 4px solid ${(props) => props.theme['gray-400']};

  color: ${(props) => props.theme['gray-100']};
  font-size: 0.875rem;
  line-height: 1.6;

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

export const HistoryListCell = styled.div`
  flex: 1 0 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 0.875rem;
  line-height: 1.6;
  text-align: center;
  border: 1px solid ${(props) => props.theme['gray-800']};

  p {
    padding: 0.5rem;
  }

  p:first-child {
    width: 100%;
    font-size: 1rem;
    font-weight: 700;

    color: ${(props) => props.theme['gray-400']};
    background-color: ${(props) => props.theme['gray-700']};
  }
`

const STATUS_COLORS_LIST = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const
/**
 * {} as const -> significa que o text/objeto nao pode ser alterado, todas propriedades vai ser aquelas, e nao podem ser mudadas!
 */

interface IStatusColor {
  statusColor: keyof typeof STATUS_COLORS_LIST
}
/**
 * "keyof typeof" STATUS_COLORS_LIST -> significa que vai pegar as chaves e usar e usar os tipos dessas chaves com tipagem, exemplo: "red" | "green" | "yellow"
 */

export const Status = styled.span<IStatusColor>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) =>
      props.theme[STATUS_COLORS_LIST[props.statusColor]]};
  }
`
