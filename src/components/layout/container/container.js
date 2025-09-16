import React from "react"

const Container = ({
  children,
  padding = `60px 20px 20px`,
  margin = `0 auto`,
  maxWidth = 960,
}) => (
  <div style={{ margin, maxWidth }}>
    <main style={{ padding }}>
      {children}
    </main>
  </div>
)

export default Container
