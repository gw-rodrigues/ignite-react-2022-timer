/**
 * Immer -> biblioteca para trabalhar estado imutáveis.
 *    quando precisamos fazer alterações nosso array, especifica
 *    posição, ou uso de .map, etc... immer ajudar a simplificar
 *    no final faz a conversão.
 */
import { produce } from 'immer'
import { EActionsTypes } from './actions'

export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface ICycleState {
  cycles: ICycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: ICycleState, action: any) {
  switch (action.type) {
    case EActionsTypes.ADD_NEW_CYCLE:
      /*
      //Código antigo
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
      */
      /**
       * Produce - Immer -> recebe vários parâmetros.
       *
       * param 1 -> qual state queremos modificar
       * param 2 -> função, (draft)- o rascunho que ira ser
       * modificado final, mesmo tipagem que o param 1 - state.
       *
       * sendo assim, no draft podemos usar métodos "push" ou "="
       * para definir os valores.
       */
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case EActionsTypes.INTERRUPT_CURRENT_CYCLE: {
      /*
      //Código antigo
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
      */
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptDate = new Date()
      })
    }

    case EActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      /*
      //Código antigo 
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      } 
      */
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }

    default:
      return state
  }
}
