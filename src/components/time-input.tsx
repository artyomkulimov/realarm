"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TimeInputProps } from "../types/alarm";

export function TimeInput({
	id,
	label,
	value,
	onChange,
	min = 0,
	max = 59,
}: TimeInputProps) {
	const [displayValue, setDisplayValue] = useState("");
	const [hasBeenFocused, setHasBeenFocused] = useState(false);

	// Initialize display value based on prop value
	useEffect(() => {
		if (!hasBeenFocused) {
			// Show empty for initial 0 values, show actual value for non-zero
			setDisplayValue(value === 0 ? "" : value.toString());
		}
	}, [value, hasBeenFocused]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setDisplayValue(inputValue);

		// Convert to number: empty string becomes 0, otherwise parse the number
		const numericValue = inputValue === "" ? 0 : Number(inputValue);
		onChange(numericValue);
	};

	const handleFocus = () => {
		setHasBeenFocused(true);
		// If showing empty but value is 0, user might want to see the 0
		if (displayValue === "" && value === 0) {
			// Keep it empty, let user decide what to type
		}
	};

	return (
		<div className="flex-1">
			<Label htmlFor={id} className="text-xs text-zinc-400">
				{label}
			</Label>
			<Input
				id={id}
				type="number"
				value={displayValue}
				onChange={handleChange}
				onFocus={handleFocus}
				min={min}
				max={max}
				className="bg-zinc-900 border-zinc-700 text-white focus:border-zinc-600 focus:ring-zinc-600"
			/>
		</div>
	);
}
