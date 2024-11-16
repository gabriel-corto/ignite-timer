import { differenceInSeconds } from "date-fns"
import { createContext, ReactNode, useState } from "react"

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
  markCurrentCycleAsFinished: () => void 
  interruptActiveCycle: () => void 
}

export const CycleContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}
export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [ cycles, setCycles ] = useState<Cycle[]>([])
  const [ activeCycleId, setActiveCycleId, ] = useState<string | null>(null)
  const [ amountSecondsPassed, setAmountSecondsPassed, ] = useState<number>(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: CycleFormData) {
    const { task, minutesAmount } = data 

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: task,
      minutesAmount: minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    setAmountSecondsPassed(
      differenceInSeconds(new Date, newCycle.startDate)
    )
  }

  function interruptActiveCycle() {
    const cycleListWithInterruptedOne = cycles.map(cycle => {
      if(cycle.id === activeCycleId) {
        return { ...cycle, interruptDate: new Date() }
      } else {
        return cycle
      }
    }
    )
    setCycles(cycleListWithInterruptedOne)
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    const cycleListWithFinishedOne = cycles.map(cycle => {
      if(cycle.id === activeCycle?.id) {
        return {...cycle, finishedDate: new Date()}
      } else {
        return cycle 
      }
    })

    setCycles(cycleListWithFinishedOne)
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
      markCurrentCycleAsFinished,
      interruptActiveCycle
    }}>
      {children}
    </CycleContext.Provider>
  )
}