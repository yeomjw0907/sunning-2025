import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Culture from '../components/Culture';
import Footer from '../components/Footer';

export default function Landing() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach((section) => {
      section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <Testimonials />
      <Intro />
      <Services />
      <Projects />
      <Stats />
      <Culture />
      <Footer />
    </>
  );
}
