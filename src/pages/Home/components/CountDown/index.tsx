import { useContext, useEffect } from "react";

import { CountDownContainer, Separator } from "./style";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "../../../../contexts/cyclesContext";

export function CountDown() {
  const {  
    activeCycle,
    activeCycleId,
    amountSecondsPassed, 
    updateAmountSecondsPassed, 
    markActiveCycleAsFinished
  } = useContext(CycleContext)

  const totalActiveCycleSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let cycleInterval: number 

    if(activeCycle) {
      cycleInterval = setInterval(() => {
        const secondsPassedSinceActiveCycleStarted = differenceInSeconds(
          new Date(), activeCycle.startDate
        )

        if(secondsPassedSinceActiveCycleStarted >= totalActiveCycleSeconds ) {
          markActiveCycleAsFinished()
          clearInterval(cycleInterval)
          updateAmountSecondsPassed(totalActiveCycleSeconds)

        } else {
          updateAmountSecondsPassed(secondsPassedSinceActiveCycleStarted)
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

  return(
    <CountDownContainer>
      <span>{formattedMinutes[0]}</span>
      <span>{formattedMinutes[1]}</span>
      <Separator>:</Separator>
      <span>{formattedSeconds[0]}</span>
      <span>{formattedSeconds[1]}</span>
    </CountDownContainer>
  )
}