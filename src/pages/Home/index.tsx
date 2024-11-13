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

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5),
  minutesAmount: zod.number().min(5),
})
export function Home() {

  type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
  
  const { register, handleSubmit } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data)
  }

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em: </label>
          <TaskInput 
            type="text" 
            id="task" 
            placeholder="Dê um nome para o seu projecto"
            {...register("task")}
          />

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton type="submit">
          <Play size={24} /> 
          <span>Começar</span>
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}