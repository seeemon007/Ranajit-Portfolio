import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import Resume from './pages/Resume'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import SkillNetwork from './pages/Skills'  
import Certificates from './pages/Certificates'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/skills" element={<SkillNetwork />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/about" element={<About />} /> {/* ✅ fixed lowercase */}
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} Ranajit Karmakar — Built with React
      </footer>
    </div>
  )
}
