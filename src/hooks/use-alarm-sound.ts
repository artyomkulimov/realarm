"use client"

import { useEffect } from "react"

export const useAlarmSound = (isAlarming: boolean, volume: number = 50) => {
  useEffect(() => {
    if (!isAlarming) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    const createAlarmSound = () => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.5)

      const gainValue = volume / 100 // Full 0-1 range, no cap
      gainNode.gain.setValueAtTime(gainValue, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(Math.max(gainValue * 0.1, 0.01), audioContext.currentTime + 1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 1)
    }

    const alarmInterval = setInterval(createAlarmSound, 1000)
    return () => clearInterval(alarmInterval)
  }, [isAlarming, volume])
} 