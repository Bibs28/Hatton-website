import React from "react"
import { Link } from "gatsby"
import { useColorMode } from "theme-ui"
import PropTypes from "prop-types"
import { OutboundLink } from "gatsby-plugin-google-analytics"

import Switch from "./switch"
import sun from "../../../images/switch/sun.png"
import moon from "../../../images/switch/moon.png"

import style from "./header.module.css"

const iconCss = [
  { pointerEvents: `none`, margin: 4 }, // Explicitly leave margin out of theme-ui, this positioning should not change based on theme
]

const checkedIcon = (
  <img
    alt="moon indicating dark mode"
    src={moon}
    width="16"
    height="16"
    role="presentation"
    css={iconCss}
  />
)

const uncheckedIcon = (
  <img
    alt="sun indicating light mode"
    src={sun}
    width="16"
    height="16"
    role="presentation"
    css={iconCss}
  />
)

const Header = ({ siteTitle, links }) => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = e => {
    setColorMode(isDark ? `light` : `dark`)
  }

  return (
    <div
      className={style.fixedHeaderContainer}
      style={{
        background: `#005b9f`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1200,
          // padding: `1.45rem 1.0875rem`,
          paddingTop: `0.5rem`
          // border: '1px solid yellow'
        }}
      >
        <header>
          <h1 className={style.headerTitle}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
                fontSize: `0.8em`
              }}
            >
              {siteTitle}
            </Link>
          </h1>

          <div className={style.navigationSlider}>
            <nav className={style.slidingNav}>
              <ul>
                {links && links.map((link) => (
                  <li key={link.url}>
                    {link.external
                      ? <OutboundLink href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</OutboundLink>
                      : <Link to={link.url}>{link.title}</Link>
                    }
                  </li>
                ))}
               <li className={style.dropdown}>
                  <a href="/#" id="itemLangMenu" className={style.dropdownToggle}>
                    <span>English</span>
                  </a>
                  <ul id="langMenu" className={style.dropdownMenu}>
                    <li>
                      <a href="https://www.hattonenterprisesolutions.uk" className={style.dropdownItem}>
                        <span>English</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://hatton.live/it" className={style.dropdownItem}>
                        <span>Italiano</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://hatton.live" className={style.dropdownItem}>
                        <span>Português</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className={style.switchWrapper}>
                    <Switch
                      aria-label="Toggle dark mode"
                      checkedIcon={checkedIcon}
                      uncheckedIcon={uncheckedIcon}
                      checked={isDark}
                      onChange={toggleColorMode}
                    />
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/*<div style={{ position: 'absolute', right: '20px', top: '13px' }}></div>*/}
      </div>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
