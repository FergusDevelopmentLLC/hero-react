import './App.css'
import Hero from './components/Hero'


function App() {
  return (
    <div className="App">
      <Hero 
          speed={ 200 } 
          spriteSheetUrl="https://res.cloudinary.com/fergusdev/image/upload/v1609029014/hero/colossus_fejryj.png"
          /> 
    </div>
  );
}

export default App