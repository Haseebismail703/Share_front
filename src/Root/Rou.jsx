import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import App from '../App'
import Intro from '../page/Intro'
import Found from '../page/Found'
import Uploa from '../page/Uploa'
function Rou() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/how_its_work" element={<Intro/>}/>
        <Route path="/upload" element={<Uploa/>}/>
        <Route path="*" element={<Found/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Rou