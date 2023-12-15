import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'

import { Routes, Route } from 'react-router-dom'
import Articles from './pages/articles/Articles'
import SingleArticle from './pages/articles/SingleArticle'
import Error from './components/Error'

function App() {

  return (
    <>
    <Header />
    <Nav />

    <Routes>
      <Route path='/'element={<Articles/>} />
      <Route path='/articles' element={<Articles/>} />
      <Route path='/articles/:article_id' element={<SingleArticle />} />
      <Route path='*' element={<Error message='Page does not exist' />}/>
    </Routes>
    </>
  )
}

export default App
