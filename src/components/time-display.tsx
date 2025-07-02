import { formatTime } from "../utils/time";
import type { TimeDisplayProps } from "../types/alarm";

export function TimeDisplay({ timeRemaining, status }: TimeDisplayProps) {
	return (
		<div className="text-center">
			<div className="text-4xl font-mono font-bold text-white">
				{formatTime(timeRemaining)}
			</div>
			<div className="text-sm text-zinc-400 mt-1">
				{status === "sleeping"
					? "time until alarm"
					: "time until next alarm"}
			</div>
		</div>
	);
}
