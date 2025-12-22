import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Culture from './components/Culture';
import Footer from './components/Footer';

function App() {
  
  // Basic scroll reveal effect for sections
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans text-slate-900 bg-gray-50 selection:bg-suning-accent selection:text-black">
      <Hero />
      <Intro />
      <Projects />
      <Stats />
      <Culture />
      <Footer />
    </div>
  );
}

export default App;