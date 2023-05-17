import logo from './logo.svg';
import './header.scss';

const Header = () => (
    <header >
        <h1>Custom <span>React</span> Slider</h1>
        <p>A small code demo written in React 18 using functional components</p>
        <img src={logo} className="app-logo" alt="logo" />
    </header>
);

export default Header;