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
	const [status, setStatus] = useState<AlarmStatus>("setup");
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [cycleCount, setCycleCount] = useState(0);
	const [isTestingAlarm, setIsTestingAlarm] = useState(false);
	const [fixedWakeupTime, setFixedWakeupTime] = useState<string | null>(null);

	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useAlarmSound(status === "alarming" || isTestingAlarm, volume, alarmSound);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, []);

	const startCycle = () => {
		setCycleCount(0);
		setFixedWakeupTime(calculateWakeupTime(sleepHours, sleepMinutes));
		startInitialSleep();
	};

	const testAlarm = () => {
		if (isTestingAlarm) {
			setIsTestingAlarm(false);
		} else {
			setIsTestingAlarm(true);
		}
	};

	const startInitialSleep = () => {
		const sleepTime = convertToSeconds(sleepHours, sleepMinutes);
		setStatus("sleeping");
		setTimeRemaining(sleepTime);
		setTotalTime(sleepTime);

		timerRef.current = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev <= 1) {
					clearInterval(timerRef.current!);
					startAlarmPhase();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const startAlarmPhase = () => {
		setStatus("alarming");
		setTimeRemaining(0);
		setTotalTime(0);
	};

	const startIntervalPhase = useCallback(() => {
		const intervalTime = convertMinutesToSeconds(intervalMinutes);
		setStatus("interval");
		setTimeRemaining(intervalTime);
		setTotalTime(intervalTime);

		timerRef.current = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev <= 1) {
					clearInterval(timerRef.current!);
					startAlarmPhase();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	}, [intervalMinutes]);

	const stopAlarm = useCallback(() => {
		setCycleCount((prev) => prev + 1);
		startIntervalPhase();
	}, [startIntervalPhase]);

	const resetApp = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
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
				isTestingAlarm={isTestingAlarm}
				onSleepHoursChange={setSleepHours}
				onSleepMinutesChange={setSleepMinutes}
				onIntervalChange={setIntervalMinutes}
				onVolumeChange={setVolume}
				onAlarmSoundChange={setAlarmSound}
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
