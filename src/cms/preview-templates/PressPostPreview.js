import React from 'react'
import PressStrip from '../../components/PressStrip'

const PressPostPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()

  // Wrap single entry as a list so PressStrip can render it
  const items = [{ frontmatter: { ...data, published: true } }]

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <PressStrip items={items} label="Press Preview" />
    </div>
  )
}

export default PressPostPreview
