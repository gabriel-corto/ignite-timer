import { useContext } from "react";

import { FormContainer, TaskInput, MinuteAmountInput} from "./style";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../../contexts/cyclesContext";

export function NewCycleForm() {

  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
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
  )
}