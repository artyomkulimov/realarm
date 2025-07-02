export type AlarmStatus = "setup" | "sleeping" | "alarming" | "interval"

export interface AlarmState {
  sleepHours: number
  sleepMinutes: number
  intervalMinutes: number
  volume: number
  status: AlarmStatus
  timeRemaining: number
  totalTime: number
  cycleCount: number
  isInitialSleep: boolean
}

export interface TimeInputProps {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export interface SleepDurationProps {
  hours: number
  minutes: number
  onHoursChange: (hours: number) => void
  onMinutesChange: (minutes: number) => void
}

export interface IntervalInputProps {
  minutes: number
  onChange: (minutes: number) => void
}

export interface VolumeInputProps {
  volume: number
  onChange: (volume: number) => void
}

export interface StatusIconProps {
  status: AlarmStatus
}

export interface TimeDisplayProps {
  timeRemaining: number
  status: AlarmStatus
}

export interface AlarmDisplayProps {
  onStopAlarm: () => void
}

export interface ActionButtonsProps {
  status: AlarmStatus
  onStopAlarm: () => void
  onReset: () => void
}

export interface StatusInfoProps {
  sleepHours: number
  sleepMinutes: number
  intervalMinutes: number
  cycleCount: number
}

export interface ResetButtonProps {
  onReset: () => void
}
