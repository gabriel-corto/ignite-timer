import { differenceInSeconds } from "date-fns"
import { createContext, ReactNode, useReducer, useState } from "react"

interface Cycle {
  id: string 
  task: string 
  minutesAmount: number 
  startDate: Date 
  interruptDate?: Date 
  finishedDate?: Date 
}

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

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [ cycleState, dispatch ] = useReducer((state: CycleState, action: any) => {
    
    switch(action.type) {
      case "ADD_NEW_CYCLE":
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id
        }
      case "INTERRUPT_ACTIVE_CYCLE":
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
      case "MARK_ACTIVE_CYCLE_AS_FINISHED":
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
  }, 
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
      type: "ADD_NEW_CYCLE",
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
      type: "INTERRUPT_ACTIVE_CYCLE",
      payload: {
        activeCycleId
      }
    })
  }

  function markActiveCycleAsFinished() {
    dispatch({
      type: "MARK_ACTIVE_CYCLE_AS_FINISHED",
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