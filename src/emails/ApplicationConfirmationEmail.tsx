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

interface ApplicationConfirmationEmailProps {
  applicantName: string;
  solutionTitle: string;
  category: string;
  applicationId: string;
}

const categoryLabel: Record<string, string> = {
  air: 'Air Quality',
  water: 'Water Pollution',
  land: 'Land Pollution',
};

export default function ApplicationConfirmationEmail({
  applicantName,
  solutionTitle,
  category,
  applicationId,
}: ApplicationConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Zero Prize application has been received — {solutionTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerBar} />
          <Section style={logoSection}>
            <img src="https://www.zeroprize.org/zeroprize_logo.png" alt="Zero Prize" style={logo} />
          </Section>

          <Heading style={h1}>Application Received!</Heading>
          <Text style={intro}>
            Dear {applicantName},<br /><br />
            Thank you for submitting your application to the Zero Prize. We have successfully
            received your entry and our team will review it carefully.
          </Text>

          <Section style={summaryCard}>
            <Text style={summaryHeading}>Your Application Summary</Text>
            <Text style={summaryRow}><strong>Solution:</strong> {solutionTitle}</Text>
            <Text style={summaryRow}><strong>Category:</strong> {categoryLabel[category] ?? category}</Text>
            <Text style={summaryRow}><strong>Reference ID:</strong> {applicationId}</Text>
          </Section>

          <Text style={body}>
            Please save your Reference ID above — you may be asked for it in future correspondence.
            You can login using your mail ID to edit the application.
          </Text>

          <Text style={body}>
            Our evaluation process involves a detailed review of technical merit, impact
            measurement strategy, economic viability, and community outcomes. We will be in touch
            if we need additional information or to notify you of next steps.
          </Text>

          <Section style={whatNext}>
            <Text style={whatNextHeading}>What happens next?</Text>
            <Text style={step}>① Our panel reviews all submissions against the evaluation framework.</Text>
            <Text style={step}>② Shortlisted teams will be contacted for further engagement.</Text>
            <Text style={step}>③ Winners are announced at the Zero Prize ceremony.</Text>
          </Section>

          <Text style={closing}>
            If you have any questions, reply to this email or write to us at{' '}
            <a href="mailto:zeroprize@policyandgovernance.in" style={link}>
              zeroprize@policyandgovernance.in
            </a>
          </Text>

          <Text style={footer}>
            Zero Prize · Policy &amp; Governance Initiative · India<br />
            This is an automated confirmation. Please do not reply directly to this email.
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
const logoSection = { textAlign: 'center' as const, padding: '28px 0 20px' };
const logo = { height: '44px', margin: '0 auto', display: 'block' as const };
const h1 = { color: '#0d1f1a', fontSize: '24px', fontWeight: '700', margin: '0 0 16px', textAlign: 'center' as const };
const intro = { color: '#374151', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' };
const summaryCard = {
  backgroundColor: '#f0fdf8',
  border: '1px solid #bbf7e0',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '24px',
};
const summaryHeading = { color: '#1D9770', fontSize: '12px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase' as const, margin: '0 0 12px' };
const summaryRow = { color: '#111827', fontSize: '14px', margin: '6px 0' };
const body = { color: '#4b5563', fontSize: '14px', lineHeight: '1.7', margin: '0 0 16px' };
const whatNext = {
  backgroundColor: '#fafafa',
  borderLeft: '3px solid #1D9770',
  borderRadius: '0 8px 8px 0',
  padding: '16px 20px',
  margin: '24px 0',
};
const whatNextHeading = { color: '#111827', fontSize: '14px', fontWeight: '700', margin: '0 0 12px' };
const step = { color: '#374151', fontSize: '14px', margin: '6px 0', lineHeight: '1.5' };
const closing = { color: '#4b5563', fontSize: '14px', lineHeight: '1.7', margin: '24px 0 0' };
const link = { color: '#1D9770', textDecoration: 'underline' };
const footer = { color: '#9ca3af', fontSize: '12px', textAlign: 'center' as const, marginTop: '32px', lineHeight: '1.6' };
