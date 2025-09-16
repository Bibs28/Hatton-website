import React from "react"
import Layout from "./layout"
import Container from "./container/container"


const LayoutWithContainer = ({ children }) => (
  <Layout>
    <Container>
      {children}
    </Container>
  </Layout>
)

export default LayoutWithContainer;
