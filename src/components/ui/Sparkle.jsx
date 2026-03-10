import PropTypes from 'prop-types'

/**
 * Four-pointed sparkle star icon (Y2K style)
 */
export function Sparkle({ className = '', size = 24, style }) {
  return (
    <svg
      className={`sparkle ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={style}
      aria-hidden="true"
    >
      <path d="M12 0C12 0 12 8 12 12C12 8 12 0 12 0Z M12 24C12 24 12 16 12 12C12 16 12 24 12 24Z M0 12C0 12 8 12 12 12C8 12 0 12 0 12Z M24 12C24 12 16 12 12 12C16 12 24 12 24 12Z" />
      <ellipse cx="12" cy="2" rx="2" ry="4" />
      <ellipse cx="12" cy="22" rx="2" ry="4" />
      <ellipse cx="2" cy="12" rx="4" ry="2" />
      <ellipse cx="22" cy="12" rx="4" ry="2" />
    </svg>
  )
}

Sparkle.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
}
