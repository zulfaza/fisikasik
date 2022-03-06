import { useAuth } from '@core/contexts/firebase/AuthContext';
import { PopupTypeTimestampChanged } from '@pages/video/[slug]';
import axios from 'axios';
import { RichText } from 'prismic-reactjs';
import React, { useEffect, useState } from 'react';
import InputForm from './Forms/InputForm';

interface Props {
	closeModal: (arg0: any) => void;
}

const ModalAddUser = ({ closeModal }: Props) => {
	const [IsLoading, setIsLoading] = useState(false);

	return (
		<div
			onClick={closeModal}
			className="fixed z-50 top-0 left-0 h-screen w-screen flex-cc bg-black bg-opacity-40"
		>
			<div className="w-full pointer-events-none max-w-md bg-white rounded-lg p-5">
				<form>
					<InputForm label="name" onChange={(e: any) => console.log(e.target.value)} />
				</form>
			</div>
		</div>
	);
};

export default ModalAddUser;
