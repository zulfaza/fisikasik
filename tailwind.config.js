module.exports = {
	mode: 'jit',
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			padding: {
				DEFAULT: '5%',
				sm: '32px',
			},
		},
		extend: {
			colors: {
				primary: '#4A5781',
				'primary-text': '#252B42',
				secondary: '#FF6551',
			},
			fontFamily: {
				main: 'Montserrat, sans-serif',
			},
			backgroundImage: {
				hero: "url('/Images/hero-background.png')",
			},
			screens: {
				'-2xl': { raw: '(max-width: 1535px)' },
				'-xl': { raw: '(max-width: 1279px)' },
				'-lg': { raw: '(max-width: 1023px)' },
				'-md': { raw: '(max-width: 767px)' },
				'-sm': { raw: '(max-width: 639px)' },
			},
			backgroundPosition: {
				'pos-5': '16rem -31rem',
			},
		},
	},
	plugins: [],
};
