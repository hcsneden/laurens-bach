import { useState } from 'react'
import PropTypes from 'prop-types'
import { Sparkle } from '../ui'

function ImageCarousel({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="carousel">
      <div className="carousel-main">
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="carousel-image-container">
          <img
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            className="carousel-image"
          />
          <span className="carousel-counter">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          className="carousel-btn carousel-btn-next"
          onClick={goToNext}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt: PropTypes.string.isRequired
}

export function LocationSection({ listing }) {
  return (
    <section id="location" className="section section-location">
      <div className="section-header">
        <Sparkle className="section-sparkle" size={28} />
        <h2 className="section-title">Location</h2>
        <Sparkle className="section-sparkle" size={28} />
      </div>
      <p className="section-subtitle">Where are we staying?</p>

      <div className="location-card">
        <ImageCarousel images={listing.images} alt={listing.title} />

        <div className="location-details">
          <h3 className="location-title">{listing.title}</h3>
          <p className="location-address">{listing.location}</p>

          <div className="location-stats">
            <div className="location-stat">
              <span className="stat-value">{listing.guests}</span>
              <span className="stat-label">Guests</span>
            </div>
            <div className="location-stat">
              <span className="stat-value">{listing.bedrooms}</span>
              <span className="stat-label">Bedrooms</span>
            </div>
            <div className="location-stat">
              <span className="stat-value">{listing.bathrooms}</span>
              <span className="stat-label">Baths</span>
            </div>
          </div>

          <a
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="location-link"
          >
            View on Airbnb
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

LocationSection.propTypes = {
  listing: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    guests: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  }).isRequired
}
