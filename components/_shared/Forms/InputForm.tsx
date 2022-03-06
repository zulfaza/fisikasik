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
					<div className="col-span-1">
						<label className="text-2xl">{label}</label>
					</div>
					<div className="col-span-2">
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
					<div className="col-span-1">
						<label className="text-2xl">{label}</label>
					</div>
					<div className="col-span-2 overflow-hidden relative">
						<label htmlFor="file-upload">
							<span className="bg-white relative z-0 border rounded text-black px-4 py-2">
								Pilih File
							</span>
							<input id="file-upload" className="sr-only" type="file" {...props} />
						</label>
					</div>
				</>
			);
		default:
			return (
				<>
					<div className="col-span-1">
						<label className="text-2xl">{label}</label>
					</div>
					<div className="col-span-2">
						<input className="w-full rounded-lg" required={required} {...props} />
					</div>
				</>
			);
	}
}
