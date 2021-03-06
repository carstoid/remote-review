import React, {useState, useContext} from 'react'
import ReactPlayer from 'react-player'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useListVals } from 'react-firebase-hooks/database'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'

function VideoPlayer({video}) {
  return (
    <ReactPlayer className="w-full" url={video.url} controls width='100%' height='100%' playing loop/>
  )
}

function DraggableImage({img}) {
  // const [{x, y}, setPosition] = useState({x: 0, y: 0});
  // const [targetUrl, setTargetUrl] = useState(null);
  // const bind = useGesture({
  //   onDrag: ({ down, event, offset: [x, y], xy: [px, py]}) => {setPosition({x, y}); setTargetUrl(event.target.src); },
  //   onDragEnd: ( event ) => addImage(targetUrl),
  //   // onMouseDown: () => console.log(x)
  // })

  return (
    <div className='max-h-full flex' key={img.url}>
      <img className='object-contain' src={img.url}></img>
    </div>
  )
}

function Slide({content}) {
  const typedict = {
    'mp4': <ReactPlayer className="w-full" url={content.url} controls width='100%' height='100%'/>,
    'jpg': <DraggableImage img={content} />,
    'png': <DraggableImage img={content} />
  }

  return (
    typedict[content.extension] ? typedict[content.extension] : <div>Error: Unsupported Content Type</div>
  )
}

export default function Carousel({images, video}) {
  const [index, setIndex] = useState(0)
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref('images')

  const increment = () => {
    if (index == slides.length - 1) setIndex(0)
    else setIndex(index + 1)
  }

  const decrement = () => {
    if (index == 0) setIndex(slides.length - 1)
    else setIndex(index - 1)
  }

  const addImage = (img) => {
    ref.push({
      url: img.url,
      position: {
        x: 0,
        y: 0
      },
      zoom: 5.0,
      caption: img.caption
    })
  }

  const mergedContent = [video, ...images]
  const slides = mergedContent.map( (c) => (
    <Slide content={c}/>
  ))

  return (
    <div className='viewer max-w-full divide-y-2 divide-black'>
      <div className='aspect-ratio-square w-full relative'>
        <div className='absolute w-full h-full flex justify-center items-center bg-black'>
          { slides[index] }
        </div>
      </div>
      { mergedContent[index].extension != 'mp4' && <button onClick={() => addImage(mergedContent[index])} className='controls w-full text-center' style={{background: 'lime'}}>Add to Table</button>}
      <div className='controls max-w-full flex justify-between divide-x-2 divide-black'>
        <button onClick={decrement} className='p-2'>← Prev</button>
        <div className='p-2 flex-grow'>{ mergedContent[index].caption }</div>
        <button onClick={increment} className='p-2'>Next →</button>
      </div>
    </div>
  )
}