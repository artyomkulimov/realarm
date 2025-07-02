import type { AlarmDisplayProps } from "../types/alarm";

export function AlarmDisplay({ onStopAlarm }: AlarmDisplayProps) {
	return (
		<div className="text-center space-y-4">
			<div className="text-6xl animate-pulse">🚨</div>
			<div className="text-2xl font-bold text-red-500 animate-pulse">
				alarm!
			</div>
			<div className="text-lg text-zinc-300">time to wake up!</div>
		</div>
	);
}
