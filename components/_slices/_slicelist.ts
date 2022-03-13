import NavbarMain from './NavbarMain';
import FooterMain from './FooterMain';
import EmbededList from './EmbededList';
import Hero from './Hero';
import About from './About';
import Developer from './Developer';
import LoginForm from './LoginForm';
import Annountment from './Annountment';
import Materi from './Materi';
import SimpleTitle from './SimpleTitle';
import Paragraph from './Paragraph';
import SimpleButton from './SimpleButton';
import Form from './Form';
import Image from './Image';
import EmbedVideo from './EmbedVideo';

// Your slice_type (snake_case) must be the same with the Component's name (PascalCase)
// example: 'hero_landing' will render <HeroLanding />

// Don't forget to register your components below

const sliceList = {
	NavbarMain,
	FooterMain,
	Hero,
	EmbededList,
	About,
	Developer,
	LoginForm,
	Annountment,
	Materi,
	SimpleTitle,
	Paragraph,
	SimpleButton,
	Form,
	Image,
	EmbedVideo,
};

export default sliceList;
