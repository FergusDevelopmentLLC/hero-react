import './App.css'
import Hero from './components/Hero'



function App() {
  // const spriteSheetUrl = "https://res.cloudinary.com/fergusdev/image/upload/v1609029014/hero/redskull_r3wvcc.png"
  const spriteSheetUrl = "https://res.cloudinary.com/fergusdev/image/upload/v1609029014/hero/colossus_fejryj.png"

  return (
    <div className="App">
      <Hero 
          speed={ 100 } 
          spriteSheetUrl={ spriteSheetUrl }
          /> 
    </div>
  );
}

export default App