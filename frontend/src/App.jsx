import React from 'react'
import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import NoteDetailPage from './pages/NoteDetailPage'
import CreatePage from './pages/CreatePage'

const App = () => {
  return (
    <div data-theme="forest">
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App