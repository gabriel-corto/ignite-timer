import { Play } from "phosphor-react"
import { CountDownContainer, FormContainer, HomeContainer, MinuteAmountInput, Separator, StartCountDownButton, TaskInput } from "./style"

export function Home() {
  return(
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em: </label>
          <TaskInput 
            type="text" 
            id="task" 
            placeholder="Dê um nome para o seu projecto" 
          />

          <label htmlFor="minutesAmount">Durante: </label>
          <MinuteAmountInput 
            type="number" 
            id="minutesAmount"
            placeholder="00" 
            step={5}
            max={60}
            min={5}
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