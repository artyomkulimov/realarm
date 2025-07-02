"use client";

import { AlarmClock } from "lucide-react";

interface WakeupTimeDisplayProps {
	wakeupTime: string;
}

export function WakeupTimeDisplay({ wakeupTime }: WakeupTimeDisplayProps) {
	return (
		<div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium">
			<AlarmClock className="w-4 h-4" />
			<span>wakeup: {wakeupTime}</span>
		</div>
	);
}
