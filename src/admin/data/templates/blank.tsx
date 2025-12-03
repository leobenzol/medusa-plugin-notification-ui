export const BLANK_TEMPLATE = `
const React = require("react")
const {Html, Head, Preview, Body} = require("@react-email/components")

const BlankEmail = () => 
<Html>
  <Head />
  <Preview>Blank Template</Preview>
  <Body>
  </Body>
</Html>

BlankEmail.PreviewProps = {}

module.exports = BlankEmail
`
