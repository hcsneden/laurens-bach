import PropTypes from 'prop-types'
import { Sparkle } from '../ui'
import { Countdown } from '../layout/Countdown'

/**
 * Home section with hero content and countdown
 */
export function HomeSection({ timeLeft }) {
  return (
    <section id="home" className="section section-home">
      {/* Floating sparkles */}
      <Sparkle className="floating-sparkle sparkle-1" size={32} />
      <Sparkle className="floating-sparkle sparkle-2" size={24} />
      <Sparkle className="floating-sparkle sparkle-3" size={28} />
      <Sparkle className="floating-sparkle sparkle-4" size={20} />
      <Sparkle className="floating-sparkle sparkle-5" size={36} />
      <Sparkle className="floating-sparkle sparkle-6" size={22} />

      {/* Retro window/frame containing the content */}
      <div className="retro-window">
        <div className="window-header">
          <div className="window-dots">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
          </div>
        </div>
        <div className="window-content">
          <div className="hero-content">
            <h1 className="title">
              <span className="title-script">Lauren's</span>
              <span className="title-secondary">Bachelorette</span>
            </h1>
          </div>

          <Countdown timeLeft={timeLeft} />
        </div>
      </div>

      <div className="event-info">
        <p className="event-date">07.09.2026 - 07.12.2026</p>
      </div>
    </section>
  )
}

HomeSection.propTypes = {
  timeLeft: PropTypes.shape({
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  }).isRequired
}
