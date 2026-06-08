import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Work from './pages/Work/Work'
import Projects from './pages/Projects/Projects'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer'
import Photography from './pages/Photography/Photography'
import ScrollToHashElement from './components/ScrollToHashElement'
import './App.css'

function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main className="app-main">
              <Home />
              <About />
              <Work />
              <Projects />
              <Contact />
            </main>
          }
        />
        <Route path="/photography" element={<Photography />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
