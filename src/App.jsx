import { useState, useEffect } from 'react'
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
import Loader from './components/Loader'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (isLoading) {
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#0e100f');
      document.documentElement.style.backgroundColor = '#0e100f';
      document.body.style.backgroundColor = '#0e100f';
    } else {
      // ebebeb is the main background fallback color matching the light mesh gradient design
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#ebebeb');
      document.documentElement.style.backgroundColor = '#ebebeb';
      document.body.style.backgroundColor = '#ebebeb';
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
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
      )}
    </>
  )
}

export default App
