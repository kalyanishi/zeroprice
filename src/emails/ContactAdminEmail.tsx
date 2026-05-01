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

interface ContactAdminEmailProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function ContactAdminEmail({
  name,
  email,
  phone,
  subject,
  message,
}: ContactAdminEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission - {subject}</Preview>
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
          <Heading style={h1}>New Contact Form Submission</Heading>
          
          <Section style={detailsSection}>
            <Text style={detailsHeading}>Contact Details:</Text>
            <Text style={detailsText}><strong>Name:</strong> {name}</Text>
            <Text style={detailsText}><strong>Email:</strong> {email}</Text>
            {phone && <Text style={detailsText}><strong>Phone:</strong> {phone}</Text>}
            <Text style={detailsText}><strong>Subject:</strong> {subject}</Text>
          </Section>
          
          <Section style={messageSection}>
            <Text style={detailsHeading}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Text style={footer}>
            Sent from Zero Prize Contact Form
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
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 24px',
};

const detailsSection = {
  backgroundColor: '#F2EEEE',
  padding: '20px',
  margin: '16px 0',
  borderRadius: '4px',
};

const messageSection = {
  padding: '20px',
  margin: '16px 0',
  border: '1px solid #eee',
  borderRadius: '4px',
};

const detailsHeading = {
  color: '#1A5F52',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const detailsText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '6px 0',
};

const messageText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '22px',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  color: '#999',
  fontSize: '12px',
  marginTop: '32px',
  textAlign: 'center' as const,
  borderTop: '1px solid #eee',
  paddingTop: '16px',
};
