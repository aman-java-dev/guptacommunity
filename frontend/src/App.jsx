import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import './Auth.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Home />} path="/home" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
