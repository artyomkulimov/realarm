"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Volume2 } from "lucide-react";

interface VolumeInputProps {
	volume: number;
	onChange: (volume: number) => void;
}

export function VolumeInput({ volume, onChange }: VolumeInputProps) {
	const handleValueChange = (values: number[]) => {
		onChange(values[0]);
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<Volume2 className="w-4 h-4 text-zinc-400" />
				<Label className="text-zinc-200">volume</Label>
				<span className="text-sm text-zinc-400 ml-auto">{volume}%</span>
			</div>
			<Slider
				value={[volume]}
				onValueChange={handleValueChange}
				min={0}
				max={100}
				step={1}
				className="w-full"
			/>
		</div>
	);
}
