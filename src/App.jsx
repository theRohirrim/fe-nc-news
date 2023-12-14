import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'

import { Routes, Route } from 'react-router-dom'
import Articles from './pages/articles/Articles'
import SingleArticle from './pages/articles/SingleArticle'

function App() {

  return (
    <>
    <Header />
    <Nav />

    <Routes>
      <Route path='/'element={<Articles/>} />
      <Route path='/articles' element={<Articles/>} />
      <Route path='/articles/:article_id' element={<SingleArticle />} />
    </Routes>
    </>
  )
}

export default App
