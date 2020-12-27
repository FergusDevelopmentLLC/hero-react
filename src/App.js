import './App.css'
import { useEffect, useState } from 'react'
import Pirate from './components/Pirate'
import Hero from './components/Hero'

const App = () => {

  const actions = ["idle", "walk", "run", "jump", "attack", "hurt", "die"]

  const [action, setAction] = useState(actions[1])

  useEffect(() => {

    setInterval(() => {
      console.log('update state')
      let randomAction = actions[actions.length * Math.random() | 0]
      setAction(randomAction)
    }, 5000)

    return () => {
      console.log('unmount')
    }

  }, [])

  return (

    <div className="App">
      <Pirate action={ action } /><Hero />
    </div>

  )
}

export default App