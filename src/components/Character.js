import React, { useEffect, useRef } from 'react'
import Draggable from 'react-draggable'

const Character = ({
  type="minotaur-brown",
  action = "idle",
  direction = "east",
  defaultPosition = { x: 100, y: 755 },
  speed = 100,
  width = 720,
  height = 490
}) => {

  const container = useRef(null)
  const spriteSheetUrl = `${ process.env.PUBLIC_URL }/spriteSheets/${type}.png`
  const spriteSheetWidth = 12960
  const spriteSheetHeight = 4410

  useEffect(() => {

      let numOfCells = 15
      let yPosition = 0

      const moveSpriteSheetForCurrentAction = () => {
      
      switch(action) {
        case "idle":
          numOfCells = 12
          yPosition = 0
          break
        case "walk":
          numOfCells = 18
          yPosition = (1 * height) * -1
          break
        case "run":
          numOfCells = 18
          yPosition = (2 * height) * -1
          break
        case "jump":
            numOfCells = 16
          yPosition = (3 * height) * -1
          break
        case "attack":
          yPosition = (4 * height) * -1
          break
        case "hurt":
          yPosition = (5 * height) * -1
          break
        case "die":
          yPosition = (6 * height) * -1
          break
        default:
          yPosition = 0
      }

      console.log('yPosition', yPosition)
      container.current.setAttribute('y', yPosition)

    }

    console.log('action', action)
    
    moveSpriteSheetForCurrentAction()

    let cellIndex = 0
    let interval = setInterval(() => {
      container.current.setAttribute('x', (--cellIndex) * width)
      if (cellIndex < ((numOfCells * -1) + 2)) cellIndex = 0
    }, speed)

    return () => {
      clearInterval(interval)
    }

  }, [action, height, width])

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
      return "scale(-1,1) translate(-355,0)"
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