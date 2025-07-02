"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusIcon } from "./status-icon"
import { TimeDisplay } from "./time-display"
import { ProgressBar } from "./progress-bar"
import { AlarmDisplay } from "./alarm-display"
import { ActionButtons } from "./action-buttons"
import { StatusInfo } from "./status-info"
import { ResetButton } from "./reset-button"
import type { AlarmStatus } from "../types/alarm"

interface RunningDisplayProps {
  status: AlarmStatus
  cycleCount: number
  timeRemaining: number
  totalTime: number
  sleepHours: number
  sleepMinutes: number
  intervalMinutes: number
  onStopAlarm: () => void
  onReset: () => void
}

export function RunningDisplay({
  status,
  cycleCount,
  timeRemaining,
  totalTime,
  sleepHours,
  sleepMinutes,
  intervalMinutes,
  onStopAlarm,
  onReset,
}: RunningDisplayProps) {
  const getStatusText = () => {
    switch (status) {
      case "sleeping":
        return "Initial sleep period..."
      case "alarming":
        return "ALARM! Wake up!"
      case "interval":
        return "Interval break - next alarm coming"
      default:
        return "Ready to start"
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black p-4">
      <ResetButton onReset={onReset} />
      <Card className="w-full max-w-md bg-zinc-950 border-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-white">
            <StatusIcon status={status} />
            Sleep Cycle Alarm
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Cycle #{cycleCount + 1} • {getStatusText()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {status !== "alarming" && (
            <>
              <TimeDisplay timeRemaining={timeRemaining} status={status} />
              <ProgressBar timeRemaining={timeRemaining} totalTime={totalTime} />
            </>
          )}

          {status === "alarming" && <AlarmDisplay onStopAlarm={onStopAlarm} />}

          <ActionButtons status={status} onStopAlarm={onStopAlarm} onReset={onReset} />

          <StatusInfo
            sleepHours={sleepHours}
            sleepMinutes={sleepMinutes}
            intervalMinutes={intervalMinutes}
            cycleCount={cycleCount}
          />
        </CardContent>
      </Card>
    </div>
  )
}
