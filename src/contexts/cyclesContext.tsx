import { differenceInSeconds } from "date-fns"
import { createContext, ReactNode, useReducer, useState } from "react"
import { ActionType, Cycle } from "../@types/cycles"
import { cyclesReducer } from "../reducers/cycles"

interface CycleFormData {
  task: string 
  minutesAmount: number
}
interface CycleContextType {
  cycles: Cycle[],
  createNewCycle: (data: CycleFormData) => void 
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  updateAmountSecondsPassed: (seconds: number) => void 
  markActiveCycleAsFinished: () => void 
  interruptActiveCycle: () => void 
}

export const CycleContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [ cycleState, dispatch ] = useReducer(cyclesReducer, 
  {
    cycles: [],
    activeCycleId: null
  })

  const [ amountSecondsPassed, setAmountSecondsPassed, ] = useState<number>(0)

  const { cycles, activeCycleId } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: CycleFormData) {
    const { task, minutesAmount } = data 

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: task,
      minutesAmount: minutesAmount,
      startDate: new Date()
    }

    dispatch({
      type: ActionType.ADD_NEW_CYCLE,
      payload: {
        newCycle
      }
    })

    setAmountSecondsPassed(
      differenceInSeconds(new Date, newCycle.startDate)
    )
  }

  function interruptActiveCycle() {
    dispatch({
      type: ActionType.INTERRUPT_ACTIVE_CYCLE,
      payload: {
        activeCycleId
      }
    })
  }

  function markActiveCycleAsFinished() {
    dispatch({
      type: ActionType.MARK_ACTIVE_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId
      }
    })
  }

  function updateAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  
  return(
    <CycleContext.Provider value={{ 
      cycles,
      createNewCycle,
      activeCycle,
      activeCycleId, 
      amountSecondsPassed,
      updateAmountSecondsPassed,
      markActiveCycleAsFinished,
      interruptActiveCycle
    }}>
      {children}
    </CycleContext.Provider>
  )
}