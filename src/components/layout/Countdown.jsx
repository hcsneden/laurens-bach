import PropTypes from 'prop-types'

/**
 * Countdown timer display component
 */
export function Countdown({ timeLeft }) {
  const items = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, label: 'SECONDS' }
  ]

  return (
    <div className="countdown-container">
      <div className="countdown">
        {items.map(({ value, label }) => (
          <div key={label} className="countdown-item">
            <span className="countdown-number">
              {String(value).padStart(2, '0')}
            </span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

Countdown.propTypes = {
  timeLeft: PropTypes.shape({
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  }).isRequired
}
