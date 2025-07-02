"use client";

import { Button } from "@/components/ui/button";
import { StopCircle } from "lucide-react";
import type { ActionButtonsProps } from "../types/alarm";

export function ActionButtons({
	status,
	onStopAlarm,
	onReset,
}: ActionButtonsProps) {
	return (
		<div className="flex gap-2">
			{status === "alarming" && (
				<Button
					onClick={onStopAlarm}
					className="w-full"
					size="lg"
					variant="destructive"
				>
					<StopCircle className="w-4 h-4 mr-2" />
					Stop Alarm
				</Button>
			)}
		</div>
	);
}
