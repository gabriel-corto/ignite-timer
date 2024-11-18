import { ActionType, CycleState } from "../@types/cycles"

export function cyclesReducer(state: CycleState, action: any){
  switch(action.type) {
    case ActionType.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
    case ActionType.INTERRUPT_ACTIVE_CYCLE:
      const cycleListWithInterruptedOne = state.cycles.map(cycle => {
        if(cycle.id === state.activeCycleId) {
          return {...cycle, interruptDate: new Date()}
        } else {
          return cycle
        }
      })
      return {
        ...state, 
        cycles: cycleListWithInterruptedOne,
        activeCycleId: null
      }
    case ActionType.MARK_ACTIVE_CYCLE_AS_FINISHED:
      const cycleListWithFinishedOne = state.cycles.map(cycle => {
        if(cycle.id === state.activeCycleId) {
          return {...cycle, finishedDate: new Date()}
        } else {
          return cycle
        }
      }
      )
      return {
        ...state, 
        cycles: [cycleListWithFinishedOne]
      }
    default: 
      return state 
  }
}