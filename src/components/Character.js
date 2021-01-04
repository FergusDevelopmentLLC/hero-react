import React, { useEffect, useRef } from 'react'
import Draggable from 'react-draggable'

const Character = ({
  currentAction = "idle",
  direction = "east",
  defaultPosition = { x: 100, y: 500 }
}) => {

  const container = useRef(null)

  const minotaurBrown = {
    type: "minotaur-brown",
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

  const { type, actions, width, height, spriteSheetWidth, spriteSheetHeight } = minotaurBrown
  const spriteSheetUrl = `${ process.env.PUBLIC_URL }/spriteSheets/${type}.png`
  
  let currentActionIndex = actions.findIndex(action => action.name === currentAction)
  let currentActionMatch = actions.find(action => action.name === currentAction)
  let speed = currentActionMatch.speed
  let numberOfCells = currentActionMatch.numberOfCells
  let repeat = currentActionMatch.repeat

  useEffect(() => {

    container.current.setAttribute('y', ((currentActionIndex * height) * -1))

    let cellIndex = 0
    let interval = setInterval(() => {
      container.current.setAttribute('x', (--cellIndex) * width)
      if (cellIndex < ((numberOfCells * -1) + 2)) {
        cellIndex = 0
        if(!repeat) {
          currentAction = actions[0].name
          currentActionIndex = actions.findIndex(action => action.name === currentAction)
          container.current.setAttribute('y', ((currentActionIndex * height) * -1))
          currentActionMatch = actions.find(action => action.name === currentAction)
          speed = currentActionMatch.speed
          numberOfCells = currentActionMatch.numberOfCells
          repeat = currentActionMatch.repeat
        }
      }
    }, speed)

    return () => {
      clearInterval(interval)
    }

  }, [currentAction, height, width])

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
    if(direction === "west") {
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