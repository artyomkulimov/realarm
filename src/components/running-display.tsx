"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { StatusIcon } from "./status-icon";
import { TimeDisplay } from "./time-display";
import { ProgressBar } from "./progress-bar";
import { AlarmDisplay } from "./alarm-display";
import { ActionButtons } from "./action-buttons";
import { StatusInfo } from "./status-info";
import { ResetButton } from "./reset-button";
import { WakeupTimeDisplay } from "./wakeup-time-display";
import type { AlarmStatus } from "../types/alarm";

interface RunningDisplayProps {
	status: AlarmStatus;
	cycleCount: number;
	timeRemaining: number;
	totalTime: number;
	sleepHours: number;
	sleepMinutes: number;
	intervalMinutes: number;
	onStopAlarm: () => void;
	onReset: () => void;
}

export function RunningDisplay({
	status,
	cycleCount,
	timeRemaining,
	totalTime,
	sleepHours,
	sleepMinutes,
	intervalMinutes,
	onStopAlarm,
	onReset,
}: RunningDisplayProps) {
	const getStatusText = () => {
		switch (status) {
			case "sleeping":
				return "initial sleep period...";
			case "alarming":
				return "alarm! wake up!";
			case "interval":
				return "interval break - next alarm coming";
			default:
				return "ready to start";
		}
	};

	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen bg-black p-4">
			<ResetButton onReset={onReset} />
			<WakeupTimeDisplay
				sleepHours={sleepHours}
				sleepMinutes={sleepMinutes}
			/>
			<Card className="w-full max-w-md bg-zinc-950 border-zinc-800">
				<CardHeader className="text-center">
					<CardTitle className="flex items-center justify-center gap-2 text-white">
						<StatusIcon status={status} />
						sleep cycle alarm
					</CardTitle>
					<CardDescription className="text-zinc-400">
						cycle #{cycleCount + 1} • {getStatusText()}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{status !== "alarming" && (
						<>
							<TimeDisplay
								timeRemaining={timeRemaining}
								status={status}
							/>
							<div className="space-y-3">
								<ProgressBar
									timeRemaining={timeRemaining}
									totalTime={totalTime}
								/>
								<StatusInfo
									sleepHours={sleepHours}
									sleepMinutes={sleepMinutes}
									intervalMinutes={intervalMinutes}
									cycleCount={cycleCount}
								/>
							</div>
						</>
					)}

					{status === "alarming" && (
						<>
							<AlarmDisplay onStopAlarm={onStopAlarm} />
							<StatusInfo
								sleepHours={sleepHours}
								sleepMinutes={sleepMinutes}
								intervalMinutes={intervalMinutes}
								cycleCount={cycleCount}
							/>
						</>
					)}

					<ActionButtons
						status={status}
						onStopAlarm={onStopAlarm}
						onReset={onReset}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
