import React, { useEffect, useRef } from 'react'
import Draggable from 'react-draggable'

const Hero = ({
  action = "idle",
  type = "colossus",
  direction = "east",
  spriteSheetUrl = `${ process.env.PUBLIC_URL }/spriteSheets/${type}.png`,
  numOfCells = 6,
  defaultPosition = { x: 0, y: 830 },
  speed = 125
}) => {

  const container = useRef(null)
  const width = 128
  const height = 128

  useEffect(() => {
    
    const moveSpriteSheetForCurrentAction = () => {
      
      let yPosition = 0

      switch(action) {
        case "walk":
          yPosition = (1 * height) * -1
          break;
        case "run":
          yPosition = (2 * height) * -1
          break;
        case "jump":
          yPosition = (3 * height) * -1
          break;
        case "attack":
          yPosition = (4 * height) * -1
          break;
        case "hurt":
          yPosition = (5 * height) * -1
          break;
        case "die":
          yPosition = (6 * height) * -1
          break;
        default:
          yPosition = 0
      }

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
    //console.log('handleStart')
  }

  const handleDrag = () => {
    //console.log('handleDrag')
  }

  const handleStop = () => {
    //console.log('handleStop')
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
              <image ref={ container } width={ width * numOfCells } height={ height } href={ spriteSheetUrl } clipPath="url(#clip)" />
            </g>
          </svg>
        </div>
    </Draggable>
  )
}

export default Hero