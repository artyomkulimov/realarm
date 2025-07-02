import type { StatusInfoProps } from "../types/alarm";

export function StatusInfo({
	sleepHours,
	sleepMinutes,
	intervalMinutes,
	cycleCount,
}: StatusInfoProps) {
	return (
		<div className="text-center text-sm text-zinc-500">
			<div>
				sleep: {sleepHours}h {sleepMinutes}m • interval:{" "}
				{intervalMinutes}min
			</div>
			<div className="mt-1">completed cycles: {cycleCount}</div>
		</div>
	);
}
