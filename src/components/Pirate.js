import React, { useEffect, useRef } from 'react'
import Draggable from 'react-draggable'

const Pirate = ({
  type = "pirate",
}) => {

  const container = useRef(null)
  const spriteSheetUrl = `${ process.env.PUBLIC_URL }/spriteSheets/${type}.png`
  const width = 1550
  const height = 1293
  const numOfCells = 7
  const defaultPosition = { x: 500, y: 720 }
  const speed = 125

  useEffect(() => {
    const init = async () => {
      let i = 0
      while (true) {
        container.current.setAttribute('x', (--i) * width)
        await new Promise(r => setTimeout(r, speed))
        if (i < ((numOfCells * -1) + 2)) i = 0
      }
    }

    init()
    
    return () => {
      console.log('unmount')
    }

  }, [type])

  const handleStart = () => {
    console.log('handleStart')
  }

  const handleDrag = () => {
    console.log('handleDrag')
  }

  const handleStop = () => {
    console.log('handleStop')
  }

  return (
    <Draggable
        handle=".handle"
        axis="x"
        defaultPosition={ defaultPosition }
        position={null}
        grid={[1, 1]}
        scale={1}
        onStart={ handleStart() }
        onDrag={ handleDrag() }
        onStop={ handleStop() }>

        <div className="pirate handle" >
          <svg width="100%" viewBox={ `0 0 ${ width } ${ height } ` }>
            <defs>
              <clipPath id="clip">
                <rect x="0" y="0" width={ width } height={ height } />
              </clipPath>
            </defs>
            <g>
              <image ref={ container } width={ width * numOfCells } height={ height } href={ spriteSheetUrl } clipPath="url(#clip)" />
            </g>
          </svg>
        </div>
    </Draggable>
  )
}

export default Pirate