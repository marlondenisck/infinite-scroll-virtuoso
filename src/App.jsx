import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import api from './env'
import { Virtuoso } from 'react-virtuoso'

function App() {
  const BASE_URL = `https://api.unsplash.com/photos/random/?client_id=${api}&count=5`
  
  const [photos, setPhotos] = useState([])

  const getPhotos = useCallback(async() => {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    setPhotos((prevState) => [...prevState, ...data])
  }, [BASE_URL, setPhotos])

  useEffect(() => {
    getPhotos().catch(console.error)
  }, [getPhotos])
  
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
        endReached={getPhotos}
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
