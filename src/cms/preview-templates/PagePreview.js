import React from 'react'
import { toHTML, findImgPath } from '../utils'
import { PageTemplate } from '../../templates/page'

const PagePreview = ({ entry, getAsset, widgetFor }) => {
  const header = entry.getIn(['data', 'header']) || ''
  const subheader = entry.getIn(['data', 'subheader']) || ''
  const templateKey = entry.getIn(['data', 'templateKey'])
  const missionStatement = entry.getIn(['data', 'missionStatement']) || ''
  const shortBiography = entry.getIn(['data', 'shortBiography']) || ''
  const connectWithMe = entry.getIn(['data', 'connectWithMe']) || 'Connect with me'
  const discoverConnectExplore = entry.getIn(['data', 'discoverConnectExplore']) || 'Discover, Connect and Explore'
  const longBiography_MD = toHTML(entry.getIn(['data', 'longBiography_MD'])) || ''
  const featuredImage = {
    src: findImgPath(getAsset(entry.getIn(['data', 'featuredImage', 'src']))) || '',
    alt: entry.getIn(['data', 'featuredImage', 'alt']) || '',
    caption: entry.getIn(['data', 'featuredImage', 'caption']) || '',
  }
  const extraContent = toHTML(entry.getIn(['data', 'extraContent'])) || ''
  const pageContent = toHTML(entry.getIn(['data', 'body'])) || ''
  const learnMoreButton = {
    link: entry.getIn(['data', 'learnMoreButton', 'link']) || '/about/',
    label: entry.getIn(['data', 'learnMoreButton', 'label']) || 'Read More',
  }
  const profileButton = {
    link: entry.getIn(['data', 'profileButton', 'link']) || '/profile/',
    label: entry.getIn(['data', 'profileButton', 'label']) || 'View Profile',
  }
  const blogButton = {
    link: entry.getIn(['data', 'blogButton', 'link']) || '/blog/',
    label: entry.getIn(['data', 'blogButton', 'label']) || 'Visit My Blog',
  }
  const formText = {
    name: entry.getIn(['data', 'formText', 'name']) || '',
    email: entry.getIn(['data', 'formText', 'email']) || '',
    message: entry.getIn(['data', 'formText', 'message']) || '',
    submit: entry.getIn(['data', 'formText', 'submit']) || '',
  }

  // Homepage section toggles
  const showBio = entry.getIn(['data', 'showBio']) !== false
  const showSameAs = entry.getIn(['data', 'showSameAs']) !== false
  const showPosts = entry.getIn(['data', 'showPosts']) !== false
  const showPress = !!entry.getIn(['data', 'showPress'])
  const showGallery = entry.getIn(['data', 'showGallery']) !== false
  const showCTA = entry.getIn(['data', 'showCTA']) !== false

  // Section eyebrow labels
  const bioLabel = entry.getIn(['data', 'bioLabel']) || 'About'
  const linksLabel = entry.getIn(['data', 'linksLabel']) || 'Find Me On'
  const postsLabel = entry.getIn(['data', 'postsLabel']) || 'Latest Writing'
  const pressLabel = entry.getIn(['data', 'pressLabel']) || 'As Seen In'
  const galleryLabel = entry.getIn(['data', 'galleryLabel']) || 'Gallery'
  const ctaLabel = entry.getIn(['data', 'ctaLabel']) || 'Get In Touch'

  // CTA fields
  const ctaHeadline = entry.getIn(['data', 'ctaHeadline']) || ''
  const ctaBody = entry.getIn(['data', 'ctaBody']) || ''
  const ctaButton = {
    label: entry.getIn(['data', 'ctaButton', 'label']) || '',
    link: entry.getIn(['data', 'ctaButton', 'link']) || '',
  }

  return (
    <div className="londn">
      <PageTemplate
        name={''}
        jobTitle={''}
        location={''}
        profileImage={''}
        header={header}
        subheader={subheader}
        slug="preview"
        cssSlug="preview"
        templateKey={templateKey}
        missionStatement={missionStatement}
        shortBiography={shortBiography}
        connectWithMe={connectWithMe}
        discoverConnectExplore={discoverConnectExplore}
        longBiography_MD={longBiography_MD}
        featuredImage={featuredImage}
        extraContent={extraContent}
        pageContent={pageContent}
        isPreview={true}
        recentPosts={[]}
        pressPosts={[]}
        galleryPosts={[]}
        sameAsItems={[]}
        showBio={showBio}
        showSameAs={showSameAs}
        showPosts={showPosts}
        showPress={showPress}
        showGallery={showGallery}
        showCTA={showCTA}
        bioLabel={bioLabel}
        linksLabel={linksLabel}
        postsLabel={postsLabel}
        pressLabel={pressLabel}
        galleryLabel={galleryLabel}
        ctaLabel={ctaLabel}
        ctaHeadline={ctaHeadline}
        ctaBody={ctaBody}
        ctaButton={ctaButton}
        learnMoreButton={learnMoreButton}
        profileButton={profileButton}
        blogButton={blogButton}
        inlineImages={[]}
        socialLinks={[]}
        formText={formText}
      />
    </div>
  )
}

export default PagePreview
