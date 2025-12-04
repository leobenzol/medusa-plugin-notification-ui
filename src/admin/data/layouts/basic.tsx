export const BASIC_LAYOUT_JSX = `<Html>
  <Head />
  <Preview>{previewText || "Email Preview"}</Preview>
  <Body style={main}>
    {logoUrl && (
      <Container style={logoContainer}>
        <Img src={logoUrl} alt={companyName || "Logo"} style={logo} />
      </Container>
    )}
    
    <Container style={container}>
      {children}
    </Container>

    <Container style={footer}>
      <Hr style={hr} />
      <Text style={footerText}>
        {footerText || "© 2025 All rights reserved."}
      </Text>
    </Container>
  </Body>
</Html>`

export const BASIC_LAYOUT_ADDITIONAL = `const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const logoContainer = {
  padding: '20px',
  textAlign: 'center',
}

const logo = {
  width: '150px',
  height: 'auto',
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
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center',
  padding: '0 24px 24px',
}`

export const BASIC_LAYOUT_PREVIEW_PROPS = `
  previewText: "Basic Layout Preview",
  logoUrl: "https://via.placeholder.com/150x50",
  companyName: "Your Company",
  footerText: "© 2025 Your Company. All rights reserved.",
  children: null,
`

export const BASIC_LAYOUT_I18N = ``

export const BASIC_LAYOUT = {
  jsx: BASIC_LAYOUT_JSX,
  additional: BASIC_LAYOUT_ADDITIONAL,
  preview_props: BASIC_LAYOUT_PREVIEW_PROPS,
  i18n: BASIC_LAYOUT_I18N,
}
