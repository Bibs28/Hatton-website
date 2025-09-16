import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import HomeSplash from "../components/landing-page/home-splash/home-splash"
import Technologies from "../components/landing-page/technologies/technologies"
import Sections from "../components/landing-page/sections/sections"
import Features from "../components/landing-page/features/features"


const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <HomeSplash/>
    <Technologies />
    <Sections/>
    <Features/>
  </Layout>
)

export default IndexPage
