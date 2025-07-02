"use client"

import { useState, useRef, useEffect } from "react"
import { SetupForm } from "../components/setup-form"
import { RunningDisplay } from "../components/running-display"
import { useAlarmSound } from "../hooks/use-alarm-sound"
import { convertToSeconds, convertMinutesToSeconds } from "../utils/time"
import type { AlarmStatus } from "../types/alarm"

export default function Page() {
  const [sleepHours, setSleepHours] = useState(0)
  const [sleepMinutes, setSleepMinutes] = useState(20)
  const [intervalMinutes, setIntervalMinutes] = useState(5)
  const [status, setStatus] = useState<AlarmStatus>("setup")
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [isInitialSleep, setIsInitialSleep] = useState(true)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Use the alarm sound hook
  useAlarmSound(status === "alarming")

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startCycle = () => {
    setCycleCount(0)
    startInitialSleep()
  }

  const startInitialSleep = () => {
    const sleepTime = convertToSeconds(sleepHours, sleepMinutes)
    setStatus("sleeping")
    setTimeRemaining(sleepTime)
    setTotalTime(sleepTime)
    setIsInitialSleep(true)

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          setIsInitialSleep(false)
          startAlarmPhase()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const startAlarmPhase = () => {
    setStatus("alarming")
    setTimeRemaining(0)
    setTotalTime(0)
  }

  const stopAlarm = () => {
    setCycleCount((prev) => prev + 1)
    startIntervalPhase()
  }

  const startIntervalPhase = () => {
    const intervalTime = convertMinutesToSeconds(intervalMinutes)
    setStatus("interval")
    setTimeRemaining(intervalTime)
    setTotalTime(intervalTime)

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          startAlarmPhase()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resetApp = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setStatus("setup")
    setTimeRemaining(0)
    setTotalTime(0)
    setCycleCount(0)
    setIsInitialSleep(true)
  }

  if (status === "setup") {
    return (
      <SetupForm
        sleepHours={sleepHours}
        sleepMinutes={sleepMinutes}
        intervalMinutes={intervalMinutes}
        onSleepHoursChange={setSleepHours}
        onSleepMinutesChange={setSleepMinutes}
        onIntervalChange={setIntervalMinutes}
        onStart={startCycle}
        onReset={resetApp}
      />
    )
  }

  return (
    <RunningDisplay
      status={status}
      cycleCount={cycleCount}
      timeRemaining={timeRemaining}
      totalTime={totalTime}
      sleepHours={sleepHours}
      sleepMinutes={sleepMinutes}
      intervalMinutes={intervalMinutes}
      onStopAlarm={stopAlarm}
      onReset={resetApp}
    />
  )
}
