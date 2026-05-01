import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface RegisterConfirmationEmailProps {
  name: string;
  email: string;
  organization?: string;
  category: string;
}

export default function RegisterConfirmationEmail({
  name,
  email,
  organization,
  category,
}: RegisterConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Registration Confirmed - Zero Prize</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerBar} />
          <Section style={logoSection}>
            <img
              src="https://www.zeroprize.org/zeroprize_logo.png"
              alt="Zero Prize"
              style={logo}
            />
          </Section>
          <Heading style={h1}>Registration Confirmed!</Heading>
          
          <Text style={text}>
            Dear {name},
          </Text>
          
          <Text style={text}>
            Thank you for your interest in the Zero Prize! We have received your registration and will keep you updated on the application timeline and important announcements.
          </Text>
          
          <Section style={detailsSection}>
            <Text style={detailsHeading}>Your Registration Details:</Text>
            <Text style={detailsText}><strong>Name:</strong> {name}</Text>
            <Text style={detailsText}><strong>Email:</strong> {email}</Text>
            {organization && <Text style={detailsText}><strong>Organization:</strong> {organization}</Text>}
            <Text style={detailsText}><strong>Category of Interest:</strong> {category}</Text>
          </Section>
          
          <Section style={infoBox}>
            <Text style={infoHeading}>What's Next?</Text>
            <Text style={infoText}>
              • The application portal will open in February 2026<br />
              • We'll send you updates on key dates and requirements<br />
              • Visit our FAQ page for detailed information<br />
              • Follow us on social media for latest news
            </Text>
          </Section>
          
          <Text style={text}>
            Have questions? Contact us at{' '}
            <a href="mailto:zeroprize@policyandgovernance.in" style={link}>
              zeroprize@policyandgovernance.in
            </a>
          </Text>
          
          <Text style={footer}>
            Best regards,<br />
            The Zero Prize Team<br />
            School of Policy & Governance
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const headerBar = { backgroundColor: '#1D9770', height: '4px', borderRadius: '4px 4px 0 0' };

const logoSection = {
  textAlign: 'center' as const,
  padding: '28px 0 20px',
};

const logo = {
  height: '44px',
  width: 'auto',
  margin: '0 auto',
  display: 'block' as const,
};

const h1 = {
  color: '#1A5F52',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const detailsSection = {
  backgroundColor: '#F2EEEE',
  padding: '24px',
  margin: '24px 0',
  borderRadius: '4px',
};

const detailsHeading = {
  color: '#1A5F52',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const detailsText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
};

const infoBox = {
  backgroundColor: '#7AD1C3',
  padding: '24px',
  margin: '24px 0',
  borderRadius: '4px',
};

const infoHeading = {
  color: '#030303',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const infoText = {
  color: '#030303',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
};

const link = {
  color: '#1D9770',
  textDecoration: 'underline',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '22px',
  marginTop: '32px',
  borderTop: '1px solid #eee',
  paddingTop: '24px',
};
