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
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case EActionsTypes.INTERRUPT_CURRENT_CYCLE:
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

    case EActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
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

    default:
      return state
  }
}
