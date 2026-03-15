export type GoldenVisaTable = {
  head: string[]
  rows: string[][]
}

export type GoldenVisaAccordionItem = {
  title: string
  hint?: string
  body: string
}

export type GoldenVisaSection = {
  id: string
  tag: string
  title: string
  kicker?: string
  image?: string
  table?: GoldenVisaTable
  accordions?: GoldenVisaAccordionItem[]
}

export type GoldenVisaGuide = {
  meta: {
    eyebrow: string
    title: string
    subtitle: string
    description: string
    badges: string[]
    disclaimer: string
  }
  quickActions: GoldenVisaAccordionItem[]
  sections: GoldenVisaSection[]
}

export const goldenVisaGuide: GoldenVisaGuide = {
  meta: {
    eyebrow: 'Residency • Investment • Talent',
    title: 'The UAE Golden Visa',
    subtitle: 'Comprehensive Interactive Guide',
    description:
      'A practitioner-level guide to long-term residence in the United Arab Emirates: what the Golden Visa actually is, who it is designed for, the qualifying routes that matter in practice, the main numbers to know, and what to expect from initial structuring to final issuance and renewal.',
    badges: [
      '10-year residence',
      'No sponsor required',
      'Family inclusion',
      'Real estate >= AED 2m',
      'Investor and talent routes'
    ],
    disclaimer:
      'This guide is informational and summarises official UAE criteria in plain language. Always file through ICP, GDRFA or ADRO, and verify the applicable category, documents, fees and emirate-specific conditions at the time of your application.'
  },
  quickActions: [
    {
      title: 'Am I eligible?',
      hint: 'Understand which track fits your profile in under a minute.',
      body:
        'Most applicants fall under one of the main umbrellas: property and capital investors, entrepreneurs, exceptional talents, scientists and specialised professionals, top students and graduates, or specific humanitarian and frontline categories. If you already hold qualifying property, maintain significant investor equity, occupy a strategic role, or can document recognised achievements, you likely have a credible route to structure.'
    },
    {
      title: 'What does it cost?',
      hint: 'Separate the qualifying base from the administrative budget.',
      body:
        'Beyond the qualifying investment itself, applicants should budget for government application fees, entry or status change steps where applicable, medical fitness testing, Emirates ID issuance, translations, legalisation, valuation support, bank letters and advisory costs. In many common cases, government charges cluster around AED 2,500 to AED 7,000 per main applicant, excluding property transaction costs and professional assistance.'
    },
    {
      title: 'How do I apply?',
      hint: 'Which authority you actually deal with.',
      body:
        'Golden Visa applications typically move through ICP Smart Services at the federal level, GDRFA for Dubai processing, and ADRO or related Abu Dhabi channels for certain investor and entrepreneur tracks. In practice, the path usually includes route selection, document assembly, portal submission, pre-approval review, medical fitness, biometrics, Emirates ID issuance and ongoing renewal maintenance.'
    }
  ],
  sections: [
    {
      id: 'what',
      tag: 'Overview',
      title: 'What is the Golden Visa?',
      kicker:
        'A long-term residence framework designed to anchor capital, talent, family relocation and strategic presence in the UAE.',
      image: '/img/services/golden-visa.jpg',
      accordions: [
        {
          title: 'Definition and purpose',
          hint: 'What the Golden Visa actually gives you.',
          body:
            'The UAE Golden Visa is a renewable long-term residence permit, most often granted for ten years, that allows qualified applicants to live, work and study in the UAE without being tied to a traditional employer sponsor. Its policy purpose is broader than immigration convenience: it is a retention and attraction tool for investors, founders, highly skilled professionals, recognised talents and top academic profiles whose capital or expertise is seen as strategically valuable to the country.'
        },
        {
          title: 'Legal framework',
          hint: 'Where the rules come from and why they evolved.',
          body:
            'The program sits within the Executive Regulations of the Federal Decree-Law on Entry and Residence of Foreigners and was materially expanded in 2022. Federal implementation is handled through ICP, while emirate-level authorities such as GDRFA in Dubai and ADRO-linked channels in Abu Dhabi operationalise the routes locally. This is why the broad framework is federal, but some investor mechanics, evidentiary expectations and process flows can still vary in practice between emirates.'
        },
        {
          title: 'Authorities you interact with',
          hint: 'Who actually processes the file.',
          body:
            'In practice, applicants interact with ICP Smart Services for many federal steps, GDRFA for Dubai-specific residence processing, and Abu Dhabi investor or entrepreneur channels where applicable. Depending on the route, supporting documents may also come from banks, developers, employers, free zones, valuation experts, universities, incubators or relevant regulatory bodies. The real task is often less about finding one portal and more about assembling the right ecosystem of evidence around your category.'
        }
      ]
    },
    {
      id: 'use',
      tag: 'Use Cases',
      title: 'What is the Golden Visa used for?',
      kicker:
        'Beyond a visa sticker, it is a long-term planning instrument for relocation, assets, work and family.',
      image: '/img/services/investments.jpg',
      accordions: [
        {
          title: 'Long-term relocation',
          hint: 'Build a durable base in the UAE.',
          body:
            'The Golden Visa is often used by families, founders and internationally mobile professionals who want a stable multi-year horizon for residence, schooling, banking, property ownership and day-to-day life in the Emirates. It removes much of the uncertainty associated with short renewal cycles attached to conventional employment-linked visas.'
        },
        {
          title: 'Investment and diversification',
          hint: 'Residence aligned with capital allocation.',
          body:
            'Many applicants use the visa to align residence with real estate or capital deployment in the UAE. That can support a broader diversification strategy across currencies, jurisdictions and business interests while securing an operational foothold in one of the Gulf’s most active financial and real-estate environments.'
        },
        {
          title: 'Business and work flexibility',
          hint: 'Operate without one single sponsor.',
          body:
            'Because residence is anchored in your category rather than one employer, the Golden Visa gives more room to own companies, hold board or advisory roles, consult, change jobs, relocate between projects and structure professional life more flexibly over time. For founders and portfolio professionals, this autonomy is often one of the main reasons to choose the route.'
        },
        {
          title: 'Family planning',
          hint: 'Bring dependents under one structure.',
          body:
            'Golden Visa holders typically use it as the central residence framework for spouse and children, and in some cases parents or domestic workers depending on the route and emirate criteria. The result is a more coherent family setup rather than multiple short-term visas with fragmented sponsorship logic.'
        }
      ]
    },
    {
      id: 'who',
      tag: 'Eligibility',
      title: 'Who is it for? Main eligibility routes',
      kicker: 'The program is category-based, not nationality-based.',
      accordions: [
        {
          title: 'Property and capital investors',
          hint: 'The best-known route, but not the only one.',
          body:
            'The most visible pathway is real estate, where one or more qualifying properties reach at least AED 2,000,000 in value. Other investor tracks may involve deposits, business equity or listed securities depending on the emirate and route. Mortgaged assets can qualify where the required paid-up value or net equity conditions are met and properly evidenced through bank letters and valuation support.'
        },
        {
          title: 'Entrepreneurs and founders',
          hint: 'High-potential ventures and approved business profiles.',
          body:
            'Entrepreneur routes generally target founders of scalable or innovative businesses. Authorities may look at funding history, incubator participation, valuation, revenue, sector relevance or approvals from local economic bodies. The practical standard is not only whether a company exists, but whether it is documented as credible, active and strategically aligned with the chosen route.'
        },
        {
          title: 'Exceptional talents',
          hint: 'Recognition matters more than a salary threshold.',
          body:
            'Artists, creators, athletes, technologists and other high-recognition profiles may qualify through documented achievements, awards, rankings, portfolio strength, patents or official nomination and endorsement. In these tracks, evidentiary quality and third-party recognition often carry more weight than conventional employment metrics.'
        },
        {
          title: 'Scientists, researchers and professionals',
          hint: 'Advanced qualifications and recognised roles.',
          body:
            'Doctors, engineers, scientists, academics, senior executives and specialised professionals can qualify where accredited degrees, strategic sectors, salary criteria, licensing and employment evidence line up with the route. The practical review often looks at the entire picture: education, role, compensation, employer profile and the relevance of the profession to UAE priority sectors.'
        },
        {
          title: 'Students, graduates and special categories',
          hint: 'Academic excellence and extraordinary contribution routes.',
          body:
            'Top-performing students and graduates from recognised UAE or global institutions may access long-term residence, easing the transition from education to professional presence in the UAE. Separate categories may also recognise humanitarian work, philanthropy or frontline contributions, usually on a more documentary and case-specific basis.'
        }
      ]
    },
    {
      id: 'validity',
      tag: 'Duration',
      title: 'Validity, renewal and travel rules',
      kicker: 'How long it lasts, how renewal works and what travel flexibility really means.',
      table: {
        head: ['Track', 'Typical validity', 'Renewal logic'],
        rows: [
          [
            'Golden residence',
            '10 years',
            'Renewable while the underlying category and core qualifying conditions remain satisfied.'
          ],
          [
            'Select entrepreneur or student tracks',
            '5 years',
            'Renewable on updated evidence of business continuity, academic standing or continued eligibility.'
          ]
        ]
      },
      accordions: [
        {
          title: 'Travel flexibility',
          hint: 'Why this matters internationally.',
          body:
            'Unlike many standard residence visas, Golden Visa holders are generally not constrained by the classic six-month outside-UAE absence rule in the same way. This gives materially more flexibility for global travel, split residency patterns, commuting between jurisdictions and managing family or business obligations abroad without automatically jeopardising UAE status.'
        },
        {
          title: 'Renewal in practice',
          hint: 'You need to re-prove your route, not just request an extension.',
          body:
            'At renewal, authorities typically ask you to re-establish that you still satisfy your original route, whether through maintained property value, net equity, deposits, professional role, salary, business continuity or continued achievement. Renewal is therefore a documentary exercise as much as an administrative one, and strategic over-compliance helps.'
        }
      ]
    },
    {
      id: 'costs',
      tag: 'Numbers',
      title: 'Costs and investment thresholds',
      kicker: 'The headline threshold is only one layer of the real budget.',
      image: '/img/services/bank.jpg',
      table: {
        head: ['Component', 'Typical 2024-2025 figures'],
        rows: [
          ['Real estate minimum', 'AED 2,000,000 in qualifying property value'],
          ['Capital deposit route', 'Often from AED 2,000,000 depending on emirate and route'],
          ['Government fees', 'Approx. AED 2,500 to AED 7,000 per main applicant'],
          ['Medical fitness', 'Approx. AED 260 to AED 360'],
          ['Emirates ID', 'Roughly AED 1,075 for a 10-year card'],
          ['Additional file costs', 'Translation, legalisation, valuation, bank letters and advisory support as needed']
        ]
      },
      accordions: [
        {
          title: 'Mortgages and equity',
          hint: 'How financed property is treated.',
          body:
            'Mortgaged properties can qualify where the paid or net equity portion reaches the applicable threshold under the route being used. In practice, confirmation letters from the bank, proof of paid-up value, developer documentation and clear valuation support are critical. Different emirates may emphasise different proof points, so the route should be structured with that in mind.'
        },
        {
          title: 'Additional costs and payment friction',
          hint: 'What sits outside the fee table.',
          body:
            'Translation, notarisation, legalisation, valuation reports, bank charges, advisory retainers and property transaction costs can materially affect the real budget. Applicants should therefore plan the entire file and not just the official government line items, especially if the visa is linked to a wider transaction such as a property purchase or company setup.'
        }
      ]
    },
    {
      id: 'legal',
      tag: 'Rights',
      title: 'Legal aspects and rights',
      kicker: 'What the visa allows, and what must remain compliant over time.',
      image: '/img/services/legal.jpg',
      accordions: [
        {
          title: 'Core rights',
          hint: 'Residence, work, study and ownership.',
          body:
            'Golden Visa holders can live, work and study in the UAE, sponsor eligible family members and, where permitted, employ domestic workers. Depending on the sector and structure, they may own mainland and free zone companies, acquire real estate in designated areas and hold a much more autonomous immigration position than under conventional employer-sponsored residence.'
        },
        {
          title: 'Compliance obligations',
          hint: 'The visa is not maintenance-free.',
          body:
            'Applicants must maintain the route that justified approval, keep documentary evidence current, complete medical and biometric procedures, maintain health insurance where required, and update passport or identity records as needed. A Golden Visa is stable, but it still depends on continued compliance with the route that created it.'
        },
        {
          title: 'Family sponsorship',
          hint: 'Who can be included.',
          body:
            'Most holders can sponsor spouse and children, with broader flexibility than some standard visas. Depending on the route and local criteria, parents and domestic workers may also be included under certain conditions linked to income, accommodation and insurance. The legal right exists within an evidentiary framework rather than as an automatic blanket entitlement.'
        }
      ]
    },
    {
      id: 'advantages',
      tag: 'Benefits',
      title: 'Advantages of the Golden Visa',
      kicker: 'Why applicants choose it over short-term residence.',
      image: '/img/projects/saadiyat/3.jpg',
      accordions: [
        {
          title: 'No traditional sponsor',
          hint: 'Greater autonomy over your status.',
          body:
            'Because the visa is anchored in your eligibility category rather than one employer, it supports strategic career changes, entrepreneurial flexibility and more independent long-term planning. This is one of the clearest distinctions between Golden residence and standard work residence.'
        },
        {
          title: 'Long planning horizon',
          hint: 'Ten years changes major decisions.',
          body:
            'A ten-year residence window supports bigger decisions around schooling, family relocation, property acquisition, wealth planning and regional business operations without the recurring instability of frequent renewals. For many applicants, this planning horizon is as valuable as the visa itself.'
        },
        {
          title: 'Access to UAE systems',
          hint: 'Identity, banking and services.',
          body:
            'Long-term residents benefit from smoother access to digital identity, banking, telecoms, utilities, housing and public or semi-public services tied to Emirates ID and residency status. Over time, the practical value of stable residency compounds through everyday administrative ease.'
        }
      ]
    },
    {
      id: 'alternatives',
      tag: 'Alternatives',
      title: 'Alternatives to the Golden Visa',
      kicker: 'Other residence routes may suit different profiles better.',
      table: {
        head: ['Option', 'Validity', 'Sponsor?', 'Best for', 'Notes'],
        rows: [
          [
            'Green Visa',
            '5 years',
            'No traditional sponsor',
            'Skilled workers and freelancers',
            'Separate salary and permit logic, often linked to MOHRE and self-sponsorship criteria'
          ],
          [
            'Standard work residence',
            '1 to 3 years',
            'Employer sponsor',
            'Conventional employment',
            'Simpler initial route, but tied to one employer and less flexible long term'
          ],
          [
            'Property investor visa',
            'About 2 years',
            'Property-linked',
            'Lower-value property ownership',
            'Can suit some owners below Golden Visa level, with shorter validity and narrower benefits'
          ],
          [
            'Freelance permit and residence',
            '1 to 2 years',
            'Self via free zone',
            'Independent professionals',
            'Useful for consultants and creatives where Golden Visa criteria are not yet met'
          ],
          [
            'Retirement visa',
            '5 years',
            'Self',
            'Applicants 55+ meeting criteria',
            'Can be more appropriate where the objective is retirement rather than investor or business structuring'
          ]
        ]
      }
    },
    {
      id: 'risks',
      tag: 'Risks',
      title: 'Risks, constraints and practical watchpoints',
      kicker: 'Where applicants should remain disciplined.',
      accordions: [
        {
          title: 'Market and renewal risk',
          hint: 'Especially on property-based routes.',
          body:
            'If an investment or property route is used, renewal may depend on the threshold still being met later. That makes documentary quality, equity visibility and a sufficient buffer above the minimum strategically important. Structuring too close to the minimum can create avoidable renewal fragility.'
        },
        {
          title: 'Regulatory change',
          hint: 'Programs evolve.',
          body:
            'Thresholds, categories and operational rules can move over time. The existence of a current route does not guarantee that the same route will remain unchanged later, especially if a transaction is pursued primarily for immigration reasons. Applicants should therefore value economic logic, not just visa eligibility.'
        },
        {
          title: 'Documentation burden',
          hint: 'Files become heavy quickly.',
          body:
            'Translated certificates, bank letters, valuations, contracts, licenses, endorsements and attestations are often needed. Weak documentation remains one of the most common sources of delay, friction or refusal. The strongest files are usually built before portal submission, not after an authority asks for clarification.'
        },
        {
          title: 'Due diligence and background checks',
          hint: 'Some routes face more scrutiny than others.',
          body:
            'Entrepreneur, talent and high-profile investor tracks may be subject to deeper verification of funds, background, portfolio and institutional endorsements. Meeting a threshold is helpful, but it is not always sufficient on its own if the supporting narrative and evidence are inconsistent.'
        }
      ]
    },
    {
      id: 'timeline',
      tag: 'Process',
      title: 'Typical timeline and process flow',
      kicker: 'From route selection to Emirates ID issuance.',
      accordions: [
        {
          title: '1. Choose the route',
          hint: 'Investor, founder, talent, professional or student.',
          body:
            'The process starts by identifying the route that actually matches your profile and evidence, not simply the route that sounds attractive. That includes the right authority, the right emirate and the right evidentiary logic from the beginning.'
        },
        {
          title: '2. Build the file',
          hint: 'Investment, employment or supporting structure first.',
          body:
            'The underlying basis of the application must exist before the file is credible: property acquisition, deposit, employment evidence, company structure or talent endorsement. This stage often determines the smoothness of everything that follows.'
        },
        {
          title: '3. Apply through the relevant portal',
          hint: 'ICP, GDRFA or Abu Dhabi channel.',
          body:
            'The file is then lodged through the relevant government or emirate platform, followed by review, possible clarification requests and conditional or formal approval. Applicants should expect operational friction if their document stack is assembled too late or without emirate-specific logic.'
        },
        {
          title: '4. Medical and biometrics',
          hint: 'Standard residence processing steps.',
          body:
            'Adult applicants usually pass through medical fitness testing and biometrics before Emirates ID issuance and final residence activation. Timing can vary depending on location, service speed and whether the file required additional checks upstream.'
        },
        {
          title: '5. Issuance and maintenance',
          hint: 'The process does not end at approval.',
          body:
            'Once residence is granted, maintenance of the route, documentary hygiene and renewal readiness become part of the long-term strategy. The applicants who find renewal easiest are usually those who treat the first issuance as the beginning of file discipline, not the end.'
        }
      ]
    },
    {
      id: 'special',
      tag: 'Special Cases',
      title: 'Special cases and nationalities',
      kicker: 'A criteria-driven framework, but still a consequence-heavy one.',
      accordions: [
        {
          title: 'Criteria, not nationality quotas',
          hint: 'The route is formally profile-based.',
          body:
            'Publicly, the Golden Visa is framed as criteria-driven rather than quota-driven. However, security review, due diligence and documentary scrutiny can still vary in intensity depending on profile, source of wealth, route selected and practical context.'
        },
        {
          title: 'Residence is not citizenship',
          hint: 'Important strategic distinction.',
          body:
            'The Golden Visa grants long-term UAE residence, not nationality. Its value lies in stability, access and flexibility within the UAE system rather than passport substitution. Applicants should therefore frame it as a residence and structuring tool, not as a shortcut to citizenship.'
        },
        {
          title: 'Cross-border implications',
          hint: 'Treaties and home-country rules still matter.',
          body:
            'Residency in the UAE can interact with treaty access, mobility planning and fiscal structuring, but the final effects remain highly dependent on the laws, substance tests and reporting obligations of other countries connected to the applicant. Cross-border consequences should be analysed before the route is relied on as a planning device.'
        }
      ]
    },
    {
      id: 'tax',
      tag: 'Tax',
      title: 'Tax and fiscal considerations',
      kicker: 'Golden Visa status and tax planning are related, but not identical.',
      image: '/img/services/tax.jpg',
      accordions: [
        {
          title: 'Personal taxation',
          hint: 'The UAE remains known for no personal income tax.',
          body:
            'The UAE does not impose federal personal income tax on employment income. However, this should never be simplified into an automatic tax conclusion for internationally connected individuals. Tax outcomes still depend heavily on time spent elsewhere, retained family and economic ties, and the domestic rules of other relevant jurisdictions.'
        },
        {
          title: 'Corporate tax context',
          hint: 'Relevant if your route overlaps with business activity.',
          body:
            'A federal corporate tax regime now applies to many business profits, which makes structure, accounting and jurisdictional setup relevant for founder and investor profiles using the UAE as a long-term base. The visa may support a business strategy, but the tax position still depends on the legal and financial architecture used underneath.'
        },
        {
          title: 'Tax residency certificates',
          hint: 'Possible, but not automatic.',
          body:
            'Where conditions are met, a Tax Residency Certificate may be available from the UAE authorities. Whether it produces treaty benefits depends on both UAE rules and the legal tests of the other country involved, including anti-abuse standards and substance analysis.'
        },
        {
          title: 'Important disclaimer',
          hint: 'This is not tax advice.',
          body:
            'Two people with the same visa can have very different tax outcomes depending on travel patterns, business ties, family residence and retained links elsewhere. Professional tax advice remains essential before relying on any residence route for tax planning.'
        }
      ]
    },
    {
      id: 'facts',
      tag: 'Snapshot',
      title: 'Golden Visa quick reference sheet',
      kicker: 'Key facts to keep in one place.',
      table: {
        head: ['Item', 'Summary'],
        rows: [
          ['Visa type', 'Long-term residence independent from one employer sponsor'],
          ['Typical validity', 'Usually 10 years, renewable'],
          ['Main profiles', 'Investors, founders, talents, professionals and top students'],
          ['Real estate threshold', 'AED 2,000,000 with route-specific conditions'],
          ['Family scope', 'Spouse and children as a common baseline, with broader options in some cases'],
          ['Travel rule', 'Extended time outside the UAE is generally more flexible than under standard visas'],
          ['Application portals', 'ICP, GDRFA and selected Abu Dhabi channels']
        ]
      }
    }
  ]
}
