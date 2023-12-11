import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'

import { Routes, Route } from 'react-router-dom'
import Articles from './pages/articles/Articles'

function App() {

  return (
    <>
    <Header />
    <Nav />

    <Routes>
      <Route path='/'element={<Articles/>} />
    </Routes>
    </>
  )
}

export default App
