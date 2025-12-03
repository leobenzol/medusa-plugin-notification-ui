export const TRANSACTIONAL_TEMPLATE = `
const React = require("react")
const {Html, Head, Preview, Body, Container, Section, Heading, Text, Button, Hr, Row, Column} = require("@react-email/components")

const TransactionalEmail = ({orderNumber, orderDate, items, total, trackingUrl}) => 
<Html>
  <Head />
  <Preview>Order Confirmation #{orderNumber}</Preview>
  <Body style={main}>
    <Container style={container}>
      <Heading style={heading}>Order Confirmed</Heading>
      <Text style={text}>
        Thank you for your order! We've received your payment and your order is being processed.
      </Text>
      
      <Section style={orderInfo}>
        <Row>
          <Column>
            <Text style={label}>Order Number:</Text>
            <Text style={value}>{orderNumber || "ORD-123456"}</Text>
          </Column>
          <Column>
            <Text style={label}>Order Date:</Text>
            <Text style={value}>{orderDate || "December 3, 2025"}</Text>
          </Column>
        </Row>
      </Section>

      <Hr style={hr} />

      <Heading as="h2" style={subheading}>Order Details</Heading>
      {items?.map((item, index) => (
        <Section key={index} style={itemSection}>
          <Row>
            <Column style={{width: '70%'}}>
              <Text style={itemName}>{item.name}</Text>
              <Text style={itemDetails}>Qty: {item.quantity}</Text>
            </Column>
            <Column style={{width: '30%', textAlign: 'right'}}>
              <Text style={itemPrice}>\${item.price}</Text>
            </Column>
          </Row>
        </Section>
      ))}

      <Hr style={hr} />

      <Section style={totalSection}>
        <Row>
          <Column style={{width: '70%'}}>
            <Text style={totalLabel}>Total:</Text>
          </Column>
          <Column style={{width: '30%', textAlign: 'right'}}>
            <Text style={totalAmount}>\${total || "99.99"}</Text>
          </Column>
        </Row>
      </Section>

      {trackingUrl && (
        <Button style={button} href={trackingUrl}>
          Track Your Order
        </Button>
      )}

      <Hr style={hr} />

      <Text style={footer}>
        If you have any questions about your order, please contact our support team.
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

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  padding: '24px',
  textAlign: 'center',
}

const subheading = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '600',
  color: '#484848',
  padding: '0 24px',
  marginTop: '24px',
}

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
  padding: '0 24px',
}

const orderInfo = {
  padding: '0 24px',
  marginTop: '24px',
}

const label = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#8898aa',
  textTransform: 'uppercase',
  margin: '0',
}

const value = {
  fontSize: '16px',
  color: '#484848',
  margin: '4px 0 0 0',
}

const itemSection = {
  padding: '8px 24px',
}

const itemName = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#484848',
  margin: '0',
}

const itemDetails = {
  fontSize: '14px',
  color: '#8898aa',
  margin: '4px 0 0 0',
}

const itemPrice = {
  fontSize: '16px',
  color: '#484848',
  margin: '0',
}

const totalSection = {
  padding: '16px 24px',
}

const totalLabel = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#484848',
  margin: '0',
}

const totalAmount = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#484848',
  margin: '0',
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
  margin: '24px auto',
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
}

TransactionalEmail.PreviewProps = {
  orderNumber: "ORD-789012",
  orderDate: "December 3, 2025",
  items: [
    {name: "Premium Product", quantity: 2, price: "49.99"},
    {name: "Standard Product", quantity: 1, price: "29.99"},
  ],
  total: "129.97",
  trackingUrl: "https://example.com/track/789012",
}

module.exports = TransactionalEmail
`
