import React, { useEffect, useRef } from 'react'
import Draggable from 'react-draggable'

const Character = ({
  type = "pirate-captain",
  currentAction = "idle",
  direction = "west",
  defaultPosition = { x: 100, y: 800 }
}) => {

  const container = useRef(null)

  const minotaurBrown = {
    actions: [{
                name: "idle",
                numberOfCells: 12,
                speed: 80,
                repeat: true
              },
              {
                name: "idle_blink",
                numberOfCells: 12,
                speed: 100,
                repeat: true
              },
              {
                name: "walk",
                numberOfCells: 18,
                speed: 100,
                repeat: true
              },
              {
                name: "jump_start",
                numberOfCells: 6,
                speed: 100,
                repeat: false
              },
              {
                name: "jump_loop",
                numberOfCells: 6,
                speed: 100,
                repeat: true
              },
              {
                name: "attack",
                numberOfCells: 12,
                speed: 100,
                repeat: false
              },
              {
                name: "hurt",
                numberOfCells: 12,
                speed: 100,
                repeat: false
              },
              {
                name: "die",
                numberOfCells: 15,
                speed: 100,
                repeat: false
              },
              {
                name: "taunt",
                numberOfCells: 18,
                speed: 100,
                repeat: false
              }],
    width: 720,
    height: 720,
    spriteSheetWidth: 12960,
    spriteSheetHeight: 6480
  }

  const pirateCaptain = {
    actions: [{
                name: "idle",
                numberOfCells: 7,
                speed: 80,
                repeat: true
              },
              {
                name: "walk",
                numberOfCells: 7,
                speed: 80,
                repeat: true
              },
              {
                name: "run",
                numberOfCells: 7,
                speed: 80,
                repeat: true
              },
              {
                name: "jump",
                numberOfCells: 7,
                speed: 80,
                repeat: false
              },
              {
                name: "attack",
                numberOfCells: 7,
                speed: 80,
                repeat: false
              },
              {
                name: "hurt",
                numberOfCells: 7,
                speed: 80,
                repeat: false
              },
              {
                name: "die",
                numberOfCells: 7,
                speed: 80,
                repeat: false
              }],
    width: 387,
    height: 323,
    spriteSheetWidth: 2709,
    spriteSheetHeight: 2261
  }

  const pirateGunner = {
    actions: [{
                name: "idle",
                numberOfCells: 7,
                speed: 80,
                repeat: true
              },
              {
                name: "walk",
                numberOfCells: 7,
                speed: 80,
                repeat: true
              },
              {
                name: "run",
                numberOfCells: 7,
                speed: 80,
                repeat: true
              },
              {
                name: "jump",
                numberOfCells: 7,
                speed: 80,
                repeat: false
              },
              {
                name: "attack",
                numberOfCells: 7,
                speed: 80,
                repeat: false
              },
              {
                name: "hurt",
                numberOfCells: 7,
                speed: 80,
                repeat: false
              },
              {
                name: "die",
                numberOfCells: 7,
                speed: 80,
                repeat: false
              }],
    width: 356,
    height: 356,
    spriteSheetWidth: 2492,
    spriteSheetHeight: 2492
  }

  let spriteSheetUrl
  let character = pirateCaptain
  if(type === 'minotaur-brown'){
    character = minotaurBrown
    spriteSheetUrl = 'https://res.cloudinary.com/fergusdev/image/upload/v1614361996/hero/minotaur-brown_piiw03.png'
  } 
  if(type === 'pirate-captain') {
    character = pirateCaptain
    spriteSheetUrl = 'https://res.cloudinary.com/fergusdev/image/upload/v1614361989/hero/pirate-captain_elhbvr.png'
  } 
  if(type === 'pirate-gunner') {
    character = pirateGunner
    spriteSheetUrl = 'https://res.cloudinary.com/fergusdev/image/upload/v1614361988/hero/pirate-gunner_v7xgdw.png'
  }

  const { actions, width, height, spriteSheetWidth, spriteSheetHeight } = character
  //const spriteSheetUrl = `${ process.env.PUBLIC_URL }/spriteSheets/${type}.png`
  
  useEffect(() => {
    
    console.log('currentAction', currentAction)

    let currentActionIndex = actions.findIndex(action => action.name === currentAction)
    if(currentActionIndex === -1) currentActionIndex = 0
    
    const currentActionMatch = actions[currentActionIndex]
    const speed = currentActionMatch.speed
    const numberOfCells = currentActionMatch.numberOfCells
    const repeat = currentActionMatch.repeat

    container.current.setAttribute('y', ((currentActionIndex * height) * -1))

    let cellIndex = 0
    let interval = setInterval(() => {
      container.current.setAttribute('x', (--cellIndex) * width)
      if (cellIndex < ((numberOfCells * -1) + 2)) {
        cellIndex = 0
        // if(!repeat) {
        //   action = actions[0].name
        //   currentActionIndex = actions.findIndex(action => action.name === currentAction)
        //   container.current.setAttribute('y', ((currentActionIndex * height) * -1))
        //   currentActionMatch = actions.find(action => action.name === currentAction)
        //   speed = currentActionMatch.speed
        //   numberOfCells = currentActionMatch.numberOfCells
        //   repeat = currentActionMatch.repeat
        // }
      }
    }, speed)

    return () => {
      clearInterval(interval)
    }

  }, [actions, currentAction, type])

  const handleStart = () => {
    // console.log('handleStart')
  }

  const handleDrag = () => {
    // console.log('handleDrag')
  }

  const handleStop = () => {
    // console.log('handleStop')
  }

  const getOrientation = () => {
    if(direction === "east") {
      return `scale(-1,1) translate(${((width) * -1)},0)`
    }
    else {
      return null
    }
  }

  return (
    <Draggable
        handle=".handle"
        axis="x"
        defaultPosition={ defaultPosition }
        position={null}
        grid={[1, 1]}
        scale={1}
        onStart={ handleStart }
        onDrag={ handleDrag }
        onStop={ handleStop }>

        <div className="character handle" >
          <svg width="100%" viewBox={ `0 0 ${ width } ${ height } ` }>
            <defs>
              <clipPath id="clip">
                <rect x="0" y="0" width={ width } height={ height } />
              </clipPath>
            </defs>
            <g transform={ getOrientation() }>
              <image ref={ container } width={ spriteSheetWidth } height={ spriteSheetHeight } href={ spriteSheetUrl } clipPath="url(#clip)" />
            </g>
          </svg>
        </div>
    </Draggable>
  )
}

export default Character