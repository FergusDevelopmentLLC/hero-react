import './App.css'
import Pirate from './components/Pirate'
import Hero from './components/Hero'

const App = () => {
  return (
    <div className="App">
     <Pirate type="pirate-idle" /><Hero />
      
    </div>
  )
}

export default App