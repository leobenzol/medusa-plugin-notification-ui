export const BLANK_LAYOUT = `
const React = require("react")
const {Html, Head, Preview, Body} = require("@react-email/components")

const BlankLayout = ({children, previewText}) => 
<Html>
  <Head />
  <Preview>{previewText || "Email Preview"}</Preview>
  <Body>
    {children}
  </Body>
</Html>

BlankLayout.PreviewProps = {
  previewText: "This is a blank layout",
  children: null,
}

module.exports = BlankLayout
`
