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

interface ApplicationAdminEmailProps {
  applicantName: string;
  applicantEmail: string;
  applicantOrg: string;
  solutionTitle: string;
  category: string;
  applicationId: string;
}

const categoryLabel: Record<string, string> = {
  air: 'Air Quality',
  water: 'Water Pollution',
  land: 'Land Pollution',
};

export default function ApplicationAdminEmail({
  applicantName,
  applicantEmail,
  applicantOrg,
  solutionTitle,
  category,
  applicationId,
}: ApplicationAdminEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Application: {solutionTitle} — {categoryLabel[category] ?? category}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerBar} />
          <Section style={logoSection}>
            <img src="https://www.zeroprize.org/zeroprize_logo.png" alt="Zero Prize" style={logo} />
          </Section>

          <Heading style={h1}>New Prize Application Received</Heading>

          <Section style={alertBanner}>
            <Text style={alertText}>
              A new application has been submitted and is waiting for review.
            </Text>
          </Section>

          <Section style={detailsSection}>
            <Text style={detailsHeading}>Application Details</Text>
            <Text style={detail}><strong>Application ID:</strong> {applicationId}</Text>
            <Text style={detail}><strong>Solution Title:</strong> {solutionTitle}</Text>
            <Text style={detail}><strong>Category:</strong> {categoryLabel[category] ?? category}</Text>
          </Section>

          <Section style={detailsSection}>
            <Text style={detailsHeading}>Applicant Details</Text>
            <Text style={detail}><strong>Name:</strong> {applicantName}</Text>
            <Text style={detail}><strong>Email:</strong> {applicantEmail}</Text>
            <Text style={detail}><strong>Organisation:</strong> {applicantOrg}</Text>
          </Section>

          <Section style={ctaSection}>
            <Text style={ctaText}>
              Log in to the admin dashboard to review the full application:
            </Text>
            <a href="https://zeroprize.in/admin" style={ctaButton}>
              View in Admin Dashboard →
            </a>
          </Section>

          <Text style={footer}>Zero Prize · Policy &amp; Governance Initiative · India</Text>
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
const h1 = { color: '#0d1f1a', fontSize: '22px', fontWeight: '700', margin: '0 0 20px', textAlign: 'center' as const };
const alertBanner = {
  backgroundColor: '#f0fdf8',
  border: '1px solid #bbf7e0',
  borderRadius: '8px',
  padding: '12px 16px',
  marginBottom: '24px',
};
const alertText = { color: '#166534', fontSize: '14px', margin: '0' };
const detailsSection = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '16px 20px',
  marginBottom: '16px',
};
const detailsHeading = { color: '#1D9770', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' as const, margin: '0 0 12px' };
const detail = { color: '#374151', fontSize: '14px', margin: '4px 0' };
const ctaSection = { textAlign: 'center' as const, padding: '24px 0 8px' };
const ctaText = { color: '#6b7280', fontSize: '14px', marginBottom: '16px' };
const ctaButton = {
  backgroundColor: '#1D9770',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};
const footer = { color: '#9ca3af', fontSize: '12px', textAlign: 'center' as const, marginTop: '32px' };
