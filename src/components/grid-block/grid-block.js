import React from "react"
import classNames from "classnames"
import Img from "gatsby-image"

import "./grid-block.module.css"


class GridBlock extends React.Component {
  renderBlock(origBlock) {
    const blockDefaults = {
      imageAlign: "left",
    }

    const block = {
      ...blockDefaults,
      ...origBlock,
    }

    const blockClasses = classNames("blockElement", this.props.className, {
      alignCenter: this.props.align === "center",
      alignRight: this.props.align === "right",
      fourByGridBlock: this.props.layout === "fourColumn",
      imageAlignSide:
        block.image &&
        (block.imageAlign === "left" || block.imageAlign === "right"),
      imageAlignTop: block.image && block.imageAlign === "top",
      imageAlignRight: block.image && block.imageAlign === "right",
      imageAlignBottom: block.image && block.imageAlign === "bottom",
      imageAlignLeft: block.image && block.imageAlign === "left",
      threeByGridBlock: this.props.layout === "threeColumn",
      twoByGridBlock: this.props.layout === "twoColumn",
    })

    const topLeftImage =
      (block.imageAlign === "top" || block.imageAlign === "left") &&
      this.renderBlockImage(block.image, block.imageLink, block.imageAlt)

    const bottomRightImage =
      (block.imageAlign === "bottom" || block.imageAlign === "right") &&
      this.renderBlockImage(block.image, block.imageLink, block.imageAlt)

    return (
      <div
        className={blockClasses}
        key={`${block.id}-${block.title}`}
        style={{...this.props.blockStyle}}
      >
        {topLeftImage}
        <div className="blockContent">
          {this.renderBlockTitle(block.title)}
          <div>
            {block.content}
          </div>
        </div>
        {bottomRightImage}
      </div>
    )
  }

  renderBlockImage(image, imageLink, imageAlt) {
    if (!image) {
      return null
    }

    return (
      <div className="blockImage" style={{...this.props.imgContainerStyle}}>
        {imageLink ? (
          <a href={imageLink}>
            {this.props.useGatsbyImg ? (
              <Img fluid={image} alt={imageAlt} title={imageAlt} imgStyle={{...this.props.imgStyle}} />
            ) : (
              <img src={image} alt={imageAlt} title={imageAlt} style={{...this.props.imgStyle}} />
            )}
          </a>
        ) : (
          this.props.useGatsbyImg ? (
            <Img fluid={image} alt={imageAlt} title={imageAlt} imgStyle={{...this.props.imgStyle}} />
          ) : (
            <img src={image} alt={imageAlt} title={imageAlt} style={{...this.props.imgStyle}} />
          )
        )}
      </div>
    )
  }

  renderBlockTitle(title) {
    if (!title) {
      return null
    }

    return (
      <h2>
        <div>{title}</div>
      </h2>
    )
  }

  render() {
    return (
      <div className="gridBlock">
        {this.props.contents.map(this.renderBlock, this)}
      </div>
    )
  }
}

GridBlock.defaultProps = {
  align: "left",
  contents: [],
  layout: "twoColumn",
}

export default GridBlock;
