import React, { useState, useEffect } from "react";
import "./ImageSlider.css"; // Importa o CSS para estilização

const images = [
  { url: "https://picsum.photos/800/400?random=1", alt: "Imagem 1", link: "#" },
  { url: "https://picsum.photos/800/400?random=2", alt: "Imagem 2", link: "#" }
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Adiciona evento de teclado para navegação
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="slider-container">
      <button className="arrow arrow-left" onClick={goToPrevious}>&#9665;</button>

      <div className="slider">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            <a href={image.link} target="_blank" rel="noopener noreferrer">
              <img src={image.url} alt={image.alt} />
            </a>
          </div>
        ))}
      </div>

      <button className="arrow arrow-right" onClick={goToNext}>&#9655;</button>

      <div className="dots">
        {images.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? "active" : ""}`} 
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
