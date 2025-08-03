"use client"

import { useEffect, useRef } from "react"

export const useAlarmSound = (isAlarming: boolean, volume: number = 50, soundFile: string = "Air Raid Siren.mp3", cyclingAlarms?: string[], enableCycling?: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const currentSoundIndexRef = useRef(0)

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

  const switchToNextSound = () => {
    if (!cyclingAlarms || !enableCycling || cyclingAlarms.length <= 1) return;
    
    let nextSound;
    let attempts = 0;
    do {
      const randomIndex = Math.floor(Math.random() * cyclingAlarms.length);
      nextSound = cyclingAlarms[randomIndex];
      attempts++;
    } while (nextSound === audioRef.current?.src.split('/').pop() && attempts < 10 && cyclingAlarms.length > 1);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    const newAudio = new Audio(`/sounds/${nextSound}`);
    newAudio.loop = true;
    newAudio.volume = volume / 100;
    newAudio.preload = 'auto';
    
    newAudio.play().catch(console.error);
    audioRef.current = newAudio;
    
    console.log('Switched to:', nextSound);
  };

  useEffect(() => {
		if (!audioRef.current) return;

		    const audio = audioRef.current;

		if (isAlarming) {
			audio.currentTime = 0;
			audio.play().catch(console.error);
			
			// Set up cycling if enabled
			if (enableCycling && cyclingAlarms && cyclingAlarms.length > 1) {
			  if (cycleIntervalRef.current) {
			    clearInterval(cycleIntervalRef.current);
			  }
			  
			  // Start cycling immediately and then every 3 seconds
			  setTimeout(() => {
			    switchToNextSound();
			  }, 2000); // First switch after 2 seconds
			  
			  cycleIntervalRef.current = setInterval(() => {
			    switchToNextSound();
			  }, 3000); // Then switch every 3 seconds
			  
			  console.log('Started alarm cycling with', cyclingAlarms.length, 'alarms');
			}
		} else {
			    audio.pause();
			audio.currentTime = 0;
			
			// Clear cycling interval
			if (cycleIntervalRef.current) {
			  clearInterval(cycleIntervalRef.current);
			  cycleIntervalRef.current = null;
			  console.log('Stopped alarm cycling');
			}
		}

		return () => {
			if (audio && !isAlarming) {
				audio.pause();
				audio.currentTime = 0;
			}
			if (cycleIntervalRef.current) {
			  clearInterval(cycleIntervalRef.current);
			  cycleIntervalRef.current = null;
			}
		};
	}, [isAlarming, enableCycling, cyclingAlarms, volume]);

	useEffect(() => {
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
			if (cycleIntervalRef.current) {
			  clearInterval(cycleIntervalRef.current);
			  cycleIntervalRef.current = null;
			}
		};
	}, []);
};