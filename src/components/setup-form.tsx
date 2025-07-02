"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlarmClock, Volume2, Square } from "lucide-react";
import { SleepDurationInput } from "./sleep-duration-input";
import { IntervalInput } from "./interval-input";
import { VolumeInput } from "./volume-input";
import { AlarmSoundSelector } from "./alarm-sound-selector";
import { ResetButton } from "./reset-button";

interface SetupFormProps {
	sleepHours: number;
	sleepMinutes: number;
	intervalMinutes: number;
	volume: number;
	alarmSound: string;
	isTestingAlarm: boolean;
	onSleepHoursChange: (hours: number) => void;
	onSleepMinutesChange: (minutes: number) => void;
	onIntervalChange: (minutes: number) => void;
	onVolumeChange: (volume: number) => void;
	onAlarmSoundChange: (sound: string) => void;
	onStart: () => void;
	onReset: () => void;
	onTestAlarm: () => void;
}

export function SetupForm({
	sleepHours,
	sleepMinutes,
	intervalMinutes,
	volume,
	alarmSound,
	isTestingAlarm,
	onSleepHoursChange,
	onSleepMinutesChange,
	onIntervalChange,
	onVolumeChange,
	onAlarmSoundChange,
	onStart,
	onReset,
	onTestAlarm,
}: SetupFormProps) {
	return (
		<div className="relative flex items-center justify-center min-h-screen bg-black p-4">
			<ResetButton onReset={onReset} />
			<Card className="w-full max-w-md bg-zinc-950 border-zinc-800">
				<CardHeader className="text-center">
					<CardTitle className="flex items-center justify-center gap-2 text-white">
						{/* <AlarmClock className="w-6 h-6" /> */}
						Re-Alarm
					</CardTitle>
					<CardDescription className="text-zinc-400">
						Set your sleep duration and alarm intervals
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<SleepDurationInput
						hours={sleepHours}
						minutes={sleepMinutes}
						onHoursChange={onSleepHoursChange}
						onMinutesChange={onSleepMinutesChange}
					/>
					<IntervalInput
						minutes={intervalMinutes}
						onChange={onIntervalChange}
					/>
					<VolumeInput volume={volume} onChange={onVolumeChange} />
					<AlarmSoundSelector
						selectedSound={alarmSound}
						onSoundChange={onAlarmSoundChange}
					/>
					<div className="flex gap-2">
						<Button
							onClick={onTestAlarm}
							className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white"
							size="lg"
						>
							{isTestingAlarm ? (
								<>
									<Square className="w-4 h-4 mr-2" />
									Stop Test
								</>
							) : (
								<>
									<Volume2 className="w-4 h-4 mr-2" />
									Test Alarm
								</>
							)}
						</Button>
						<Button
							onClick={onStart}
							className="flex-1 bg-green-600 hover:bg-green-500 text-white"
							size="lg"
						>
							Start Sleep Cycle
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
