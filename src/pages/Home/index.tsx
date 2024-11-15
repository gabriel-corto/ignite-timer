import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { differenceInSeconds } from "date-fns"
import { HandPalm, Play } from "phosphor-react"

import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import { 
  CountDownContainer, 
  FormContainer, 
  HomeContainer, 
  MinuteAmountInput, 
  Separator, 
  StartCountDownButton, 
  StopCountDownButton, 
  TaskInput 
} from "./style"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5),
  minutesAmount: zod.number().min(5),
})

interface Cycle {
  id: string 
  task: string 
  minutesAmount: number 
  startDate: Date 
  interruptDate?: Date 
  finishedDate?: Date 
}
export function Home() {
  
  const [ cycles, setCycles ] = useState<Cycle[]>([])
  const [ activeCycleId, setActiveCycleId, ] = useState<string | null>(null)
  const [ amountSecondsPassed, setAmountSecondsPassed, ] = useState<number>(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalActiveCycleSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let cycleInterval: number 

    if(activeCycle) {
      cycleInterval = setInterval(() => {
        const secondsPassedSinceActiveCycleStarted = differenceInSeconds(
          new Date(), activeCycle.startDate
        )

        if(secondsPassedSinceActiveCycleStarted >= totalActiveCycleSeconds ) {
          const cycleListWithFinishedOne = cycles.map(cycle => {
            if(cycle.id === activeCycle.id) {
              return {...cycle, finishedDate: new Date()}
            } else {
              return cycle 
            }
          })

          setCycles(cycleListWithFinishedOne)
          clearInterval(cycleInterval)
          setAmountSecondsPassed(totalActiveCycleSeconds)

        } else {
          setAmountSecondsPassed(secondsPassedSinceActiveCycleStarted)
        }
      
      }, 1000);
    }

    return () => {
      clearInterval(cycleInterval)
    } 
  }, [activeCycle, totalActiveCycleSeconds, activeCycleId ])

  const currentSeconds = activeCycle ? totalActiveCycleSeconds - amountSecondsPassed: 0
  
  const amountOfMinutesRemaining = Math.floor(currentSeconds / 60)
  const amountOfSecondsRemaining = currentSeconds % 60 

  const formattedMinutes = String(amountOfMinutesRemaining).padStart(2, "0")
  const formattedSeconds = String(amountOfSecondsRemaining).padStart(2, "0")

  useEffect(() => {
    if(activeCycle) {
      document.title = `Ignite Timer: ${formattedMinutes}: ${formattedSeconds}`
    } else {
      document.title = "Ignite Timer - Gabriel Francisco"
    }
  }, [
    formattedMinutes,
    formattedSeconds,
    activeCycle
  ])

  type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
  
  const { register, handleSubmit, reset, watch } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: newCycleFormData) {
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

    reset()
  }

  function handleInterruptActiveCycle() {
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

  const taskInput = watch("task")
  const isSubmitiDisable = !taskInput

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em: </label>
          <TaskInput 
            type="text" 
            id="task" 
            list="task-suggestions"
            disabled={!!activeCycle}
            placeholder="Dê um nome para o seu projecto"
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option>Projecto 1</option>
            <option>Projecto 2</option>
          </datalist>

          <label htmlFor="minutesAmount">Durante: </label>
          <MinuteAmountInput 
            type="number" 
            id="minutesAmount"
            placeholder="00" 
            step={5}
            max={60}
            min={5}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{formattedMinutes[0]}</span>
          <span>{formattedMinutes[1]}</span>
          <Separator>:</Separator>
          <span>{formattedSeconds[0]}</span>
          <span>{formattedSeconds[1]}</span>
        </CountDownContainer>
        
        {!activeCycle ? (
          <StartCountDownButton type="submit" disabled={isSubmitiDisable}>
            <Play size={24} /> 
            <span>Começar</span>
          </StartCountDownButton>
        ) : (
          <StopCountDownButton type="button" onClick={handleInterruptActiveCycle}>
            <HandPalm size={24} /> 
            <span>Interromper</span>
          </StopCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}

function usEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.")
}
