/**
 * Consular service content. In production this maps 1:1 to a CMS
 * "Service" collection so content officers can edit every field
 * without touching code.
 */

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface FeeRow {
  item: string;
  amount: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  overview: string[];
  eligibility: string[];
  requirements: string[];
  process: string[];
  fees: FeeRow[];
  feesNote: string;
  processingTime: string[];
  faqs: ServiceFaq[];
  forms: { label: string; href: string }[];
  externalLinks: { label: string; href: string }[];
}

export const services: Service[] = [
  {
    slug: "visa-services",
    title: "Visa Services",
    icon: "visa",
    summary:
      "Entry visas for foreign nationals travelling to Nigeria for business, tourism, official duty or temporary work.",
    overview: [
      "The Mission processes Nigerian entry visas for citizens and residents of [Host Country]. All visa applications begin online through the Nigeria Immigration Service portal, after which supporting documents are submitted to the Mission.",
      "Applicants are advised to apply well in advance of their intended travel date and to ensure that all information supplied matches their travel documents exactly.",
    ],
    eligibility: [
      "Citizens of [Host Country] holding a passport valid for at least six months.",
      "Foreign nationals legally resident in [Host Country] (proof of residence required).",
      "Holders of passports from countries covered by this Mission's consular jurisdiction.",
    ],
    requirements: [
      "Passport valid for at least six months with at least two blank pages.",
      "Completed online application form (Nigeria Immigration Service portal).",
      "Evidence of online payment of the visa fee.",
      "Two recent passport-size photographs on a white background.",
      "Letter of invitation from a host in Nigeria, or hotel reservation.",
      "Return or onward flight reservation.",
      "Evidence of sufficient funds (recent bank statement).",
      "For business visas: introduction letter from the applicant's company and acceptance of immigration responsibility by the Nigerian host company.",
    ],
    process: [
      "Complete the visa application form on the Nigeria Immigration Service portal and pay the prescribed fee online.",
      "Print the acknowledgement and payment receipts.",
      "Book an appointment with the Mission's consular section.",
      "Submit your passport and supporting documents in person on your appointment date.",
      "Attend a short interview where required.",
      "Collect your passport, or receive it by registered courier where that option is offered.",
    ],
    fees: [
      { item: "Single-entry visa (short visit)", amount: "[Fee]" },
      { item: "Multiple-entry visa", amount: "[Fee]" },
      { item: "Temporary work permit cable", amount: "[Fee]" },
    ],
    feesNote:
      "Visa fees are set by the Nigeria Immigration Service, vary by nationality on the basis of reciprocity, and are paid online. Fees are not payable in cash at the Mission and are non-refundable.",
    processingTime: [
      "Standard applications: 5–10 working days from submission of complete documents.",
      "Applications requiring referral to Abuja may take longer; applicants are notified where this applies.",
    ],
    faqs: [
      {
        q: "Can I pay the visa fee at the Mission?",
        a: "No. All visa fees are paid online through the Nigeria Immigration Service portal before submission. The Mission does not accept cash payments for visas.",
      },
      {
        q: "Do I need an appointment to submit my application?",
        a: "Yes. Applications are received by appointment to reduce waiting times. Use the Book Appointment option or contact the consular section.",
      },
      {
        q: "My travel is urgent. Can processing be expedited?",
        a: "Genuinely urgent cases — medical emergencies or official government travel — may be considered on presentation of evidence. Contact the consular section before submitting.",
      },
      {
        q: "Is a visa on arrival available?",
        a: "Visa on arrival is available to certain categories of travellers with prior approval from the Nigeria Immigration Service. See the NIS portal for current eligibility.",
      },
    ],
    forms: [
      { label: "Visa application checklist (PDF)", href: "#" },
      { label: "Letter of invitation template (PDF)", href: "#" },
    ],
    externalLinks: [
      { label: "Nigeria Immigration Service — Visa portal", href: "https://immigration.gov.ng" },
      { label: "Online visa application", href: "https://portal.immigration.gov.ng" },
    ],
  },
  {
    slug: "passport-services",
    title: "Passport Services",
    icon: "passport",
    summary:
      "Fresh applications, renewals and reissues of the Nigerian e-passport for citizens in [Host Country].",
    overview: [
      "The Mission processes applications for the Nigerian enhanced e-passport on behalf of the Nigeria Immigration Service. All applications begin online, followed by an in-person appointment for biometric capture.",
      "Passports are produced centrally; applicants should not plan travel around an expected collection date until the Mission confirms the passport is ready.",
    ],
    eligibility: [
      "Nigerian citizens resident in or visiting [Host Country].",
      "Children of Nigerian parents (both parents' consent required for minors).",
      "Applicants whose passports are lost, damaged, expired or fully stamped.",
    ],
    requirements: [
      "Completed online application on the NIS e-passport portal with payment receipt.",
      "Current or expired Nigerian passport (data page copy for renewals).",
      "National Identification Number (NIN).",
      "Proof of residence in [Host Country], where applicable.",
      "For first-time adult applicants: birth certificate and evidence of Nigerian citizenship.",
      "For minors: birth certificate, parents' data pages and a signed letter of consent from both parents.",
      "For lost passports: police report and a sworn affidavit.",
    ],
    process: [
      "Apply and pay on the Nigeria Immigration Service e-passport portal.",
      "Book a biometric capture appointment at the Mission.",
      "Attend in person with your documents for biometric enrolment.",
      "Track your application status using the reference number issued at capture.",
      "Collect your new passport in person, or by registered courier where offered.",
    ],
    fees: [
      { item: "32-page e-passport (5-year validity)", amount: "[Fee]" },
      { item: "64-page e-passport (10-year validity)", amount: "[Fee]" },
    ],
    feesNote:
      "Passport fees are set by the Nigeria Immigration Service and paid online in the currency stated on the portal. Courier return, where chosen, is charged separately.",
    processingTime: [
      "Standard processing: 6–12 weeks from biometric capture, subject to central production.",
      "Applicants are contacted by email or SMS when passports are ready for collection.",
    ],
    faqs: [
      {
        q: "My passport expires soon. When should I renew?",
        a: "Apply at least six months before expiry. Many airlines and host-country authorities require six months' validity for travel.",
      },
      {
        q: "Can someone collect my passport on my behalf?",
        a: "Yes, with a signed letter of authority, a copy of your identification and the collection slip. Minors' passports are released only to a parent or legal guardian.",
      },
      {
        q: "I have no NIN. Can I still apply?",
        a: "The NIN is mandatory for all passport applications. The Mission offers NIN enrolment support — contact the consular section for available dates.",
      },
    ],
    forms: [
      { label: "Passport application checklist (PDF)", href: "#" },
      { label: "Letter of consent for minors (PDF)", href: "#" },
    ],
    externalLinks: [
      { label: "NIS e-passport portal", href: "https://passport.immigration.gov.ng" },
      { label: "NIMC — National Identification Number", href: "https://nimc.gov.ng" },
    ],
  },
  {
    slug: "emergency-travel-certificate",
    title: "Emergency Travel Certificate",
    icon: "plane",
    summary:
      "A one-way travel document enabling Nigerian citizens without a valid passport to return to Nigeria.",
    overview: [
      "The Emergency Travel Certificate (ETC) is issued to Nigerian citizens who must travel to Nigeria urgently but do not hold a valid passport — for example where a passport has been lost, stolen or has expired and there is no time to obtain a replacement.",
      "The ETC is valid for a single journey to Nigeria only. It is not a substitute for a passport and cannot be used to travel to any other destination.",
    ],
    eligibility: [
      "Nigerian citizens in [Host Country] whose passport is lost, stolen, damaged or expired.",
      "Nigerians being repatriated or deported, in coordination with host-country authorities.",
      "Applicants able to establish Nigerian citizenship to the satisfaction of the Mission.",
    ],
    requirements: [
      "Completed ETC application form (available at the Mission or downloadable below).",
      "Evidence of Nigerian citizenship — expired passport, NIN, birth certificate or sworn declaration.",
      "Police report, where the passport was lost or stolen.",
      "Two passport-size photographs on a white background.",
      "Confirmed one-way travel itinerary to Nigeria.",
    ],
    process: [
      "Contact the consular section or attend the Mission with your documents.",
      "Complete the application form and a short citizenship interview.",
      "Pay the prescribed fee, where applicable.",
      "Collect the certificate — same-day issuance is possible in genuine emergencies.",
    ],
    fees: [{ item: "Emergency Travel Certificate", amount: "[Fee]" }],
    feesNote:
      "The fee may be waived in destitution or repatriation cases at the discretion of the Head of Mission.",
    processingTime: [
      "Same day to 2 working days, once citizenship is established and documents are complete.",
    ],
    faqs: [
      {
        q: "Can I use the ETC to return to [Host Country]?",
        a: "No. The ETC is valid for one journey to Nigeria only. You will need a new passport — and any required host-country visa — before travelling again.",
      },
      {
        q: "I have no documents at all. What should I do?",
        a: "Attend the Mission in person. Citizenship can be established through interview and verification with authorities in Nigeria; allow additional time for this.",
      },
    ],
    forms: [{ label: "ETC application form (PDF)", href: "#" }],
    externalLinks: [
      { label: "Nigeria Immigration Service", href: "https://immigration.gov.ng" },
    ],
  },
  {
    slug: "document-authentication",
    title: "Document Authentication",
    icon: "seal",
    summary:
      "Legalisation and authentication of Nigerian documents for use in [Host Country], and host-country documents for use in Nigeria.",
    overview: [
      "The Mission authenticates official documents so they can be recognised by authorities in Nigeria or in [Host Country]. Typical documents include birth, marriage and academic certificates, police character certificates, powers of attorney and commercial documents.",
      "Documents originating from Nigeria must first be legalised by the Ministry of Foreign Affairs in Abuja before the Mission can authenticate them.",
    ],
    eligibility: [
      "Holders of Nigerian public documents intended for official use in [Host Country].",
      "Holders of [Host Country] documents intended for official use in Nigeria, after legalisation by the host-country foreign ministry.",
      "Companies requiring authentication of commercial and trade documents.",
    ],
    requirements: [
      "Original document, plus one photocopy of each document.",
      "Prior legalisation by the issuing country's foreign ministry, as applicable.",
      "Valid identification of the applicant (passport or national ID).",
      "Completed authentication request form.",
      "Evidence of payment of the prescribed fee.",
    ],
    process: [
      "Confirm that the document carries the required prior legalisation.",
      "Complete the authentication request form and pay the prescribed fee.",
      "Submit the original document and copies at the consular section, in person or through an authorised representative.",
      "Collect the authenticated document on the date indicated on your submission slip.",
    ],
    fees: [
      { item: "Authentication, per document (personal)", amount: "[Fee]" },
      { item: "Authentication, per document (commercial)", amount: "[Fee]" },
    ],
    feesNote: "Fees are payable per document and are non-refundable once processing begins.",
    processingTime: ["3–5 working days from submission of complete documents."],
    faqs: [
      {
        q: "Does the Mission verify the content of documents?",
        a: "Authentication confirms the authenticity of the signature and seal of the legalising authority. It does not certify the truth of a document's contents.",
      },
      {
        q: "Can I post my documents to the Mission?",
        a: "Postal submission is accepted with a prepaid, self-addressed return envelope from a registered courier. The Mission is not liable for documents lost in transit.",
      },
    ],
    forms: [{ label: "Authentication request form (PDF)", href: "#" }],
    externalLinks: [
      { label: "Ministry of Foreign Affairs, Abuja", href: "https://foreignaffairs.gov.ng" },
    ],
  },
  {
    slug: "notarial-services",
    title: "Notarial Services",
    icon: "scale",
    summary:
      "Attestation of affidavits, declarations, powers of attorney and certified true copies for Nigerian citizens.",
    overview: [
      "Consular officers perform limited notarial functions for Nigerian citizens in [Host Country], including witnessing signatures, administering oaths and certifying copies of Nigerian documents.",
      "Documents must be signed in the presence of the consular officer. Do not sign documents in advance.",
    ],
    eligibility: [
      "Nigerian citizens resident in or visiting [Host Country].",
      "In limited cases, foreign nationals where the document is for use in Nigeria.",
    ],
    requirements: [
      "The unsigned document to be notarised, complete and ready for signature.",
      "Valid identification — Nigerian passport or national ID.",
      "Names and identification details of any witnesses, where the document requires them.",
      "Evidence of payment of the prescribed fee.",
    ],
    process: [
      "Book an appointment with the consular section.",
      "Attend in person with your identification and the unsigned document.",
      "Sign the document before the consular officer, who attests and seals it.",
      "Collect the notarised document — usually the same day.",
    ],
    fees: [
      { item: "Attestation of signature / oath", amount: "[Fee]" },
      { item: "Certified true copy, per document", amount: "[Fee]" },
      { item: "Power of attorney", amount: "[Fee]" },
    ],
    feesNote: "Fees are payable per notarial act as set out in the official fee schedule.",
    processingTime: ["Same day, by appointment."],
    faqs: [
      {
        q: "Can the Mission prepare the legal document for me?",
        a: "No. Consular officers witness and attest documents but do not provide legal drafting or legal advice. Have your document prepared by a legal practitioner beforehand.",
      },
      {
        q: "My power of attorney is for use in Nigeria. Is consular attestation enough?",
        a: "Consular attestation is widely accepted, but confirm any further registration requirements (for example with a State land registry) with your solicitor in Nigeria.",
      },
    ],
    forms: [{ label: "Notarial service request form (PDF)", href: "#" }],
    externalLinks: [],
  },
  {
    slug: "consular-assistance",
    title: "Consular Assistance",
    icon: "shield",
    summary:
      "Support for Nigerians in distress — arrest, hospitalisation, bereavement, destitution and crisis situations.",
    overview: [
      "The Mission provides consular protection and welfare assistance to Nigerian citizens in [Host Country]. Officers can visit detained citizens, liaise with local authorities, help contact family in Nigeria and provide guidance in emergencies.",
      "The Mission cannot interfere in the judicial processes of [Host Country], pay legal or medical bills, or secure preferential treatment — but it will work to ensure that Nigerians are treated fairly and with dignity.",
    ],
    eligibility: [
      "All Nigerian citizens in [Host Country], whether resident or visiting.",
      "Family members in Nigeria seeking welfare confirmation of a relative in [Host Country].",
    ],
    requirements: [
      "Any available identification of the affected citizen.",
      "Details of the situation — location, authorities involved, case or reference numbers.",
      "Contact details of next of kin, where relevant.",
    ],
    process: [
      "Contact the Mission by phone or email — use the 24-hour emergency line for urgent cases.",
      "Provide the citizen's details and the nature of the emergency.",
      "A consular officer is assigned and advises on the next steps.",
      "The Mission liaises with local authorities and family as appropriate, and follows the case to conclusion.",
    ],
    fees: [{ item: "Consular welfare assistance", amount: "Free of charge" }],
    feesNote:
      "Welfare assistance is free. Costs ordered by third parties — legal fees, medical bills, repatriation costs — remain the responsibility of the citizen or family.",
    processingTime: ["Emergency cases are attended to immediately, 24 hours a day."],
    faqs: [
      {
        q: "A relative has been arrested. What can the Mission do?",
        a: "With the citizen's consent, consular officers can visit them in detention, monitor their welfare and treatment, provide a list of local lawyers and keep family informed. The Mission cannot secure release from lawful custody.",
      },
      {
        q: "A Nigerian has died in [Host Country]. Who do we contact?",
        a: "Contact the consular section immediately. The Mission will guide the family through documentation for local burial or repatriation of remains, and liaise with host-country authorities.",
      },
      {
        q: "I have lost everything — money and documents. Can the Mission help?",
        a: "Attend the Mission or call the emergency line. Officers can help you contact family for funds, issue an Emergency Travel Certificate and connect you with local support services.",
      },
    ],
    forms: [],
    externalLinks: [
      { label: "NiDCOM — Nigerians in Diaspora Commission", href: "https://nidcom.gov.ng" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
