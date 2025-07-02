import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  timeRemaining: number
  totalTime: number
}

export function ProgressBar({ timeRemaining, totalTime }: ProgressBarProps) {
  const getProgressPercentage = () => {
    if (totalTime === 0) return 0
    return ((totalTime - timeRemaining) / totalTime) * 100
  }

  return <Progress value={getProgressPercentage()} className="w-full bg-zinc-800" />
}
