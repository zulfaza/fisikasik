import React from 'react';

export default function InputForm(props) {
	const {
		label,
		type = 'text',
		required = true,
	}: { label: string; type: string; required: boolean; [key: string]: any | void } = props;

	switch (type) {
		case 'textarea':
			return (
				<>
					<div className="mb-2">
						<label className="text-lg">{label}</label>
					</div>
					<div className="mb-5">
						<textarea
							className="w-full rounded-lg"
							{...props}
							required={required}
						></textarea>
					</div>
				</>
			);
		case 'file':
			return (
				<>
					<div className="mb-2">
						<label className="text-lg">{label}</label>
					</div>
					<div className="mb-5 overflow-hidden relative">
						<label htmlFor="file-upload">
							<span className="bg-white relative z-0 border rounded text-black px-4 py-2">
								Pilih File
							</span>
							<input id="file-upload" className="sr-only" type="file" {...props} />
						</label>
					</div>
				</>
			);
		case 'select':
			return (
				<>
					<div className="mb-2">
						<label className="text-lg">{label}</label>
					</div>
					<div className="mb-5 overflow-hidden relative">
						<select
							defaultValue={props.defaultValue ?? 'default'}
							className="w-full rounded-lg border px-4 py-3"
						>
							<option value={'default'} disabled>
								Pilih {label}
							</option>
							{props.children}
						</select>
					</div>
				</>
			);
		default:
			return (
				<>
					<div className="mb-2">
						<label className="text-lg">{label}</label>
					</div>
					<div className="mb-5">
						<input
							className="w-full rounded-lg border px-4 py-3"
							required={required}
							{...props}
						/>
					</div>
				</>
			);
	}
}
