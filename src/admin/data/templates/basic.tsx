export const BASIC_TEMPLATE_JSX = `<Html>
  <Head />
  <Preview>{title}</Preview>
  <Body style={main}>
    <Container style={container}>
      <Heading style={heading}>{title || "Hello!"}</Heading>
      <Text style={text}>
        {message || "This is a basic email template with simple styling."}
      </Text>
      {buttonText && buttonUrl && (
        <Button style={button} href={buttonUrl}>
          {buttonText}
        </Button>
      )}
      <Hr style={hr} />
      <Text style={footer}>
        If you have any questions, please contact our support team.
      </Text>
    </Container>
  </Body>
</Html>`

export const BASIC_TEMPLATE_ADDITIONAL = `const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  padding: '24px',
}

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
  padding: '0 24px',
}

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  width: '200px',
  padding: '12px',
  margin: '24px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 24px',
}`

export const BASIC_TEMPLATE_PREVIEW_PROPS = `
  title: "Welcome",
  message: "Thank you for signing up. We're excited to have you on board!",
  buttonText: "Get Started",
  buttonUrl: "https://example.com",
`

export const BASIC_TEMPLATE_I18N = ``

export const BASIC_TEMPLATE = {
  jsx: BASIC_TEMPLATE_JSX,
  additional: BASIC_TEMPLATE_ADDITIONAL,
  preview_props: BASIC_TEMPLATE_PREVIEW_PROPS,
  i18n: BASIC_TEMPLATE_I18N,
}
