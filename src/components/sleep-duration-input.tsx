"use client"

import { Label } from "@/components/ui/label"
import { TimeInput } from "./time-input"
import type { SleepDurationProps } from "../types/alarm"

export function SleepDurationInput({ hours, minutes, onHoursChange, onMinutesChange }: SleepDurationProps) {
  return (
    <div className="space-y-3">
      <Label className="text-zinc-200">Sleep Duration</Label>
      <div className="flex gap-2">
        <TimeInput id="sleep-hours" label="Hours" value={hours} onChange={onHoursChange} min={0} max={23} />
        <TimeInput id="sleep-minutes" label="Minutes" value={minutes} onChange={onMinutesChange} min={0} max={59} />
      </div>
    </div>
  )
}
