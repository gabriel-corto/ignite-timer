export interface Cycle {
  id: string 
  task: string 
  minutesAmount: number 
  startDate: Date 
  interruptDate?: Date 
  finishedDate?: Date 
}

export interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}
export enum ActionType {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_ACTIVE_CYCLE = "INTERRUPT_ACTIVE_CYCLE",
  MARK_ACTIVE_CYCLE_AS_FINISHED = "MARK_ACTIVE_CYCLE_AS_FINISHED"
}