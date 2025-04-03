import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { url: "https://via.placeholder.com/800x400?text=Imagem+1", alt: "Imagem 1", link: "#" },
  { url: "https://via.placeholder.com/800x400?text=Imagem+2", alt: "Imagem 2", link: "#" },
  { url: "https://via.placeholder.com/800x400?text=Imagem+3", alt: "Imagem 3", link: "#" }
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Função para avançar o slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Função para voltar o slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Muda de imagem automaticamente a cada 3s
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <button className="nav-button left" onClick={prevSlide}>
        <ChevronLeft size={32} />
      </button>

      <AnimatePresence mode="wait">
        <motion.a
          key={currentIndex}
          href={images[currentIndex].link}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="image-wrapper"
        >
          <img src={images[currentIndex].url} alt={images[currentIndex].alt} />
        </motion.a>
      </AnimatePresence>

      <button className="nav-button right" onClick={nextSlide}>
        <ChevronRight size={32} />
      </button>

      <div className="dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
