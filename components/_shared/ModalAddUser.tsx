import axios from 'axios';
import React, { useState } from 'react';
import InputForm from './Forms/InputForm';

interface Props {
	closeModal: (arg0?: any) => void;
	show: boolean;
}

const ModalAddUser = ({ closeModal, show }: Props) => {
	const [IsLoading, setIsLoading] = useState(false);
	const [Name, setName] = useState<string | null>(null);
	const [Email, setEmail] = useState<string | null>(null);
	const [Password, setPassword] = useState<string | null>(null);
	const [Kelas, setKelas] = useState<string | null>('default');

	if (!show) return <></>;

	function handleSubmit(event: any) {
		event.preventDefault();
		setIsLoading(true);
		const data = {
			email: Email,
			password: Password,
			name: Name,
			kelas: Kelas,
		};

		axios.post('/api/add_user', data).then((res) => {
			console.log(res);

			handleCloseModal();
		});
	}

	function handleCloseModal() {
		setName(null);
		setEmail(null);
		setPassword(null);
		setKelas('default');
		closeModal();
	}

	return (
		<div className="fixed z-50 top-0 left-0 h-screen w-screen">
			<div
				onClick={handleCloseModal}
				className="absolute z-10 w-full h-full top-0 left-0 flex-cc bg-black bg-opacity-40"
			></div>
			<div className="absolute w-full h-full flex-cc z-20 ">
				<div className="w-full bg-white max-w-5xl relative rounded-lg p-5">
					<button
						className="bg-primary rounded-full text-white hover:bg-opacity-80 transition-all absolute -right-5 p-2 px-3 -top-5"
						onClick={handleCloseModal}
					>
						X
					</button>
					<form onSubmit={handleSubmit}>
						<InputForm
							label="name"
							defaultValue={Name}
							onChange={(e: any) => setName(e.target.value)}
						/>
						<InputForm
							type="email"
							label="email"
							defaultValue={Email}
							onChange={(e: any) => setEmail(e.target.value)}
						/>
						<InputForm
							type="select"
							label="kelas"
							defaultValue={Kelas}
							onChange={(e: any) => setKelas(e.target.value)}
						>
							{Array(4)
								.fill(1)
								.map((_, index) => (
									<option key={index} value={`X MIPA ${index + 5}`}>
										X MIPA {index + 5}
									</option>
								))}
							{Array(4)
								.fill(1)
								.map((_, index) => (
									<option key={index} value={`XII MIPA ${index + 5}`}>
										XII MIPA {index + 5}
									</option>
								))}
						</InputForm>
						<InputForm
							type="password"
							label="password"
							defaultValue={Password}
							onChange={(e: any) => setPassword(e.target.value)}
						/>
						<button
							disabled={IsLoading}
							className="bg-primary disabled:opacity-50 px-5 py-2 rounded-xl text-white hover:bg-opacity-80 transition-all"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ModalAddUser;
