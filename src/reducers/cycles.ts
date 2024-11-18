import { produce } from "immer"
import { ActionType, CycleState } from "../@types/cycles"

export function cyclesReducer(state: CycleState, action: any){
  switch(action.type) {

    case ActionType.ADD_NEW_CYCLE:
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionType.INTERRUPT_ACTIVE_CYCLE:
      const activeCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCycleId
      })

      if(activeCycleIndex < 0) {
        return state 
      } 

      return produce(state, draft => {
        draft.activeCycleId = null 
        draft.cycles[activeCycleIndex].interruptDate = new Date()
      })

    case ActionType.MARK_ACTIVE_CYCLE_AS_FINISHED:
      const activeCycleindexToMarkAsFinished = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCycleId
      })

      if(activeCycleindexToMarkAsFinished > 0) {
        return state 
      }

      return produce(state, draft => {
        draft.activeCycleId = null
        draft.cycles[activeCycleindexToMarkAsFinished].finishedDate = new Date()
      })
    default: 
      return state 
  }
}