"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlarmClock } from "lucide-react"
import { SleepDurationInput } from "./sleep-duration-input"
import { IntervalInput } from "./interval-input"
import { ResetButton } from "./reset-button"

interface SetupFormProps {
  sleepHours: number
  sleepMinutes: number
  intervalMinutes: number
  onSleepHoursChange: (hours: number) => void
  onSleepMinutesChange: (minutes: number) => void
  onIntervalChange: (minutes: number) => void
  onStart: () => void
  onReset: () => void
}

export function SetupForm({
  sleepHours,
  sleepMinutes,
  intervalMinutes,
  onSleepHoursChange,
  onSleepMinutesChange,
  onIntervalChange,
  onStart,
  onReset,
}: SetupFormProps) {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black p-4">
      <ResetButton onReset={onReset} />
      <Card className="w-full max-w-md bg-zinc-950 border-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-white">
            <AlarmClock className="w-6 h-6" />
            Sleep Cycle Alarm
          </CardTitle>
          <CardDescription className="text-zinc-400">Set your sleep duration and alarm intervals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SleepDurationInput
            hours={sleepHours}
            minutes={sleepMinutes}
            onHoursChange={onSleepHoursChange}
            onMinutesChange={onSleepMinutesChange}
          />
          <IntervalInput minutes={intervalMinutes} onChange={onIntervalChange} />
          <Button onClick={onStart} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white" size="lg">
            Start Sleep Cycle
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
