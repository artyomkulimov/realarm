"use client"

import { useEffect, useRef } from "react"

export const useAlarmSound = (isAlarming: boolean, volume: number = 50) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Pre-load the alarm sound
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/Air Raid Siren.mp3')
      audioRef.current.loop = true
      audioRef.current.preload = 'auto'
    }

    const audio = audioRef.current
    audio.volume = volume / 100

    if (isAlarming) {
      // Reset to beginning and play
      audio.currentTime = 0
      audio.play().catch(console.error)
    } else {
      // Stop and reset
      audio.pause()
      audio.currentTime = 0
    }

    // Cleanup function
    return () => {
      if (audio && !isAlarming) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [isAlarming, volume])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])
} 