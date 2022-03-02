import { useAuth } from '@core/contexts/firebase/AuthContext';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import * as prismicT from '@prismicio/types';
import axios from 'axios';
import { extendMater } from '@core/prismic/client';
export interface FormSliceType {
	form_url: string;
	next_page: prismicT.FilledLinkToDocumentField;
	materi: prismicT.FilledLinkToDocumentField;
	type: string;
}
interface Props {
	children: React.ReactNode;
	form: FormSliceType;
}
const FormComponent = ({ children, form }: Props) => {
	const { currentUser } = useAuth();
	const [Loading, setLoading] = useState(true);
	const [Pass, setPass] = useState<boolean>(null);
	const router = useRouter();

	useEffect(() => {
		axios
			.post('/api/firebase/get-materi', {
				materiId: form.materi.id,
				uid: currentUser.uid,
			})
			.then((res) => {
				const data: extendMater = res.data.data.data.materi;

				switch (form.type) {
					case 'kesimpulan':
						if (data?.isLastVideo) {
							setPass(true);
						} else {
							setPass(false);
						}
						break;
					case 'kuis':
						if (data?.isSubmitKesimpulan) {
							setPass(true);
						} else {
							setPass(false);
						}
						break;

					default:
						setPass(false);
						break;
				}
				setLoading(false);
			});
	}, []);

	if (currentUser) {
		if (Pass !== null && !Pass) {
			router.push('/dashboard');
			return <></>;
		}

		return <Fragment>{!Loading && children}</Fragment>;
	}

	router.push('/dashboard');
	return <></>;
};

export default FormComponent;
