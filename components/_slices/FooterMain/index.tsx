import React from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Link from '@components/_shared/Link';

interface Props {
	slice: SliceType;
}

const SocialMediaIcon = ({
	data,
}: {
	data: {
		social_media: string;
		url_target: string;
	};
}): JSX.Element => {
	switch (data.social_media) {
		case 'Instagram':
			return (
				<Link href="/">
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM16 6.66667C13.4651 6.66667 13.1477 6.67724 12.1522 6.72267C11.1585 6.76809 10.4796 6.92613 9.88604 7.15698C9.26382 7.39093 8.69947 7.75804 8.2328 8.23342C7.75818 8.69955 7.39084 9.26351 7.15636 9.88604C6.92676 10.4796 6.76809 11.1591 6.72267 12.1528C6.67787 13.1477 6.66667 13.4644 6.66667 16C6.66667 18.5356 6.67724 18.8523 6.72267 19.8478C6.76809 20.8415 6.92613 21.5204 7.15698 22.114C7.39093 22.7362 7.75804 23.3005 8.23342 23.7672C8.69956 24.2418 9.26352 24.6091 9.88604 24.8436C10.4796 25.0739 11.1585 25.2319 12.1522 25.2773C13.1477 25.3228 13.4651 25.3333 16 25.3333C18.5349 25.3333 18.8523 25.3228 19.8478 25.2773C20.8415 25.2319 21.5204 25.0739 22.114 24.843C22.7362 24.6091 23.3005 24.242 23.7672 23.7666C24.2418 23.3005 24.6092 22.7365 24.8436 22.114C25.0739 21.5204 25.2319 20.8415 25.2773 19.8478C25.3228 18.8523 25.3333 18.5349 25.3333 16C25.3333 13.4651 25.3228 13.1477 25.2773 12.1522C25.2319 11.1585 25.0739 10.4796 24.843 9.88604C24.6087 9.26324 24.2414 8.69904 23.7666 8.2328C23.3005 7.75818 22.7365 7.39084 22.114 7.15636C21.5204 6.92676 20.8409 6.76809 19.8472 6.72267C18.8523 6.67787 18.5356 6.66667 16 6.66667ZM16 8.34853C18.492 8.34853 18.7876 8.35787 19.7719 8.40267C20.6816 8.44436 21.1756 8.59556 21.5048 8.72436C21.9404 8.89298 22.2515 9.09582 22.5781 9.42187C22.9048 9.74853 23.107 10.0596 23.2756 10.4952C23.4038 10.8244 23.5556 11.3184 23.5973 12.2281C23.6421 13.2124 23.6515 13.508 23.6515 16C23.6515 18.492 23.6421 18.7876 23.5973 19.7719C23.5556 20.6816 23.4044 21.1756 23.2756 21.5048C23.1263 21.9102 22.8879 22.277 22.5781 22.5781C22.277 22.888 21.9102 23.1263 21.5048 23.2756C21.1756 23.4038 20.6816 23.5556 19.7719 23.5973C18.7876 23.6421 18.4926 23.6515 16 23.6515C13.5074 23.6515 13.2124 23.6421 12.2281 23.5973C11.3184 23.5556 10.8244 23.4044 10.4952 23.2756C10.0898 23.1263 9.72303 22.8879 9.42187 22.5781C9.11211 22.2769 8.87377 21.9102 8.72436 21.5048C8.59618 21.1756 8.44436 20.6816 8.40267 19.7719C8.35787 18.7876 8.34853 18.492 8.34853 16C8.34853 13.508 8.35787 13.2124 8.40267 12.2281C8.44436 11.3184 8.59556 10.8244 8.72436 10.4952C8.89298 10.0596 9.09582 9.74853 9.42187 9.42187C9.72299 9.11203 10.0898 8.87367 10.4952 8.72436C10.8244 8.59618 11.3184 8.44436 12.2281 8.40267C13.2124 8.35787 13.508 8.34853 16 8.34853ZM14.8327 18.773C15.1994 18.9273 15.5925 19.0068 15.9894 19.0068C16.791 19.0068 17.5598 18.6832 18.1266 18.1072C18.6935 17.5312 19.0119 16.75 19.0119 15.9355C19.0119 15.1209 18.6935 14.3397 18.1266 13.7637C17.5598 13.1878 16.791 12.8642 15.9894 12.8642C15.5925 12.8642 15.1994 12.9436 14.8327 13.098C14.466 13.2523 14.1328 13.4785 13.8522 13.7637C13.5715 14.0489 13.3489 14.3875 13.197 14.7601C13.0451 15.1328 12.9669 15.5321 12.9669 15.9355C12.9669 16.3388 13.0451 16.7382 13.197 17.1108C13.3489 17.4834 13.5715 17.822 13.8522 18.1072C14.1328 18.3924 14.466 18.6186 14.8327 18.773ZM12.6971 12.59C13.5702 11.7027 14.7545 11.2043 15.9894 11.2043C17.2243 11.2043 18.4085 11.7027 19.2817 12.59C20.1549 13.4773 20.6455 14.6807 20.6455 15.9355C20.6455 17.1903 20.1549 18.3937 19.2817 19.2809C18.4085 20.1682 17.2243 20.6667 15.9894 20.6667C14.7545 20.6667 13.5702 20.1682 12.6971 19.2809C11.8239 18.3937 11.3333 17.1903 11.3333 15.9355C11.3333 14.6807 11.8239 13.4773 12.6971 12.59ZM21.6776 11.9092C21.884 11.6994 22 11.415 22 11.1184C22 10.8218 21.884 10.5373 21.6776 10.3276C21.4712 10.1178 21.1913 10 20.8994 10C20.6075 10 20.3276 10.1178 20.1211 10.3276C19.9147 10.5373 19.7988 10.8218 19.7988 11.1184C19.7988 11.415 19.9147 11.6994 20.1211 11.9092C20.3276 12.1189 20.6075 12.2367 20.8994 12.2367C21.1913 12.2367 21.4712 12.1189 21.6776 11.9092Z"
							fill="white"
						/>
					</svg>
				</Link>
			);
		case 'Facebook':
			return (
				<Link href="/">
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM17.5396 15.9988V26.6667H13.401V15.9992H11.3333V12.3229H13.401V10.1158C13.401 7.1167 14.5685 5.33333 17.8856 5.33333H20.6471V9.00997H18.921C17.6297 9.00997 17.5443 9.52373 17.5443 10.4825L17.5396 12.3225H20.6667L20.3008 15.9988H17.5396Z"
							fill="white"
						/>
					</svg>
				</Link>
			);

		default:
			return (
				<Link href="/">
					<svg
						width="33"
						height="33"
						viewBox="0 0 33 33"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M16.5 0C7.3873 0 0 7.3873 0 16.5C0 25.6127 7.3873 33 16.5 33C25.6127 33 33 25.6127 33 16.5C33 7.3873 25.6127 0 16.5 0ZM23.3761 10.8277C24.1334 11.0355 24.7298 11.6478 24.9322 12.4253C25.3 13.8346 25.3 16.775 25.3 16.775C25.3 16.775 25.3 19.7153 24.9322 21.1247C24.7298 21.9022 24.1334 22.5145 23.3761 22.7224C22.0037 23.1 16.5 23.1 16.5 23.1C16.5 23.1 10.9963 23.1 9.6238 22.7224C8.8665 22.5145 8.2701 21.9022 8.0677 21.1247C7.7 19.7153 7.7 16.775 7.7 16.775C7.7 16.775 7.7 13.8346 8.0677 12.4253C8.2701 11.6478 8.8665 11.0355 9.6238 10.8277C10.9963 10.45 16.5 10.45 16.5 10.45C16.5 10.45 22.0037 10.45 23.3761 10.8277Z"
							fill="white"
						/>
						<path d="M14.8501 19.8V14.3L19.2501 17.0501L14.8501 19.8Z" fill="white" />
					</svg>
				</Link>
			);
	}
};

const FooterMain = ({ slice }: Props): JSX.Element => {
	const {
		logo,
	}: {
		logo: ImageType;
	} = slice.primary;
	return (
		<footer className="flex-cc w-full bg-primary mt-5">
			<div className="container flex-bc py-4">
				<div className="">
					<img className="h-16" src={logo.url} alt={logo.alt} />
				</div>
				<div className="flex justify-center md:justify-start gap-1">
					{slice.items.map((sosmed, index) => (
						<SocialMediaIcon key={index} data={sosmed} />
					))}
				</div>
			</div>
		</footer>
	);
};

export default FooterMain;
