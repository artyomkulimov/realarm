"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface MultiAlarmSelectorProps {
	selectedAlarms: string[];
	enableCycling: boolean;
	onAlarmsChange: (alarms: string[]) => void;
	onCyclingChange: (enabled: boolean) => void;
}

const ALARM_SOUNDS = [
	{ file: "Air Raid Siren.mp3", name: "air raid siren", emoji: "🚨" },
	{ file: "mixkit-facility-alarm-sound-999.wav", name: "facility alarm", emoji: "🏭" },
	{ file: "mixkit-digital-clock-digital-alarm-buzzer-992.wav", name: "digital buzzer", emoji: "⏰" },
	{ file: "mixkit-sound-alert-in-hall-1006.wav", name: "hall alert", emoji: "🔔" },
	{ file: "mixkit-critical-alarm-1004.wav", name: "critical alarm", emoji: "⚠️" },
];

export function MultiAlarmSelector({
	selectedAlarms,
	enableCycling,
	onAlarmsChange,
	onCyclingChange,
}: MultiAlarmSelectorProps) {
	const handleAlarmToggle = (alarmFile: string, checked: boolean) => {
		if (checked) {
			onAlarmsChange([...selectedAlarms, alarmFile]);
		} else {
			onAlarmsChange(selectedAlarms.filter((alarm) => alarm !== alarmFile));
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Label className="text-zinc-200">cycle multiple alarms</Label>
				<Switch
					checked={enableCycling}
					onCheckedChange={onCyclingChange}
					className="data-[state=checked]:bg-green-600"
				/>
			</div>
			
			{enableCycling && (
				<div className="space-y-3">
					<Label className="text-sm text-zinc-400">select alarms to cycle</Label>
					<div className="space-y-2">
						{ALARM_SOUNDS.map((sound) => (
							<div key={sound.file} className="flex items-center space-x-3">
								<Checkbox
									id={sound.file}
									checked={selectedAlarms.includes(sound.file)}
									onCheckedChange={(checked) => 
										handleAlarmToggle(sound.file, checked as boolean)
									}
									className="border-zinc-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
								/>
								<label
									htmlFor={sound.file}
									className="flex items-center gap-2 text-sm text-zinc-200 cursor-pointer"
								>
									<span>{sound.emoji}</span>
									<span>{sound.name}</span>
								</label>
							</div>
						))}
					</div>
					{selectedAlarms.length === 0 && (
						<p className="text-xs text-red-400">select at least one alarm</p>
					)}
					{selectedAlarms.length > 1 && (
						<p className="text-xs text-zinc-400">
							alarms will cycle every 3 seconds in random order
						</p>
					)}
				</div>
			)}
		</div>
	);
}