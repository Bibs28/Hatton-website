import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import CookieConsent from "react-cookie-consent"
import ReactGA from "react-ga"
import { Location } from "@reach/router"

import Header from "./header/header"
import Footer from "./footer/footer"
import "./layout.css"
import Container from "./container/container"

// Note: since Gatsby uses the Webpack DefinePlugin to make the environment variables available at runtime,
// they cannot be destructured from process.env; instead, they have to be fully referenced
let GATrackingId = process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID;
if (GATrackingId && GATrackingId.trim() !== '') {
  GATrackingId = GATrackingId.trim();
  // console.log('----------------------------- [CLIENT-LAYOUT] GA TRACKING ID PROVIDED ----------------------------- ');
} else {
  // console.log('----------------------------- [CLIENT-LAYOUT] GA TRACKING ID NOT PROVIDED ----------------------------- ');
}

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
      query {
          site {
              siteMetadata {
                  title
                  copyright
              }
          }
          allFooterLinksJson {
              edges {
                  node {
                      sectionTitle
                      items {
                          title
                          url
                          external
                      }
                  }
              }
          }
          allHeaderLinksJson {
              edges {
                  node {
                      title
                      url
                      external
                  }
              }
          }
      }
  `)
  const { copyright, title } = data.site.siteMetadata
  const footerLinks = data.allFooterLinksJson.edges.map((e) => e.node)
  const headerLinks = data.allHeaderLinksJson.edges.map((e) => e.node)

  return (
    <>
      <CookieConsent
        cookieName="gatsby-gdpr-google-analytics"
        location="bottom"
        buttonStyle={{ backgroundColor: '#57b894', color: '#3f3d56' }}
        declineButtonStyle={{ backgroundColor: 'transparent', color: 'gray' }}
        buttonText="I understand"
        onAccept={() => {
          ReactGA.initialize(GATrackingId);
          ReactGA.set({ page: location.pathname, anonymizeIp: false });
          ReactGA.pageview(location.pathname);
        }}
        declineButtonText="Decline"
        enableDeclineButton
        flipButtons>
        <Container padding="0px">
          <div style={{ color: 'gray' }}>
            This website uses cookies to enhance the user experience.
          </div>
        </Container>
      </CookieConsent>

      <Header
        siteTitle={title}
        links={headerLinks}
      />
      <div className="contentPusher"/>
      <main>
        {children}
      </main>
      <Footer
        title={title}
        copyright={copyright}
        links={footerLinks}
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

// Decorate with location so we can register the page view event with GA
export default props => (
  <Location>
    {(locationProps) => (
      <Layout children={props.children} {...locationProps} {...props} />
    )}
  </Location>
)
