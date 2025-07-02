import { AlarmClock, Moon, Clock } from "lucide-react"
import type { StatusIconProps } from "../types/alarm"

export function StatusIcon({ status }: StatusIconProps) {
  switch (status) {
    case "sleeping":
      return <Moon className="w-8 h-8 text-purple-400" />
    case "alarming":
      return <AlarmClock className="w-8 h-8 text-red-500 animate-bounce" />
    case "interval":
      return <Clock className="w-8 h-8 text-orange-400" />
    default:
      return <AlarmClock className="w-8 h-8 text-gray-400" />
  }
}
