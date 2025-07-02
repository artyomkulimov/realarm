"use client"

import { Button } from "@/components/ui/button"
import type { ResetButtonProps } from "../types/alarm"

export function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <Button
      onClick={onReset}
      variant="outline"
      size="sm"
      className="absolute top-4 right-4 z-50 bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
    >
      Reset
    </Button>
  )
}
