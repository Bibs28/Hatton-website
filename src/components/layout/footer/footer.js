import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"

import HattonLogoWhite from '../../../images/hatton-logo.svg'
import styles from "./footer.module.css"

/*const SocialButtons = () => (
  <div>
    {twitterUsername && (
      <div className={styles.social}>
        <a
          href={`https://twitter.com/${twitterUsername}`}
          className="twitter-follow-button">
          Follow @{twitterUsername}
        </a>
      </div>
    )}
    {facebookAppId && (
      <div className="social">
        <div
          className="fb-like"
          data-href={""}
          data-colorscheme="dark"
          data-layout="standard"
          data-share="true"
          data-width="225"
          data-show-faces="false"
        />
      </div>
    )}
  </div>
)*/

const Footer = ({ title, copyright, links/*, twitterUsername, facebookAppId*/ }) => (
  <footer className={styles.navFooter} id="footer">
    <section className={styles.sitemap}>
      {links && links.map(link => (
        <div key={link.sectionTitle}>
          <h5>{link.sectionTitle}</h5>
          {link.items && link.items.map(item => (
            item.external
                ? <OutboundLink key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</OutboundLink>
                : <Link key={item.url} to={item.url}>{item.title}</Link>
          ))}
        </div>
      ))}

      {/*<SocialButtons />*/}
    </section>

    <section style={{ width: 200, height: 200, margin: "0 auto" }}>
      <img src={HattonLogoWhite} alt="Hatton Logo"/>
    </section>

    <section className={styles.copyright}>
      <div>{copyright}</div>
      <div>{title}</div>
    </section>
  </footer>
)

Footer.propTypes = {
  title: PropTypes.string,
  copyright: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      sectionTitle: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
    })
  ),
}

Footer.defaultProps = {
  copyright: ``,
  links: [],
}

export default Footer
