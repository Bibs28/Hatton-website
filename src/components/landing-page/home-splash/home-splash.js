import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Styled } from "theme-ui"
import style from "./home-splash.module.css"

import HattonLogoWhite from '../../../images/hatton-logo.svg'
import Rocket from '../../../images/rocket-green.svg'

const SplashContainer = props => (
  <div className={style.homeContainerWrapper}>
    <div className={style.homeContainer}>
      {/*<div className={style.homeSplashFade}>*/}
        <div className={`${style.wrapper} ${style.homeWrapper}`}>{props.children}</div>
      {/*</div>*/}
    </div>
  </div>
)

const Logo = props => (
  <div className={style.rocket}>
    <img src={props.img_src} alt="Rocket" title="Rocket"/>
  </div>
)

const Motto = props => (
  <div className={style.motto}>
    <Styled.h2>{props.motto}</Styled.h2>
    <small style={{ fontSize: '.35em', fontWeight: 100 }}>{props.tagline}</small>
  </div>
)

const HomeSplash = () => {
  const data = useStaticQuery(graphql`
      query {
          site {
              siteMetadata {
                  motto
                  tagline
              }
          }
      }
  `)
  const { motto, tagline } = data.site.siteMetadata

  return (
    <SplashContainer>
      <div className={style.inner}>
        <div className={style.companyLogoWrapper}>
          <img src={HattonLogoWhite} className={style.companyLogo} alt="Hatton Logo"/>
        </div>
        <Logo img_src={Rocket} />
        <Motto tagline={tagline} motto={motto}/>

      </div>
    </SplashContainer>
  )
}

export default HomeSplash
