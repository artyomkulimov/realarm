"use client";

import { useEffect } from "react";

export const useAlarmSound = (isAlarming: boolean) => {
	useEffect(() => {
		if (!isAlarming) return;

		const audioContext = new (window.AudioContext ||
			(window as any).webkitAudioContext)();

		const createAlarmSound = () => {
			const oscillator = audioContext.createOscillator();
			const gainNode = audioContext.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(audioContext.destination);

			oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
			oscillator.frequency.setValueAtTime(
				1000,
				audioContext.currentTime + 0.5
			);

			gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(
				0.01,
				audioContext.currentTime + 1
			);

			oscillator.start(audioContext.currentTime);
			oscillator.stop(audioContext.currentTime + 1);
		};

		const alarmInterval = setInterval(createAlarmSound, 1000);
		return () => clearInterval(alarmInterval);
	}, [isAlarming]);
};
