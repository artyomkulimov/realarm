"use client";

import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface AlarmSoundSelectorProps {
	selectedSound: string;
	onSoundChange: (sound: string) => void;
}

const ALARM_SOUNDS = [
	{ file: "Air Raid Siren.mp3", name: "air raid siren", emoji: "🚨" },
	{ file: "mixkit-facility-alarm-sound-999.wav", name: "facility alarm", emoji: "🏭" },
	{ file: "mixkit-digital-clock-digital-alarm-buzzer-992.wav", name: "digital buzzer", emoji: "⏰" },
	{ file: "mixkit-sound-alert-in-hall-1006.wav", name: "hall alert", emoji: "🔔" },
	{ file: "mixkit-critical-alarm-1004.wav", name: "critical alarm", emoji: "⚠️" },
];

export function AlarmSoundSelector({
	selectedSound,
	onSoundChange,
}: AlarmSoundSelectorProps) {
	const selectedSoundData = ALARM_SOUNDS.find(
		(sound) => sound.file === selectedSound
	);

	return (
		<div className="space-y-3">
			<Label className="text-zinc-200">alarm sound</Label>
			<Select value={selectedSound} onValueChange={onSoundChange}>
				<SelectTrigger className="w-full bg-zinc-900 border-zinc-700 text-white">
					<SelectValue>
						{selectedSoundData && (
							<span className="flex items-center gap-2">
								<span>{selectedSoundData.emoji}</span>
								<span>{selectedSoundData.name}</span>
							</span>
						)}
					</SelectValue>
				</SelectTrigger>
				<SelectContent className="bg-zinc-900 border-zinc-700">
					{ALARM_SOUNDS.map((sound) => (
						<SelectItem
							key={sound.file}
							value={sound.file}
							className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
						>
							<span className="flex items-center gap-2 text-white">
								<span>{sound.emoji}</span>
								<span>{sound.name}</span>
							</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
