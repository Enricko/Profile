import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Rain from './components/Rain'
import { rollRainMode } from './lib/rainModes'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import GithubContributions from './components/GithubContributions'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Effects from './components/Effects'
import './polish.css'

function App() {
  const [rainMode, setRainMode] = useState(() => rollRainMode())

  useEffect(() => {
    document.body.classList.toggle('rain-mode', rainMode !== 'none')
  }, [rainMode])

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      <Effects />
      <Rain mode={rainMode} />
      <Navbar rainActive={rainMode !== 'none'} rainMode={rainMode} onRandomizeRain={() => setRainMode((m) => rollRainMode(m))} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <GithubContributions />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
