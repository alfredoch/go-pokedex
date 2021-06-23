import './App.css';

//
import Pokedex from './components/Pokedex';

export default function App() {
  
  return (
    <div className="App">
      <nav className="pokeNav" role="navigation">
        <div className="nav-wrapper container">
          <h5 id="logo-container" className="brand-logo">GO Pokedex</h5>
        </div>
      </nav>
      <div className="container">
        <Pokedex></Pokedex>
      </div>
    </div>
  );
}
