import logo from "../../assets/logo.svg";
import "./header.scss";

const Header = () => (
    <header className="app__header">
        <h1>
            Custom <span>React</span> Slider
        </h1>
        <p>
            A small custom code demo written in React 18 using functional
            components
        </p>
        <img
            src={logo}
            className="app-logo"
            alt="logo"
        />
    </header>
);

export default Header;
