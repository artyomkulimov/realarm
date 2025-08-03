"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SetupForm } from "../components/setup-form";
import { RunningDisplay } from "../components/running-display";
import { useAlarmSound } from "../hooks/use-alarm-sound";
import { convertToSeconds, convertMinutesToSeconds, calculateWakeupTime } from "../utils/time";
import type { AlarmStatus } from "../types/alarm";

export default function Page() {
	const [sleepHours, setSleepHours] = useState(1);
	const [sleepMinutes, setSleepMinutes] = useState(0);
	const [intervalMinutes, setIntervalMinutes] = useState(5);
	const [volume, setVolume] = useState(50);
	const [alarmSound, setAlarmSound] = useState("Air Raid Siren.mp3");
	const [selectedAlarms, setSelectedAlarms] = useState<string[]>(["Air Raid Siren.mp3"]);
	const [enableAlarmCycling, setEnableAlarmCycling] = useState(false);

	const [currentCyclingAlarm, setCurrentCyclingAlarm] = useState("Air Raid Siren.mp3");
	const [status, setStatus] = useState<AlarmStatus>("setup");
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [cycleCount, setCycleCount] = useState(0);
	const [isTestingAlarm, setIsTestingAlarm] = useState(false);
	const [fixedWakeupTime, setFixedWakeupTime] = useState<string | null>(null);

	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const wakeLockRef = useRef<WakeLockSentinel | null>(null);
	const endTimeRef = useRef<number | null>(null);

	const startAlarmPhase = useCallback(() => {
		if (enableAlarmCycling && selectedAlarms.length > 0) {
			let randomAlarm;
			let attempts = 0;
			do {
				const randomIndex = Math.floor(Math.random() * selectedAlarms.length);
				randomAlarm = selectedAlarms[randomIndex];
				attempts++;
			} while (randomAlarm === currentCyclingAlarm && attempts < 10 && selectedAlarms.length > 1);
			
			setCurrentCyclingAlarm(randomAlarm);
			console.log('Starting alarm phase with cycling alarm:', randomAlarm, 'from', selectedAlarms.length, 'selected alarms');
		}
		setStatus("alarming");
		setTimeRemaining(0);
		setTotalTime(0);
	}, [enableAlarmCycling, selectedAlarms, currentCyclingAlarm]);

	useAlarmSound(status === "alarming" || isTestingAlarm, volume, enableAlarmCycling ? currentCyclingAlarm : alarmSound, selectedAlarms, enableAlarmCycling);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
			if (wakeLockRef.current) {
				wakeLockRef.current.release().catch(console.error);
			}
		};
	}, []);

	// Handle page visibility changes to maintain accurate timing
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible' && endTimeRef.current) {
				// Recalculate time when page becomes visible
				const now = Date.now();
				const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
				setTimeRemaining(remaining);
				
				if (remaining <= 0 && (status === 'sleeping' || status === 'interval')) {
					if (timerRef.current) {
						clearInterval(timerRef.current);
					}
					startAlarmPhase();
				}
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
	}, [status, startAlarmPhase]);

	// Request wake lock when timer is active
	const requestWakeLock = async () => {
		try {
			if ('wakeLock' in navigator) {
				wakeLockRef.current = await navigator.wakeLock.request('screen');
			}
		} catch (err) {
			console.error('Wake lock failed:', err);
		}
	};

	const releaseWakeLock = () => {
		if (wakeLockRef.current) {
			wakeLockRef.current.release().catch(console.error);
			wakeLockRef.current = null;
		}
	};

	const startCycle = () => {
		setCycleCount(0);
		setFixedWakeupTime(calculateWakeupTime(sleepHours, sleepMinutes));
		startInitialSleep();
	};

	const testAlarm = () => {
		if (isTestingAlarm) {
			setIsTestingAlarm(false);
		} else {
			if (enableAlarmCycling && selectedAlarms.length > 0) {
				let randomAlarm;
				let attempts = 0;
				do {
					const randomIndex = Math.floor(Math.random() * selectedAlarms.length);
					randomAlarm = selectedAlarms[randomIndex];
					attempts++;
				} while (randomAlarm === currentCyclingAlarm && attempts < 10 && selectedAlarms.length > 1);
				
				setCurrentCyclingAlarm(randomAlarm);
				console.log('Testing cycling alarm:', randomAlarm);
			}
			setIsTestingAlarm(true);
		}
	};

	const startInitialSleep = () => {
		const sleepTime = convertToSeconds(sleepHours, sleepMinutes);
		const startTime = Date.now();
		const endTime = startTime + (sleepTime * 1000);
		
		endTimeRef.current = endTime;
		setStatus("sleeping");
		setTimeRemaining(sleepTime);
		setTotalTime(sleepTime);

		requestWakeLock();

		timerRef.current = setInterval(() => {
			const now = Date.now();
			const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
			
			setTimeRemaining(remaining);
			
			if (remaining <= 0) {
				clearInterval(timerRef.current!);
				endTimeRef.current = null;
				startAlarmPhase();
			}
		}, 100);
	};



	const startIntervalPhase = useCallback(() => {
		const intervalTime = convertMinutesToSeconds(intervalMinutes);
		const startTime = Date.now();
		const endTime = startTime + (intervalTime * 1000);
		
		endTimeRef.current = endTime;
		setStatus("interval");
		setTimeRemaining(intervalTime);
		setTotalTime(intervalTime);

		requestWakeLock();

		timerRef.current = setInterval(() => {
			const now = Date.now();
			const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
			
			setTimeRemaining(remaining);
			
			if (remaining <= 0) {
				clearInterval(timerRef.current!);
				endTimeRef.current = null;
				startAlarmPhase();
			}
		}, 100);
	}, [intervalMinutes, startAlarmPhase]);

	const stopAlarm = useCallback(() => {
		setCycleCount((prev) => prev + 1);
		startIntervalPhase();
	}, [startIntervalPhase]);

	const resetApp = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		releaseWakeLock();
		endTimeRef.current = null;
		setIsTestingAlarm(false);
		setStatus("setup");
		setTimeRemaining(0);
		setTotalTime(0);
		setCycleCount(0);
		setFixedWakeupTime(null);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === "Space") {
				e.preventDefault();
				if (status === "alarming") {
					stopAlarm();
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [status, stopAlarm]);

	useEffect(() => {
		const handleClick = () => {
			if (status === "alarming") {
				stopAlarm();
			}
		};
		window.addEventListener("click", handleClick);
		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [status, stopAlarm]);

	if (status === "setup") {
		return (
			<SetupForm
				sleepHours={sleepHours}
				sleepMinutes={sleepMinutes}
				intervalMinutes={intervalMinutes}
				volume={volume}
				alarmSound={alarmSound}
				selectedAlarms={selectedAlarms}
				enableAlarmCycling={enableAlarmCycling}
				isTestingAlarm={isTestingAlarm}
				onSleepHoursChange={setSleepHours}
				onSleepMinutesChange={setSleepMinutes}
				onIntervalChange={setIntervalMinutes}
				onVolumeChange={setVolume}
				onAlarmSoundChange={setAlarmSound}
				onSelectedAlarmsChange={setSelectedAlarms}
				onEnableAlarmCyclingChange={setEnableAlarmCycling}
				onStart={startCycle}
				onReset={resetApp}
				onTestAlarm={testAlarm}
				fixedWakeupTime={fixedWakeupTime}
			/>
		);
	}

	return (
		<RunningDisplay
			status={status}
			cycleCount={cycleCount}
			timeRemaining={timeRemaining}
			totalTime={totalTime}
			sleepHours={sleepHours}
			sleepMinutes={sleepMinutes}
			intervalMinutes={intervalMinutes}
			onStopAlarm={stopAlarm}
			onReset={resetApp}
			fixedWakeupTime={fixedWakeupTime}
		/>
	);
}
