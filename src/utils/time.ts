export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export const convertToSeconds = (hours: number, minutes: number): number => {
  return (hours * 60 + minutes) * 60
}

export const convertMinutesToSeconds = (minutes: number): number => {
  return minutes * 60
}

export const getCurrentTime = (): string => {
  const now = new Date()
  return now.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  })
}

export const getCurrentDateTime = (): Date => {
  return new Date()
}

export const calculateWakeupTime = (sleepHours: number, sleepMinutes: number): string => {
  const now = new Date()
  const sleepDurationMs = (sleepHours * 60 + sleepMinutes) * 60 * 1000
  const wakeupTime = new Date(now.getTime() + sleepDurationMs)
  
  return wakeupTime.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  })
}

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric'
  })
}
