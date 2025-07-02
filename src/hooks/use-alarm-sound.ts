"use client"

import { useEffect, useRef } from "react"

export const useAlarmSound = (isAlarming: boolean, volume: number = 50, soundFile: string = "Air Raid Siren.mp3") => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current || audioRef.current.src !== `/sounds/${soundFile}`) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      
      audioRef.current = new Audio(`/sounds/${soundFile}`)
      audioRef.current.loop = true
      audioRef.current.preload = 'auto'
    }
  }, [soundFile])

  useEffect(() => {
      if (audioRef.current) {
          audioRef.current.volume = volume / 100;
		}
	}, [volume]);

  useEffect(() => {
		if (!audioRef.current) return;

		    const audio = audioRef.current;

		if (isAlarming) {
			audio.currentTime = 0;
			audio.play().catch(console.error);
		} else {
			    audio.pause();
			audio.currentTime = 0;
		}

		return () => {
			if (audio && !isAlarming) {
				audio.pause();
				audio.currentTime = 0;
			}
		};
	}, [isAlarming]);

	useEffect(() => {
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, []);
};