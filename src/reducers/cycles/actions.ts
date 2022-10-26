import { ICycle } from './reducer'

export enum EActionsTypes {
  // eslint-disable-next-line no-unused-vars
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  // eslint-disable-next-line no-unused-vars
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: ICycle) {
  return {
    type: EActionsTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: EActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: EActionsTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
