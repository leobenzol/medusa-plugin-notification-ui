export const DEFAULT_TEMPLATES = {
  "blank": {
    template_code: "<Html>\n</Html>",
  },
  "basic": {
    template_code: `
<Html>
  <Head />
  <Tailwind
    config={{
      presets: [pixelBasedPreset],
      theme: {
        extend: {
          colors: {
            brand: '#2250f4',
            offwhite: '#fafbfb',
          },
          spacing: {
            0: '0px',
            20: '20px',
            45: '45px',
          },
        },
      },
    }}
  >
    <Preview>Netlify Welcome</Preview>
    <Body className="bg-offwhite font-sans text-base">
      <Img
        src={\`\${ baseUrl }/static/netlify - logo.png\`}
        width="184"
        height="75"
        alt="Netlify"
        className="mx-auto my-20"
      />
      <Container className="bg-white p-45">
        <Heading className="my-0 text-center leading-8">
          Welcome to Netlify
        </Heading>

        <Section>
          <Row>
            <Text className="text-base">
              Congratulations! You're joining over 3 million developers
              around the world who use Netlify to build and ship sites,
              stores, and apps.
            </Text>

            <Text className="text-base">Here's how to get started:</Text>
          </Row>
        </Section>

        <ul>{steps?.map(({ Description }) => Description)}</ul>

        <Section className="text-center">
          <Button className="rounded-lg bg-brand px-[18px] py-3 text-white">
            Go to your dashboard
          </Button>
        </Section>

        <Section className="mt-45">
          <Row>
            {links?.map((link) => (
              <Column key={link.title}>
                <Link
                  className="font-bold text-black underline"
                  href={link.href}
                >
                  {link.title}
                </Link>{' '}
                <span className="text-green-500">→</span>
              </Column>
            ))}
          </Row>
        </Section>
      </Container>

      <Container className="mt-20">
        <Section>
          <Row>
            <Column className="px-20 text-right">
              <Link>Unsubscribe</Link>
            </Column>
            <Column className="text-left">
              <Link>Manage Preferences</Link>
            </Column>
          </Row>
        </Section>
        <Text className="mb-45 text-center text-gray-400">
          Netlify, 44 Montgomery Street, Suite 300 San Francisco, CA
        </Text>
      </Container>
    </Body>
  </Tailwind>
</Html>
    `,
  },
  "transactional": {
    template_code: "transactional",
  },
  "promotional": {
    template_code: "promotional",
  },
}
