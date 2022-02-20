import Link from '@components/_shared/Link';
import { MateriDoc, SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const Materi = ({ slice }: { slice: SliceType }) => {
	return (
		<section className="w-full">
			<h3 className="font-bold text-2xl text-black mb-5">Materi Saya</h3>
			<div className="w-full flex flex-col md:flex-row flex-wrap">
				{slice.items.map((item: MateriDoc) => (
					<div
						key={item.id}
						className="max-w-[263px] group w-full h-[218px] bg-primary hover:bg-slate-600 flex flex-col justify-between py-6 px-4 rounded-lg"
					>
						<h4 className="text-4xl text-white">
							<Link className="w-full block" href={`/materi/${item.uid}`}>
								{RichText.asText(item.data.title)}
							</Link>
						</h4>
						<div className="w-full flex justify-end">
							<AiOutlineCheck className="text-white text-4xl" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Materi;
