import { differenceInSeconds } from "date-fns"
import { createContext, ReactNode, useEffect, useReducer, useState } from "react"
import { ActionType, Cycle } from "../@types/cycles"
import { cyclesReducer } from "../reducers/cycles"

interface CycleFormData {
  task: string 
  minutesAmount: number
}
interface CycleContextType {
  cycles: Cycle[],
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number

  createNewCycle: (data: CycleFormData) => void 
  updateAmountSecondsPassed: (seconds: number) => void 
  markActiveCycleAsFinished: () => void 
  interruptActiveCycle: () => void 
  finishActiveCycle: () => void 
  cleanCyclesStored: () => void 
}

export const CycleContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

const LOCAL_STORAGE_KEY = "@ignite-tg:cycles-state-1.0"

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [ cycleState, dispatch ] = useReducer(cyclesReducer, 
    {
      cycles: [],
      activeCycleId: null
    }, (initialState) => {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if(storedData) {
        const parsedData = JSON.parse(storedData)
        return parsedData
      }
      return initialState
    }
  )

  const { cycles, activeCycleId } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [ amountSecondsPassed, setAmountSecondsPassed, ] = useState<number>(() => {
    if(activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })


  useEffect(() => {
    const storeData = JSON.stringify(cycleState)
    localStorage.setItem(LOCAL_STORAGE_KEY, storeData)

  }, [cycleState])

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
  function finishActiveCycle() {
    dispatch({
      type: ActionType.FINISHE_ACTIVE_CYLE,
      payload: {
        activeCycleId
      }
    })
  }
  function updateAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function cleanCyclesStored() {
    localStorage.clear()
    dispatch({
      type: ActionType.CLEAR_STORADE_CYCLES,
    })
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
      interruptActiveCycle,
      finishActiveCycle,
      cleanCyclesStored
    }}>
      {children}
    </CycleContext.Provider>
  )
}