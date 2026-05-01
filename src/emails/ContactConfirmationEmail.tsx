import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactConfirmationEmailProps {
  name: string;
  interestedIn: string;
}

export default function ContactConfirmationEmail({
  name,
  interestedIn,
}: ContactConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Zero Prize</Preview>
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

          {interestedIn === 'apply' && (
            <>
              <Text style={text}>Dear {name},</Text>
              <Text style={text}>
                Thank you for showing interest in the Zero Prize challenge.
              </Text>
              <Text style={text}>
                Applications for the Zero Prize are officially open from March 15th, 2026.
                You can apply by clicking on the &ldquo;Apply Now&rdquo; button on the{' '}
                <a href="https://www.zeroprize.org/apply" style={link}>
                  Zero Prize website
                </a>
                .
              </Text>
              <Text style={footer}>
                Thank you.<br />
                Team Zero Prize
              </Text>
            </>
          )}

          {interestedIn === 'partnerships' && (
            <>
              <Text style={text}>Dear {name},</Text>
              <Text style={text}>
                Greetings from the Zero Prize team at the School of Policy and Governance (SPG).
                At SPG, we work to bring together policy, innovation, and capacity building to
                address pressing environmental challenges.
              </Text>
              <Text style={text}>
                Thank you for reaching out and for expressing your interest in partnering with
                the Zero Prize, a national results-based challenge designed to reward
                independently verified, measurable reductions in air, water, and land pollution
                across India. The Zero Prize aims to catalyse scalable solutions by bringing
                together innovators, industry, policymakers, and civil society to demonstrate
                real-world pollution reduction outcomes.
              </Text>
              <Text style={text}>
                Please let us know a convenient date and time for an online meeting to take
                this conversation forward.
              </Text>
              <Text style={footer}>
                Thank you.<br />
                Ms Shreelata Krishnan<br />
                Director at SPG and Zero Prize
              </Text>
            </>
          )}

          {interestedIn === 'sponsorships' && (
            <>
              <Text style={text}>Dear {name},</Text>
              <Text style={text}>
                Greetings from the Zero Prize team at the School of Policy and Governance (SPG).
                At SPG, we work to bring together policy, innovation, and capacity building to
                address pressing environmental challenges.
              </Text>
              <Text style={text}>
                Thank you for reaching out and for expressing your interest in sponsoring the
                Zero Prize, a national results-based challenge designed to reward independently
                verified, measurable reductions in air, water, and land pollution across India.
                The Zero Prize aims to catalyse scalable solutions by bringing together
                innovators, industry, policymakers, and civil society to demonstrate real-world
                pollution reduction outcomes.
              </Text>
              <Text style={text}>
                Please let us know a convenient date and time for an online meeting to take
                this conversation forward.
              </Text>
              <Text style={footer}>
                Thank you.<br />
                Ms Shreelata Krishnan<br />
                Director at SPG and Zero Prize
              </Text>
            </>
          )}

          {(interestedIn === 'media' || interestedIn === 'volunteering') && (
            <>
              <Text style={text}>Dear {name},</Text>
              <Text style={text}>
                Thank you for showing interest in the Zero Prize challenge.
                Applications for the Zero Prize will officially open now.
              </Text>
              <Text style={text}>
                Please let us know your query, so we can get back to you accordingly.
              </Text>
              <Text style={footer}>
                Thank you.<br />
                Team Zero Prize
              </Text>
            </>
          )}
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

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
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
