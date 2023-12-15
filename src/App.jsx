import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Articles from './pages/articles/Articles'
import SingleArticle from './pages/articles/SingleArticle'
import Error from './components/Error'
import { useState } from 'react'

function App() {
  const [number, setNumber] = useState(1)

  return (
    <>
    <Header setNumber={setNumber}/>

    <Routes>
      <Route path='/'element={<Articles key={number}/>} />
      <Route path='/articles/:article_id' element={<SingleArticle />} />
      <Route path='*' element={<Error message={'Page does not exist'} />}/>
    </Routes>
    </>
  )
}

export default App
