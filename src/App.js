import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';
import { useScrollReveal } from './hooks/useScrollReveal';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Hero from './components/Hero';
import QuickLinks from './components/QuickLinks';
import Stats from './components/Stats';
import Mission from './components/Mission';
import Projects from './components/Projects';
import Governance from './components/Governance';
import Footer from './components/Footer';
import WhatWeDo from './pages/WhatWeDo';
import ServicePage from './pages/ServicePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const root = useRef(null);
  useScrollReveal(root);
  return (
    <div ref={root}>
      <Hero />
      <QuickLinks />
      <Stats />
      <Projects />
      <Governance />
      <Mission />
    </div>
  );
}

export default function App() {
  const progress = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    const update = () => {
      if (progress.current)
        progress.current.style.transform =
          `scaleX(${window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) || 0})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    return () => {
      window.removeEventListener('scroll', update);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="page-shell">
        <div ref={progress} className="scroll-progress" />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/what-we-do/:slug" element={<ServicePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}