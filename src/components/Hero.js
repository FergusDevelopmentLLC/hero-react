import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'

const Hero = ({
  speed = 200,
  spriteSheetUrl = 'https://res.cloudinary.com/fergusdev/image/upload/v1609029014/hero/redskull_r3wvcc.png',
  width = 128,
  height = 128,
  defaultPosition = {x: -100, y: 680}
}) => {

  useEffect(() => {

    async function init() {
      let i = 0
      while (true) {
        
        let element = document.getElementById("hero")
        element.setAttribute('x',(--i)*width)
        await new Promise(r => setTimeout(r, speed))
        
        if (i<-4) {
          i=0
        }
      }
    }

    init()
    
    return () => {
      console.log('unmount')
    }

  }, [speed, spriteSheetUrl])

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

        <div className="character handle">
          <svg width="100%" viewBox={ `0 0 ${ width } ${ height } ` }>
            <defs>
              <clipPath id="clip">
                <rect x="0" y="0" width={ width } height={ height } />
              </clipPath>
            </defs>
            <g>
              <image id="hero" width="768" height="128" href={ spriteSheetUrl } clipPath="url(#clip)" />
            </g>
          </svg>
        </div>
    </Draggable>
  )
}

export default Hero