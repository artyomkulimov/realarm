"use client"

import { useEffect, useRef } from "react"

export const useAlarmSound = (isAlarming: boolean, volume: number = 50, soundFile: string = "Air Raid Siren.mp3") => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio file when sound file changes
  useEffect(() => {
    if (!audioRef.current || audioRef.current.src !== `/sounds/${soundFile}`) {
      // Clean up previous audio if switching sounds
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      
      audioRef.current = new Audio(`/sounds/${soundFile}`)
      audioRef.current.loop = true
      audioRef.current.preload = 'auto'
    }
  }, [soundFile])

  // Handle volume changes separately to avoid interrupting playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Handle play/pause logic
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

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
  }, [isAlarming])

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