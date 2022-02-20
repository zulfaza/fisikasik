const prismicId = process.env.PRISMIC_API;
const domain = ['images.prismic.io'];
domain.push(`${prismicId}.cdn.prismic.io`);
module.exports = {
	reactStrictMode: true,
	images: {
		domains: domain,
	},
};
