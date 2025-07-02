"use client"

import { Button } from "@/components/ui/button"
import { Square } from "lucide-react"
import type { ActionButtonsProps } from "../types/alarm"

export function ActionButtons({ status, onStopAlarm, onReset }: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      {status === "alarming" ? (
        <Button onClick={onStopAlarm} className="flex-1" size="lg" variant="destructive">
          <Square className="w-4 h-4 mr-2" />
          Stop Alarm
        </Button>
      ) : (
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          Reset
        </Button>
      )}
    </div>
  )
}
