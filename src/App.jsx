import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header/Header'
import { NavBar } from './components/NavBar/NavBar'
import { HomePage } from './components/HomePage/HomePage';

function App() {

  return (
    <>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>NC-News</title>
    </head>
      <Header/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </html>
    </>
  )
}

export default App
