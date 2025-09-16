import React from "react"
import { Cat } from "react-kawaii"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import Container from "../components/layout/container/container"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found"/>
    <Container>
      <div style={{
        height: '600px'
      }}>
        <div style={{ flex: 1, textAlign: 'center', paddingTop: '50px' }}>
          <h1>404 NOT FOUND</h1>
          <p>
            You just hit a route that doesn&#39;t exist... the sadness.
          </p>
          <hr/>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto'
        }}>
          <div>
            <Cat size={300} mood="ko" color="#FCCB7E"/>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
)

export default NotFoundPage
