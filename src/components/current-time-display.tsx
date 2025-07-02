"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { getCurrentTime } from "@/utils/time";

export function CurrentTimeDisplay() {
	const [currentTime, setCurrentTime] = useState<string>("");

	useEffect(() => {
		setCurrentTime(getCurrentTime());

		const interval = setInterval(() => {
			setCurrentTime(getCurrentTime());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex items-center justify-center gap-2 text-zinc-400 text-sm">
			<Clock className="w-4 h-4" />
			<span>{currentTime}</span>
		</div>
	);
}
