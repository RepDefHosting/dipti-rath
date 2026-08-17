import React from 'react'
import PropTypes from 'prop-types'

const SectionLabel = ({ children }) => {
  if (!children) return null
  return <span className="label-eyebrow">{children}</span>
}

SectionLabel.propTypes = {
  children: PropTypes.string,
}

export default SectionLabel
