import type { ChangeEvent } from "react";


export interface FormInputChangeEvent {
	name: string,
	value: string,
	isValid: boolean;
}

interface FormInputProps {
	label: string,
	value: string,
	name: string,
	type: "text" | "decimal" | "multiline",
	placeholder?: string,
	pattern?: string,
	onChange?: (e: FormInputChangeEvent) => void,
	className?: string,
}

export default function FormInput({ label, value, name, type, placeholder, pattern, onChange, className }: FormInputProps) {

	function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const isValid: boolean = e.target.validity.valid;
		onChange && onChange({ name: e.target.name, value: e.target.value, isValid: isValid });
	}

	return (
		<div className={"flex flex-col gap-1 " + className}>
			<label className="label-form">{label}</label>
			{
				type === "multiline" ?
					(
						<textarea className="h-40" name={name} placeholder={placeholder} value={value} onChange={handleInputChange} />
					) : (
						<input
							type={type}
							name={name}
							placeholder={placeholder}
							pattern={pattern}
							value={value}
							className={`${type === "decimal" ? "text-end" : ""}`}
							onChange={handleInputChange} />
					)
			}
		</div >
	);
}
