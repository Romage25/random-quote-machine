import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './lib/components/Navbar.tsx';
import Add from './lib/components/Add.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/add' element={<Add />} />
      </Routes>  
    </Router>
  </React.StrictMode>,
)
