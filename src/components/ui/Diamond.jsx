import PropTypes from 'prop-types'

/**
 * Diamond/rhombus shape icon
 */
export function Diamond({ className = '', size = 16, style }) {
  return (
    <svg
      className={`diamond ${className}`}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      style={style}
      aria-hidden="true"
    >
      <path d="M8 0L16 8L8 16L0 8L8 0Z" />
    </svg>
  )
}

Diamond.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
}
