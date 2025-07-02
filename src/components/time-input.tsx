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

	useEffect(() => {
		if (!hasBeenFocused) {
			setDisplayValue(value.toString());
		}
	}, [value, hasBeenFocused]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setDisplayValue(inputValue);

		const numericValue = inputValue === "" ? 0 : Number(inputValue);
		onChange(numericValue);
	};

	const handleFocus = () => {
		setHasBeenFocused(true);
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
