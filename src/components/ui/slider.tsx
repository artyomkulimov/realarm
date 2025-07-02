"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.ComponentProps<"input">, "type"> {
	value?: number;
	onValueChange?: (value: number) => void;
}

function Slider({
	className,
	value,
	onValueChange,
	onChange,
	...props
}: SliderProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(e.target.value);
		onValueChange?.(newValue);
		onChange?.(e);
	};

	return (
		<input
			type="range"
			value={value}
			onChange={handleChange}
			className={cn(
				"w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer",
				"slider:bg-zinc-600 slider:rounded-lg",
				"[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
				"[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
				"[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm",
				"[&::-webkit-slider-track]:bg-zinc-800 [&::-webkit-slider-track]:rounded-lg [&::-webkit-slider-track]:h-2",
				"[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4",
				"[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer",
				"[&::-moz-range-thumb]:border-0 [&::-moz-range-track]:bg-zinc-800 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:h-2",
				"focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-black",
				className
			)}
			{...props}
		/>
	);
}

export { Slider };
