import { FormProvider, useForm } from "react-hook-form"

import { HandPalm, Play } from "phosphor-react"

import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import { HomeContainer, StartCountDownButton, StopCountDownButton} from "./style"
import { NewCycleForm } from "./components/NewCycleForm"
import { CountDown } from "./components/CountDown"
import { useContext } from "react"
import { CycleContext } from "../../contexts/cyclesContext"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5),
  minutesAmount: zod.number().min(5),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {  

  const { activeCycle, createNewCycle, interruptActiveCycle } = useContext(CycleContext)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch } = newCycleForm

  const taskInput = watch("task")
  const isSubmitiDisable = !taskInput

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {!activeCycle ? (
          <StartCountDownButton type="submit" disabled={isSubmitiDisable}>
            <Play size={24} /> 
            <span>Começar</span>
          </StartCountDownButton>
        ) : (
          <StopCountDownButton type="button" onClick={interruptActiveCycle}>
            <HandPalm size={24} /> 
            <span>Interromper</span>
          </StopCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}