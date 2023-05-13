import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import api from './env'
import { Virtuoso } from 'react-virtuoso'
import ResizeObserver from 'resize-observer-polyfill'

// To support legacy browsers, you might have to load a ResizeObserver Polyfill before using react-virtuoso:
if (!window.ResizeObserver)
  window.ResizeObserver = ResizeObserver

function App() {
  const BASE_URL = `https://api.unsplash.com/photos/random/?client_id=${api}&count=5`
  
  const [photos, setPhotos] = useState([])

  const loadMore = useCallback(async() => {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    setPhotos((prevState) => [...prevState, ...data])
  }, [BASE_URL, setPhotos])

  useEffect(() => {
    loadMore().catch(console.error)
  }, [loadMore])
  
  return (
    <div style={{height:"90lvh"}}>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Infinite Scroll</h1>
      <Virtuoso 
        data={photos}
        endReached={loadMore}
        overscan={200}
        useWindowScroll
        itemContent={(index, photo) => {
          return <img key={index} width={250} height={400} src={photo.urls.small} alt={`Photo ${index}`} />
        }}
      />
        
    </div>
  )
}

export default App
