export const PROMOTIONAL_TEMPLATE = `
const React = require("react")
const {Html, Head, Preview, Body, Container, Section, Heading, Text, Button, Hr, Img} = require("@react-email/components")

const PromotionalEmail = ({title, subtitle, offerText, discountCode, ctaText, ctaUrl, imageUrl}) => 
<Html>
  <Head />
  <Preview>{title || "Special Offer Just for You!"}</Preview>
  <Body style={main}>
    <Container style={container}>
      {imageUrl && (
        <Section style={imageSection}>
          <Img src={imageUrl} alt="Promotional Banner" style={image} />
        </Section>
      )}
      
      <Heading style={heading}>{title || "🎉 Special Offer!"}</Heading>
      <Text style={subtitle}>{subtitle || "Limited Time Only"}</Text>
      
      <Section style={offerBox}>
        <Text style={offerText}>
          {offerText || "Get 50% OFF on all products"}
        </Text>
        {discountCode && (
          <Section style={codeBox}>
            <Text style={codeLabel}>Use Code:</Text>
            <Text style={code}>{discountCode}</Text>
          </Section>
        )}
      </Section>

      <Button style={button} href={ctaUrl || "https://example.com"}>
        {ctaText || "Shop Now"}
      </Button>

      <Hr style={hr} />

      <Text style={details}>
        • Valid until December 31, 2025
        <br />
        • Cannot be combined with other offers
        <br />
        • Terms and conditions apply
      </Text>

      <Hr style={hr} />

      <Text style={footer}>
        Don't want to receive promotional emails? You can unsubscribe at any time.
      </Text>
    </Container>
  </Body>
</Html>

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const imageSection = {
  padding: '0',
  margin: '0',
}

const image = {
  width: '100%',
  height: 'auto',
  display: 'block',
}

const heading = {
  fontSize: '36px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  padding: '24px 24px 0',
  textAlign: 'center',
}

const subtitle = {
  fontSize: '18px',
  lineHeight: '1.4',
  fontWeight: '600',
  color: '#5469d4',
  textAlign: 'center',
  padding: '8px 24px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
}

const offerBox = {
  backgroundColor: '#f0f4ff',
  borderRadius: '8px',
  padding: '32px',
  margin: '24px',
  textAlign: 'center',
}

const offerText = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#484848',
  margin: '0 0 16px 0',
}

const codeBox = {
  backgroundColor: '#ffffff',
  border: '2px dashed #5469d4',
  borderRadius: '4px',
  padding: '16px',
  marginTop: '16px',
}

const codeLabel = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#8898aa',
  textTransform: 'uppercase',
  margin: '0 0 8px 0',
}

const code = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#5469d4',
  letterSpacing: '2px',
  margin: '0',
}

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  width: '280px',
  padding: '16px',
  margin: '24px auto',
}

const details = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#484848',
  padding: '0 24px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 24px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 24px',
  marginTop: '24px',
  textAlign: 'center',
}

PromotionalEmail.PreviewProps = {
  title: "🎉 Holiday Sale - 50% OFF!",
  subtitle: "Limited Time Offer",
  offerText: "Get 50% OFF on all products",
  discountCode: "HOLIDAY50",
  ctaText: "Shop Now",
  ctaUrl: "https://example.com/sale",
  imageUrl: "https://via.placeholder.com/600x300/5469d4/ffffff?text=Holiday+Sale",
}

module.exports = PromotionalEmail
`
