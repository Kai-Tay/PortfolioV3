import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Work from "./pages/Work/Work";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer";
import Photography from "./pages/Photography/Photography";
import ScrollToHashElement from "./components/ScrollToHashElement";
import Loader from "./components/Loader";
import Grainient from "./components/Grainient/Grainient";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (isLoading) {
      metaThemeColor.setAttribute("content", "#0e100f");
    } else {
      // Use transparent background to allow the CSS background-image to display normally
      metaThemeColor.setAttribute("content", "transparent");
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <Grainient
            color1="#cecece"
            color2="#79bbff"
            color3="#74d7e7"
            timeSpeed={1.8}
            colorBalance={0.0}
            warpStrength={1.0}
            warpFrequency={5.1}
            warpSpeed={1}
            warpAmplitude={50.0}
            blendAngle={0.0}
            blendSoftness={0.07}
            rotationAmount={500.0}
            noiseScale={2.0}
            grainAmount={0.05}
            grainScale={2.0}
            grainAnimated={false}
            contrast={1.5}
            gamma={1.0}
            saturation={0.5}
            centerX={0.0}
            centerY={0.0}
            zoom={0.9}
            className="grainient-background"
          />
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
        </>
      )}
    </>
  );
}

export default App;
