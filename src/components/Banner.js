import React from 'react'
import PropTypes from 'prop-types'

/**
 * Banner — editorial inner-page header.
 * Renders a warm-paper page header matching the homepage hero style.
 * The old full-bleed background image (imageSrc) is no longer displayed;
 * the prop is kept for backwards compatibility.
 */
const Banner = ({ header, subheader, imageSrc, imageAlt, profileImage }) => {
  const hasPortrait =
    !!profileImage &&
    !!profileImage.src &&
    !!profileImage.src.childImageSharp &&
    !!profileImage.src.childImageSharp.fluid &&
    !!profileImage.src.childImageSharp.fluid.src

  return (
    <div className="banner">
      {/* Content column */}
      <div className="content-box">
        {!!header && (
          <h1>
            {header.split(' ')[0]}{' '}
            {header.split(' ')[1] && <span>{header.split(' ')[1]}</span>}
          </h1>
        )}
        {!!subheader && (
          <p className="banner-subheader">{subheader}</p>
        )}
      </div>

      {/* Portrait column — only shown when profileImage is available */}
      {hasPortrait && (
        <div className="banner-portrait">
          <img
            src={profileImage.src.childImageSharp.fluid.src}
            alt={profileImage.alt || header}
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  )
}

Banner.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  imageSrc: PropTypes.string,    // kept for API compatibility — no longer rendered
  imageAlt: PropTypes.string,
  profileImage: PropTypes.object,
}

export default Banner
