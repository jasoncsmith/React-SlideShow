import Header from "./components/header/header";
import Slider from "./components/slider/slider";

const App = () => (
    <div className="app">
        <Header />
        <main className="app__content">
            <Slider />
        </main>
    </div>
);

export default App;