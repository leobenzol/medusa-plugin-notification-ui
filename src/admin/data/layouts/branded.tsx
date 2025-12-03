export const BRANDED_LAYOUT = `
const React = require("react")
const {Html, Head, Preview, Body, Container, Section, Hr, Text, Img, Link, Row, Column} = require("@react-email/components")

const BrandedLayout = ({children, previewText, logoUrl, companyName, brandColor, headerText, footerLinks, socialLinks, addressText}) => 
<Html>
  <Head />
  <Preview>{previewText || "Email Preview"}</Preview>
  <Body style={main}>
    <Container style={{...header, backgroundColor: brandColor || '#5469d4'}}>
      {logoUrl && (
        <Img src={logoUrl} alt={companyName || "Logo"} style={logo} />
      )}
      {headerText && (
        <Text style={headerTextStyle}>{headerText}</Text>
      )}
    </Container>
    
    <Container style={container}>
      {children}
    </Container>

    <Container style={footer}>
      <Hr style={hr} />
      
      {socialLinks && socialLinks.length > 0 && (
        <Section style={socialSection}>
          <Row>
            {socialLinks.map((link, index) => (
              <Column key={index} style={{textAlign: 'center', padding: '0 8px'}}>
                <Link href={link.url} style={socialLink}>
                  {link.label}
                </Link>
              </Column>
            ))}
          </Row>
        </Section>
      )}

      {footerLinks && footerLinks.length > 0 && (
        <Section style={linksSection}>
          <Row>
            {footerLinks.map((link, index) => (
              <Column key={index} style={{textAlign: 'center', padding: '0 8px'}}>
                <Link href={link.url} style={footerLink}>
                  {link.label}
                </Link>
              </Column>
            ))}
          </Row>
        </Section>
      )}

      <Text style={footerText}>
        {addressText || "123 Main Street, City, State 12345"}
      </Text>
      
      <Text style={copyright}>
        © 2025 {companyName || "Your Company"}. All rights reserved.
      </Text>
    </Container>
  </Body>
</Html>

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const header = {
  padding: '32px 20px',
  textAlign: 'center',
}

const logo = {
  width: '150px',
  height: 'auto',
  margin: '0 auto',
}

const headerTextStyle = {
  color: '#ffffff',
  fontSize: '14px',
  marginTop: '16px',
  textAlign: 'center',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '24px',
  maxWidth: '600px',
}

const footer = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '0 20px 40px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const socialSection = {
  padding: '20px 0',
}

const socialLink = {
  color: '#5469d4',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
}

const linksSection = {
  padding: '12px 0',
}

const footerLink = {
  color: '#484848',
  fontSize: '12px',
  textDecoration: 'underline',
}

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center',
  padding: '12px 0',
}

const copyright = {
  color: '#8898aa',
  fontSize: '11px',
  textAlign: 'center',
}

BrandedLayout.PreviewProps = {
  previewText: "Branded Layout Preview",
  logoUrl: "https://via.placeholder.com/150x50",
  companyName: "Your Company",
  brandColor: "#5469d4",
  headerText: "Welcome to Your Company",
  footerLinks: [
    {label: "Terms", url: "https://example.com/terms"},
    {label: "Privacy", url: "https://example.com/privacy"},
    {label: "Contact", url: "https://example.com/contact"},
  ],
  socialLinks: [
    {label: "Twitter", url: "https://twitter.com"},
    {label: "Facebook", url: "https://facebook.com"},
    {label: "LinkedIn", url: "https://linkedin.com"},
  ],
  addressText: "123 Main Street, San Francisco, CA 94102",
  children: null,
}

module.exports = BrandedLayout
`
