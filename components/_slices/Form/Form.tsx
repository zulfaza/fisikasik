import { useAuth } from '@core/contexts/firebase/AuthContext';
import { SliceType } from '@core/prismic/client';
import axios from 'axios';
import React, { useState } from 'react';
import OverlayLoading from '@components/_shared/OverlayLoading';
import { useRouter } from 'next/router';
import FormComponent, { FormSliceType } from '@components/_layouts/FormComponent';

const Form = ({ slice }: { slice: SliceType }) => {
	const [LoadCount, setLoadCount] = useState(0);
	const { currentUser } = useAuth();
	const [IsLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const primary: FormSliceType = slice.primary;

	const handleOnLoad = async () => {
		console.log(LoadCount);

		if (LoadCount === 1) {
			setIsLoading(true);
			const data = {
				uid: currentUser.uid,
				materiId: primary.materi.id,
				type: primary.type,
			};
			return axios.post('/api/firebase/submit-form', data).then(() => {
				router.push(`/${primary.next_page.uid}`);
			});
		}
		setIsLoading(false);
		setLoadCount((prev) => prev + 1);
	};

	return (
		<FormComponent form={primary}>
			<div className="w-full my-5 ">
				<OverlayLoading loading={IsLoading} />
				<div className={'container flex-cc h-full min-h-screen'}>
					<div className="iframe-h-full h-full">
						<iframe
							onLoad={handleOnLoad}
							src={`${primary.form_url}&embedded=true`}
							height="100%"
							width="100%"
						>
							Loading..
						</iframe>
					</div>
				</div>
			</div>
		</FormComponent>
	);
};

export default Form;
