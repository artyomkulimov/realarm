"use client";

import { calculateWakeupTime } from "../utils/time";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WakeupTimeDisplayProps {
	sleepHours: number;
	sleepMinutes: number;
}

export function WakeupTimeDisplay({
	sleepHours,
	sleepMinutes,
}: WakeupTimeDisplayProps) {
	const wakeupTime = calculateWakeupTime(sleepHours, sleepMinutes);

	return (
		<Card className="w-full max-w-md bg-zinc-950 border-zinc-800 mb-4">
			<CardContent className="py-4">
				<div className="text-center">
					<div className="flex items-center justify-center gap-2 text-sm text-zinc-400 mb-2">
						you'll wake up at:
					</div>
					<div className="text-2xl font-bold text-green-400">
						{wakeupTime}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
