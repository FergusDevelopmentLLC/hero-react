import './App.css'
import { useEffect, useState } from 'react'
import Pirate from './components/Pirate'
import Hero from './components/Hero'
import Character from './components/Character'

const App = () => {

  const actions = ["idle", "walk", "run", "jump", "attack", "hurt", "die"]

  const [action01, setActionAction01] = useState(actions[1])
  const [action02, setActionAction02] = useState(actions[1])

  useEffect(() => {

    // setInterval(() => {
    //   console.log('update state')

    //   let randomAction = actions[actions.length * Math.random() | 0]
    //   setActionAction01(randomAction)

    //   randomAction = actions[actions.length * Math.random() | 0]
    //   setActionAction02(randomAction)

    // }, 5000)

    // return () => {
    //   console.log('unmount')
    // }

  }, [])

  return (

    <div className="App">
      {/* <Pirate action={ action01 } type="captain" direction="east" speed={ 50 } defaultPosition={{ x: 350, y: 720 }} />
      <Hero /> */}
      <Character currentAction="attack" />
    </div>

  )
}

export default App