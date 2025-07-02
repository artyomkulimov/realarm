import type { StatusInfoProps } from "../types/alarm"

export function StatusInfo({ sleepHours, sleepMinutes, intervalMinutes, cycleCount }: StatusInfoProps) {
  return (
    <div className="text-center text-sm text-zinc-500">
      <div>
        Sleep: {sleepHours}h {sleepMinutes}m • Interval: {intervalMinutes}min
      </div>
      <div className="mt-1">Completed cycles: {cycleCount}</div>
    </div>
  )
}
