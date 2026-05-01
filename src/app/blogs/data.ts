export type BlogTextRun = {
  text: string;
  bold?: boolean;
};

export type BlogBlock =
  | {
      type: "heading";
      runs: BlogTextRun[];
    }
  | {
      type: "paragraph";
      runs: BlogTextRun[];
    }
  | {
      type: "list";
      items: BlogTextRun[][];
    }
  | {
      type: "image";
      src: string;
    };

export type BlogPost = {
  slug: string;
  title: string;
  heroImage: string;
  excerpt: string;
  content: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "the-zero-prize-for-a-pollution-free-india",
    title: "The Zero Prize: For A Pollution Free India",
    heroImage: "/blogs/image1.jpg",
    excerpt:
      "India Habitat Centre witnessed more than just another event on 25 February 2026. It signalled a decisive shift from environmental promises to measurable impact.",
    content: [
      {
        type: "paragraph",
        runs: [
          {
            text: "India Habitat Centre witnessed more than just another event on 25 February 2026.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "It signalled a decisive shift from environmental promises to measurable impact.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "The Zero Prize, India’s first, national, results-based environmental prize was formally launched in New Delhi as part of Delhi Climate Innovation Week, in the presence of corporate and industry leaders, media, and civil society. Award-winning actor, producer, and environmental advocate Ms. Dia Mirza graced the occasion as Chief Guest. This ₹5 crore challenge shifts environmental action from intent to impact by recognising solutions that demonstrate real-world outcomes within a defined timeframe.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "The Tamarind Hall at IHC was filled with Corporate, industry leaders, CSR heads, think tanks, media representatives, and influencers. But what was different was not the guest list but the tone of the event.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "This was not a celebratory environmental gala. It was a structured national challenge which echoed the urgency of the pollution crisis. As articulated in the press release issued the same day: the Zero Prize is India’s first results-based environmental award linking financial reward directly to independently verified pollution reduction.",
          },
        ],
      },
      {
        type: "heading",
        runs: [{ text: "A National Call to Move Beyond Promises", bold: true }],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "For years, conversations around pollution have revolved around commitments, announcements, pilot projects, and projected impact.The Zero Prize aims to change that. Chaired by Mr.Saket Burman, Vice Chairman of Dabur India Ltd., and conceptualised and convened by the School of Policy and Governance (SPG), this ₹5 crore national challenge rewards only one thing: ",
          },
          {
            text: "Independently verified, measurable reductions in air, water, and land pollution.",
            bold: true,
          },
        ],
      },
      {
        type: "paragraph",
        runs: [{ text: "No promises,   No projections,   Only results." }],
      },
      {
        type: "image",
        src: "/blogs/image2.jpg",
      },
      {
        type: "image",
        src: "/blogs/image1.jpg",
      },
      {
        type: "heading",
        runs: [
          {
            text: "A Powerful Beginning: Leadership on One Stage",
            bold: true,
          },
        ],
      },
      {
        type: "paragraph",
        runs: [{ text: "The launch brought together leadership across sectors:" }],
      },
      {
        type: "list",
        items: [
          [
            { text: "Ms. Dia Mirza", bold: true },
            {
              text: ", award-winning actor, producer, and environmental advocate, joined as Chief Guest, lending her voice to the urgency of translating awareness into accountability.",
            },
          ],
          [
            { text: "Mr. Ruchir Punjabi", bold: true },
            {
              text: ", Chairperson, School of Policy and Governance, sees the Zero Prize as a catalytic national platform that mobilises India’s brightest innovators to deliver urgent, science-backed, and independently verified solutions to the country’s pollution crisis.”",
            },
          ],
          [
            { text: "Mr. Saket Burman", bold: true },
            {
              text: ", Co-Founder and Chair of the Zero Prize, formally announced the national call to action.",
            },
          ],
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "In a featured conversation titled “From Awareness to Accountability: Making Pollution Reduction Measurable,” the message was clear: India’s pollution challenge demands verifiable impact not just ambition.",
          },
        ],
      },
      {
        type: "heading",
        runs: [{ text: "Why the Zero Prize Matters", bold: true }],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "India faces one of the most complex pollution crises in the world: across urban air, industrial discharge, and unmanaged waste systems.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "While funding for sustainability is growing, much of it still rewards activity rather than independently validated environmental performance.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [{ text: "The Zero Prize introduces a different framework:" }],
      },
      {
        type: "list",
        items: [
          [{ text: "Defined geographic boundaries" }],
          [{ text: "Baseline environmental measurement" }],
          [{ text: "12-month implementation" }],
          [{ text: "Third-party independent validation" }],
          [{ text: "Awards disbursed only after verified improvement" }],
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "The Prize aligns with national missions including the National Clean Air Programme (NCAP), Namami Gange, and Swachh Bharat Mission 2.0 but it operates as an accountability accelerator.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "It creates a competitive incentive for India’s brightest innovators, startups, municipal bodies, NGOs, research institutions, and corporates to deliver measurable improvement on the ground.",
          },
        ],
      },
      {
        type: "heading",
        runs: [{ text: "What Happens Next", bold: true }],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Applications for the Zero Prize open in March 2026. Eligible applicants must demonstrate real-world pilots within defined geographies and undergo third-party monitoring and validation.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Winners will be announced in February 2027 after independent evaluation and verification.",
          },
        ],
      },
      {
        type: "heading",
        runs: [{ text: "A Turning Point", bold: true }],
      },
      {
        type: "paragraph",
        runs: [
          { text: "Environmental transformation requires three things:" },
        ],
      },
      {
        type: "list",
        items: [
          [{ text: "Innovation" }],
          [{ text: "Capital" }],
          [{ text: "Accountability" }],
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "India already has innovation. India has capital. The Zero Prize introduces accountability at scale.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "As the conversations concluded and the media brief unfolded, one idea resonated across the room: If you can measurably clean India’s air, water, or land, the nation will recognise you.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "The Zero Prize is not the end of a conversation. It is the beginning of a measurable movement.",
          },
        ],
      },
    ],
  },
];
