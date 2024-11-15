import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import { Play } from "phosphor-react"

import { 
  CountDownContainer, 
  FormContainer, 
  HomeContainer, 
  MinuteAmountInput, 
  Separator, 
  StartCountDownButton, 
  TaskInput 
} from "./style"
import { useState } from "react"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5),
  minutesAmount: zod.number().min(5),
})

interface Cycle {
  id: string 
  task: string 
  minutesAmount: number 
}
export function Home() {
  
  const [ cycles, setCycles ] = useState<Cycle[]>([])
  const [ activeCycleId, setActiveCycleId, ] = useState<string | null>(null)
  const [ amountSecondsPassed, setAmountSecondsPassed, ] = useState<number>(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalActiveCycleSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalActiveCycleSeconds - amountSecondsPassed: 0
  
  const amountOfMinutesRemaining = Math.floor(currentSeconds / 60)
  const amountOfSecondsRemaining = currentSeconds % 60 

  const formattedMinutes = String(amountOfMinutesRemaining).padStart(2, "0")
  const formattedSeconds = String(amountOfSecondsRemaining).padStart(2, "0")

  type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
  
  const { register, handleSubmit, reset } = useForm<newCycleFormData>({
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
      minutesAmount: minutesAmount
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }


  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em: </label>
          <TaskInput 
            type="text" 
            id="task" 
            list="task-suggestions"
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

        <StartCountDownButton type="submit">
          <Play size={24} /> 
          <span>Começar</span>
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}