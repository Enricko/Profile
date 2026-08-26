import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Rain from './components/Rain'
import { rollRainMode } from './lib/rainModes'
import { useRoute } from './lib/router'
import Hero from './components/Hero'
import ReelModal from './components/ReelModal'
import ProjectGrid from './components/ProjectGrid'
import About from './components/About'
import Resources from './components/Resources'
import Contact from './components/Contact'
import ProjectPage from './components/ProjectPage'
import Footer from './components/Footer'
import Effects from './components/Effects'

function App() {
  const [rainMode, setRainMode] = useState(() => rollRainMode())
  const [reelOpen, setReelOpen] = useState(false)
  const route = useRoute()

  useEffect(() => {
    document.body.classList.toggle('rain-mode', rainMode !== 'none')
  }, [rainMode])

  useEffect(() => {
    if (route.name === 'case-study') {
      window.scrollTo({ top: 0 })
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    const targetId = route.hash?.replace('#', '');
    if (targetId) {
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView();
      });
    }

    return () => observer.disconnect();
  }, [route]);

  return (
    <div className="app-container">
      <Effects />
      <Rain key={rainMode} mode={rainMode} />
      <Navbar rainActive={rainMode !== 'none'} onRandomizeRain={() => setRainMode((m) => rollRainMode(m))} />
      {route.name === 'case-study' ? (
        <ProjectPage slug={route.slug} />
      ) : (
        <main>
          <Hero onOpenReel={() => setReelOpen(true)} />
          <ProjectGrid />
          <About />
          <Resources />
          <Contact />
        </main>
      )}
      <Footer />
      <ReelModal open={reelOpen} onClose={() => setReelOpen(false)} />
    </div>
  )
}

export default App
