import React from 'react'
import PropTypes from 'prop-types'
import SectionLabel from './SectionLabel'

const SameAsRow = ({ items, label }) => {
  if (!items || items.length === 0) return null

  const validItems = items.filter((item) => !!item && !!item.url && !!item.label)
  if (validItems.length === 0) return null

  return (
    <section className="sec-sameas-row">
      <div className="sameas-inner">
        {label && <SectionLabel>{label}</SectionLabel>}
        <ul className="sameas-links">
          {validItems.map((item, i) => (
            <li key={i} className="sameas-item">
              <a
                href={item.url}
                className="sameas-link"
                target="_blank"
                rel="noopener"
                aria-label={`${item.label} (opens in new tab)`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

SameAsRow.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  label: PropTypes.string,
}

export default SameAsRow
