import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Work from './pages/Work/Work'
import Projects from './pages/Projects/Projects'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <main className="app-main">
        <Home />
        <About />
        <Work />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
