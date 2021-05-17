import mobBackground from './assets/img/background-mob.jpg';
import webBackground from './assets/img/background-web.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <img className="pols-mob-background" src={mobBackground} />
      <img className="pols-web-background" src={webBackground} />
    </div>
  );
}

export default App;
