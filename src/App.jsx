import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import './App.css';
import { cars } from './data';

const CarCard = ({ car }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (currentImage < car.images.length - 1) {
      setCurrentImage(prev => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(prev => prev - 1);
    }
  };

  return (
    <section 
      className="car-section" 
      id={`car-${car.id}`}
      style={{ background: car.bgGradient }}
    >
      <motion.div 
        className="car-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="car-header">
          <motion.h2 
            className="car-title"
            style={{ color: car.color }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {car.name}
          </motion.h2>
          <div className="car-specs">
            <div className="spec-item">
              <span className="spec-label">Engine</span>
              <span className="spec-value">{car.specs.engine}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Horsepower</span>
              <span className="spec-value">{car.specs.hp}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">0-60 mph</span>
              <span className="spec-value">{car.specs.zeroToSixty}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Top Speed</span>
              <span className="spec-value">{car.specs.topSpeed}</span>
            </div>
          </div>
        </div>

        <div className="gallery-container">
          <button 
            className="nav-arrow left" 
            onClick={prevImage}
            disabled={currentImage === 0}
          >
            <ChevronLeft size={30} />
          </button>
          
          <div 
            className="gallery-track"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {car.images.map((img, idx) => (
              <div className="gallery-image-wrapper" key={idx}>
                <img src={img} alt={`${car.name} view ${idx + 1}`} className="gallery-image" />
              </div>
            ))}
          </div>

          <button 
            className="nav-arrow right" 
            onClick={nextImage}
            disabled={currentImage === car.images.length - 1}
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

function App() {
  const [activeCar, setActiveCar] = useState(0); // 0 means intro screen
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Calculate which section we are in based on scroll position
      const currentIndex = Math.round(scrollPosition / windowHeight);
      setActiveCar(currentIndex);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (index) => {
    if (!containerRef.current) return;
    const windowHeight = window.innerHeight;
    containerRef.current.scrollTo({
      top: index * windowHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app-container" ref={containerRef}>
      
      {/* Intro Screen */}
      <section className="intro-screen">
        <motion.h1 
          className="intro-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          CarVerse
        </motion.h1>
        <motion.p 
          className="intro-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Scroll to explore the masterpiece collection
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity }}
          style={{ marginTop: '3rem', color: '#555', cursor: 'pointer' }}
          onClick={() => scrollToSection(1)}
        >
          <ChevronDown size={40} />
        </motion.div>
      </section>

      {/* Car Sections */}
      {cars.map((car, index) => (
        <CarCard key={car.id} car={car} />
      ))}

      {/* Side Navigation Pointers */}
      <div className="pointers-container">
        {cars.map((car, index) => {
          const sectionIndex = index + 1; // +1 because of intro screen
          const isActive = activeCar === sectionIndex;
          
          return (
            <div 
              key={car.id} 
              className={`pointer-item ${isActive ? 'active' : ''}`}
              onClick={() => scrollToSection(sectionIndex)}
              style={{ color: isActive ? car.color : '#fff' }}
            >
              <div 
                className="pointer-dot" 
                style={{ 
                  backgroundColor: isActive ? car.color : '#fff' 
                }} 
              />
              <span className="pointer-name">{car.name}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;