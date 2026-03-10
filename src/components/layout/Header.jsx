import PropTypes from 'prop-types'
import { Diamond } from '../ui'
import { scrollToSection } from '../../utils/scrollToSection'

/**
 * Navigation header component
 */
export function Header({ navItems }) {
  return (
    <header className="header">
      <nav className="nav">
        {navItems.map((item, index) => (
          <div key={item.name} className="nav-item-wrapper">
            <a
              href={item.href}
              className="nav-link"
              onClick={(e) => scrollToSection(e, item.href)}
            >
              {item.name}
            </a>
            {index < navItems.length - 1 && (
              <Diamond className="nav-diamond" size={8} />
            )}
          </div>
        ))}
      </nav>
    </header>
  )
}

Header.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    })
  ).isRequired
}
