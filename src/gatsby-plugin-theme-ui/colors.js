import merge from "deepmerge"

const purple60 = `#663399`
const purple30 = `#D9BAE8`
const grey90 = `#232129`
const black80 = `#1B1F23`
const white = `#fff`
const lightWhite = `rgba(255, 255, 255, 0.86)`
const opaqueLightYellow = `rgba(255, 229, 100, 0.2)`
const opaqueLightWhite = `hsla(0, 0%, 100%, 0.2)`
const lightGray = `hsla(0, 0%, 0%, 0.2)`

const defaultThemeColors = {
  text: grey90,
  background: white,
  primary: purple60,
  secondary: black80,
  muted: lightGray,
  highlight: opaqueLightYellow,
  heading: grey90,
  prism: {
    background: `#011627`,
    comment: `#809393`,
    string: `#addb67`,
    var: `#d6deeb`,
    number: `#f78c6c`,
    constant: `#82aaff`,
    punctuation: `#c792ea`,
    className: `#ffc98b`,
    tag: `#ffa7c4`,
    boolean: `#ff5874`,
    property: `#80cbc4`,
    namespace: `#b2ccd6`,
    highlight: `hsla(207, 95%, 15%, 1)`,
  },
  modes: {
    dark: {
      text: lightWhite,
      background: grey90,
      primary: purple30,
      secondary: lightWhite,
      muted: opaqueLightWhite,
      highlight: purple60,
      heading: white,
    },
  },
}

/*
 * Want to change your theme colors?
 * Try uncommenting the color overrides below
 * to go from default purple to a blue theme
 */

const darkBlue = `#007acc`
const lightBlue = `#66E0FF`
const blueGray = `#282c35`

export default merge(defaultThemeColors, {
  text: blueGray,
  primary: darkBlue,
  heading: blueGray,
  darkBlue,
  // background: 'red',
  modes: {
    dark: {
      background: blueGray,
      primary: lightBlue,
      highlight: lightBlue,
    },
  },
})
