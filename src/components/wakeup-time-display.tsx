"use client";

import { useState, useEffect } from "react";
import { calculateWakeupTime } from "../utils/time";
import { Card, CardContent } from "@/components/ui/card";

interface WakeupTimeDisplayProps {
	sleepHours: number;
	sleepMinutes: number;
	fixedWakeupTime?: string | null;
}

export function WakeupTimeDisplay({
	sleepHours,
	sleepMinutes,
	fixedWakeupTime,
}: WakeupTimeDisplayProps) {
	const [wakeupTime, setWakeupTime] = useState<string>("");

	useEffect(() => {
		if (fixedWakeupTime) {
			setWakeupTime(fixedWakeupTime);
		} else {
			setWakeupTime(calculateWakeupTime(sleepHours, sleepMinutes));
			
			const interval = setInterval(() => {
				setWakeupTime(calculateWakeupTime(sleepHours, sleepMinutes));
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [sleepHours, sleepMinutes, fixedWakeupTime]);

	return (
		<Card className="w-full max-w-md bg-zinc-950 border-zinc-800 mb-4">
			<CardContent className="py-4">
				<div className="text-center">
					<div className="flex items-center justify-center gap-2 text-sm text-zinc-400 mb-2">
						you&apos;ll wake up at:
					</div>
					<div className="text-2xl font-bold text-green-400">
						{wakeupTime}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
