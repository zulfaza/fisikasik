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
						if (data?.isLastVideo && !data.isSubmitKesimpulan) {
							setPass(true);
						} else {
							setPass(false);
						}
						break;
					case 'kuis':
						if (data?.isSubmitKesimpulan && !data.isSubmitKuis) {
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

	if (Loading) {
		return <></>;
	}

	if (currentUser && Pass) {
		return <Fragment>{children}</Fragment>;
	}
	if (currentUser) router.push(`/materi/${form.materi.uid}`);
	else router.push('/');
	return <></>;
};

export default FormComponent;
