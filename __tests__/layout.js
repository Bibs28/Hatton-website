import React from "react"
import renderer from "react-test-renderer"

import Layout from "../src/components/layout/layout"

const dataFixture = {
  site: {
    siteMetadata: {
      title: "Site title",
      copyright: "Copyright text",
    },
  },
  allFooterLinksJson: {
    edges: [{
      node: {
        sectionTitle: "Section title",
        items: {
          title: "Item title",
          url: "Item url",
        },
      },
    }],
  },
  allHeaderLinksJson: {
    edges: [{
      node: {
        title: "Link title",
        url: "Link url",
      },
    }],
  },
};

describe.skip("Layout", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Layout data={dataFixture}>
          <p>Some content here</p>
        </Layout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
