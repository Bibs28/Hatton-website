import React from "react"
import renderer from "react-test-renderer"

import Header from "../src/components/layout/header/header"

describe.skip("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Header siteTitle="Hatton Enterprise Solutions"/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
