/**
 * NIGERIAN EMBASSY WEBSITE TEMPLATE — INTAKE FORM GENERATOR
 * ─────────────────────────────────────────────────────────────
 * Run this script in Google Apps Script (script.google.com)
 * to generate both intake forms automatically in your Google Drive.
 *
 * HOW TO USE:
 * 1. Go to script.google.com and create a new project
 * 2. Paste this entire file into the editor
 * 3. Replace YOUR_DRIVE_FOLDER_ID (line ~15) with your actual folder ID
 *    (open the folder in Drive, copy the ID from the URL)
 * 4. Click Run → createBothForms
 * 5. Check the Logs panel for the two shareable form URLs
 */

var ASSET_FOLDER_ID = "YOUR_DRIVE_FOLDER_ID"; // ← replace before running


// ═══════════════════════════════════════════════════════════════════
//  ENTRY POINT — run this
// ═══════════════════════════════════════════════════════════════════

function createBothForms() {
  var formA = createMissionDataForm();
  var formB = createAssetUploadForm();
  linkFormAToSheet(formA);

  Logger.log("════════════════════════════════════════");
  Logger.log("FORM LINKS — copy and share these URLs");
  Logger.log("════════════════════════════════════════");
  Logger.log("");
  Logger.log("FORM A (Mission Data) — send to Mission Administrator:");
  Logger.log(formA.getPublishedUrl());
  Logger.log("");
  Logger.log("FORM B (Asset Upload) — send to Comms / Media Officer:");
  Logger.log(formB.getPublishedUrl());
  Logger.log("");
  Logger.log("Edit Form A: " + formA.getEditUrl());
  Logger.log("Edit Form B: " + formB.getEditUrl());
}


// ═══════════════════════════════════════════════════════════════════
//  FORM A — Mission Data (text fields)
// ═══════════════════════════════════════════════════════════════════

function createMissionDataForm() {
  var form = FormApp.create("Embassy Website — Mission Data Intake (Form A)");

  form.setDescription(
    "This form collects all text content and configuration data for the embassy website.\n\n" +
    "Fill in every field marked with * before submitting. Fields without * are optional but recommended.\n\n" +
    "For the ambassador portrait, provide a shareable Google Drive or Dropbox link in the final section.\n\n" +
    "Allow approximately 30 minutes to complete this form."
  );
  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage(
    "Thank you. Your Mission data has been received. The developer will contact you if any information needs clarification."
  );


  // ── §1 Identity ──────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§1 — Mission Identity")
    .setHelpText("Basic identification for this Mission.");

  form.addListItem()
    .setTitle("Mission Type *")
    .setRequired(true)
    .setChoiceValues(["Embassy", "High Commission", "Consulate General", "Liaison Office"]);

  form.addTextItem()
    .setTitle("Host Country *")
    .setRequired(true)
    .setHelpText("e.g. Cuba, Brazil, Germany");

  form.addTextItem()
    .setTitle("Host City (Chancellery Location) *")
    .setRequired(true)
    .setHelpText("e.g. Havana, Brasília, Berlin");

  form.addTextItem()
    .setTitle("Full Mission Name *")
    .setRequired(true)
    .setHelpText("e.g. Embassy of Nigeria in Havana");

  form.addTextItem()
    .setTitle("Short Mission Name *")
    .setRequired(true)
    .setHelpText("e.g. Nigerian Embassy, Havana");

  form.addTextItem()
    .setTitle("Official Website Domain *")
    .setRequired(true)
    .setHelpText("Without https://  —  e.g. nigeriahavana.gov.ng");


  // ── §2 Contact Details ───────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§2 — Contact Details")
    .setHelpText("Official contact information displayed on the website.");

  form.addParagraphTextItem()
    .setTitle("Full Chancellery Address *")
    .setRequired(true)
    .setHelpText("Include street number, street name, district / area");

  form.addTextItem()
    .setTitle("City *")
    .setRequired(true);

  form.addTextItem()
    .setTitle("Postal / ZIP Code");

  form.addTextItem()
    .setTitle("Main Phone Number *")
    .setRequired(true)
    .setHelpText("Include country code  —  e.g. +53 7 204 1234");

  form.addTextItem()
    .setTitle("Secondary Phone Number")
    .setHelpText("Optional second line");

  form.addTextItem()
    .setTitle("24-Hour Emergency Phone *")
    .setRequired(true)
    .setHelpText("Must be reachable outside office hours");

  form.addTextItem()
    .setTitle("Official Email Address *")
    .setRequired(true)
    .setHelpText("e.g. info.havana@foreignaffairs.gov.ng");


  // ── §3 Head of Mission ───────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§3 — Head of Mission")
    .setHelpText("Current Ambassador or High Commissioner.");

  form.addTextItem()
    .setTitle("Full Name with Title and Honours *")
    .setRequired(true)
    .setHelpText("e.g. H.E. (Dr) Adaeze N. Okonkwo");

  form.addTextItem()
    .setTitle("Official Title *")
    .setRequired(true)
    .setHelpText("e.g. Ambassador Extraordinary and Plenipotentiary of the Federal Republic of Nigeria to the Republic of Cuba");

  form.addTextItem()
    .setTitle("Month and Year Appointed *")
    .setRequired(true)
    .setHelpText("e.g. September 2023");

  form.addParagraphTextItem()
    .setTitle("Official Biography *")
    .setRequired(true)
    .setHelpText("2–3 paragraphs. Include career highlights, education, previous postings, and current mandate.");


  // ── §4 Office Hours ──────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§4 — Office Hours")
    .setHelpText("Hours displayed on the contact page and footer.");

  form.addTextItem()
    .setTitle("General Office Hours *")
    .setRequired(true)
    .setHelpText("e.g. Monday – Friday, 9:00 am – 4:00 pm");

  form.addTextItem()
    .setTitle("Consular Submission Hours *")
    .setRequired(true)
    .setHelpText("e.g. 9:30 am – 12:30 pm");

  form.addTextItem()
    .setTitle("Document Collection Hours *")
    .setRequired(true)
    .setHelpText("e.g. 2:00 pm – 4:00 pm");

  form.addTextItem()
    .setTitle("Additional Hours Window")
    .setHelpText("Any other specific window, e.g. Emergency appointments: by prior arrangement only");


  // ── §5 Social Media ──────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§5 — Social Media")
    .setHelpText("Official accounts only. Leave any platform blank if not used by this Mission.");

  form.addTextItem()
    .setTitle("Facebook Page URL")
    .setHelpText("e.g. https://facebook.com/NigeriaEmbassyHavana");

  form.addTextItem()
    .setTitle("X (Twitter) Handle")
    .setHelpText("e.g. @NigeriaHavana");

  form.addTextItem()
    .setTitle("Instagram Handle")
    .setHelpText("e.g. nigeriaembassyhavana");

  form.addTextItem()
    .setTitle("YouTube Channel URL");

  form.addTextItem()
    .setTitle("LinkedIn Page URL");


  // ── §6 Public Holidays ───────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§6 — Public Holidays & Closures")
    .setHelpText("All dates when the Mission will be closed this calendar year. Include Nigerian national holidays AND host-country public holidays.");

  form.addParagraphTextItem()
    .setTitle("Closure Dates *")
    .setRequired(true)
    .setHelpText(
      "One entry per line, format:  YYYY-MM-DD | Holiday Name | Nigerian or Host Country\n\n" +
      "Example:\n" +
      "2026-01-01 | New Year's Day | Host Country\n" +
      "2026-10-01 | Nigeria Independence Day | Nigerian\n" +
      "2026-12-25 | Christmas Day | Host Country"
    );


  // ── §7 Bilateral Relations ───────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§7 — Bilateral Relations")
    .setHelpText("Context about the relationship between Nigeria and the host country for the Relations page.");

  form.addTextItem()
    .setTitle("Year Diplomatic Relations Were Established *")
    .setRequired(true)
    .setHelpText("e.g. 1960");

  form.addTextItem()
    .setTitle("One-Line Tagline for the Bilateral Relationship")
    .setHelpText("e.g. Connecting Nigeria and Cuba across the Atlantic");

  form.addCheckboxItem()
    .setTitle("Key Areas of Bilateral Cooperation *")
    .setRequired(true)
    .setChoiceValues([
      "Trade & Commerce",
      "Culture & Arts",
      "Education & Research",
      "Health & Medicine",
      "Agriculture",
      "Energy & Resources",
      "Security & Defence",
      "Tourism",
      "Science & Technology",
      "Sports"
    ]);

  form.addParagraphTextItem()
    .setTitle("Brief Description of the Bilateral Relationship")
    .setHelpText("2–3 sentences summarising the relationship. This appears on the Relations page.");


  // ── §8 Trade & Economics ─────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§8 — Trade & Economic Relations")
    .setHelpText("Economic data shown on the bilateral relations page.");

  form.addTextItem()
    .setTitle("Annual Bilateral Trade Volume (approximate) *")
    .setRequired(true)
    .setHelpText("e.g. USD 45 million");

  form.addTextItem()
    .setTitle("Year of Latest Trade Figure *")
    .setRequired(true)
    .setHelpText("e.g. 2025");

  form.addParagraphTextItem()
    .setTitle("Key Nigerian Exports to Host Country")
    .setHelpText("One item per line  —  e.g.\nCrude oil\nCocoa\nSesame seeds");

  form.addParagraphTextItem()
    .setTitle("Key Imports from Host Country to Nigeria")
    .setHelpText("One item per line");

  form.addParagraphTextItem()
    .setTitle("Active Trade or Investment Agreements")
    .setHelpText("Name and year signed, one per line. Leave blank if none.");

  form.addTextItem()
    .setTitle("Trade Promotion Focal Point — Name")
    .setHelpText("Commercial Attaché or equivalent at this Mission");

  form.addTextItem()
    .setTitle("Trade Promotion Focal Point — Email")
    .setHelpText("Direct email for trade enquiries");

  form.addTextItem()
    .setTitle("Next Joint Economic Commission Meeting")
    .setHelpText("Approximate date if known  —  e.g. Q3 2026");


  // ── §9 Diaspora & Community ──────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§9 — Diaspora & Nigerian Community")
    .setHelpText("Information about Nigerians living in the host country.");

  form.addTextItem()
    .setTitle("Estimated Number of Nigerian Citizens in Host Country")
    .setHelpText("Approximate figure");

  form.addTextItem()
    .setTitle("Estimated Number of Nigerian Students")
    .setHelpText("Approximate figure");

  form.addTextItem()
    .setTitle("Nigerian Community Organisation Name")
    .setHelpText("e.g. Nigerian Community Association in Cuba");

  form.addTextItem()
    .setTitle("Nigerian Community Organisation Contact or Website");

  form.addTextItem()
    .setTitle("Nigerian Religious or Cultural Centre (if any)")
    .setHelpText("Name and location — optional");


  // ── §10 Visa & Services ──────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§10 — Visa & Consular Services")
    .setHelpText("Processing times and scope of services for this post.");

  form.addTextItem()
    .setTitle("Standard Visa Processing Time *")
    .setRequired(true)
    .setHelpText("e.g. 5–7 working days");

  form.addTextItem()
    .setTitle("Express Visa Processing Time")
    .setHelpText("If offered  —  e.g. 48 hours. Leave blank if not available.");

  form.addTextItem()
    .setTitle("Countries Covered Under Cross-Accreditation")
    .setHelpText("If this Mission serves additional countries, list them  —  e.g. Haiti, Dominican Republic. Leave blank if not applicable.");

  form.addTextItem()
    .setTitle("Nearest Nigerian Mission for Overflow Services")
    .setHelpText("Name and city  —  e.g. Embassy of Nigeria in Mexico City");

  form.addCheckboxItem()
    .setTitle("Consular Services Offered at this Post")
    .setChoiceValues([
      "Visa issuance",
      "Passport renewal",
      "Emergency Travel Certificates",
      "Notarial services",
      "Document authentication / legalisation",
      "Affidavit services",
      "Marriage registration",
      "Birth registration",
      "Death registration",
      "CERPAC registration"
    ]);


  // ── §11 Emergency Contacts ───────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§11 — Emergency Contacts for Nigerians in Host Country")
    .setHelpText("Published on the website to assist Nigerians who need urgent help.");

  form.addTextItem()
    .setTitle("Main Public Hospital — Name and Phone")
    .setHelpText("e.g. Hospital Hermanos Ameijeiras — +53 7 876 1000");

  form.addTextItem()
    .setTitle("Police Emergency Number (host country)")
    .setHelpText("e.g. 106");

  form.addTextItem()
    .setTitle("Ambulance / Medical Emergency Number")
    .setHelpText("e.g. 104");

  form.addTextItem()
    .setTitle("Host Country Immigration Helpline")
    .setHelpText("For Nigerians with residence or status queries — optional");

  form.addTextItem()
    .setTitle("Local Legal Aid or Welfare Contact")
    .setHelpText("A local lawyer or welfare officer known to the Mission — optional");


  // ── §12 Ambassador Portrait ──────────────────────────────────
  form.addPageBreakItem()
    .setTitle("§12 — Ambassador Portrait")
    .setHelpText(
      "The official portrait of the Head of Mission.\n\n" +
      "Photo requirements:\n" +
      "• Format: JPG or PNG\n" +
      "• Minimum size: 600 × 800 pixels\n" +
      "• Composition: head and shoulders, formal dress\n" +
      "• Background: plain, neutral or official setting\n" +
      "• File size: ≤ 5 MB"
    );

  form.addTextItem()
    .setTitle("Shareable Link to Official Portrait *")
    .setRequired(true)
    .setHelpText("Upload the photo to Google Drive or Dropbox, set sharing to 'Anyone with the link can view', and paste the link here.");

  form.addTextItem()
    .setTitle("Photo Caption for Accessibility")
    .setHelpText("e.g. Official portrait of H.E. (Dr) Adaeze N. Okonkwo, Ambassador of Nigeria to Cuba, in traditional ankara attire");

  return form;
}


// ═══════════════════════════════════════════════════════════════════
//  FORM B — Asset Upload
// ═══════════════════════════════════════════════════════════════════

function createAssetUploadForm() {
  var form = FormApp.create("Embassy Website — Mission Asset Upload (Form B)");

  form.setDescription(
    "Upload the mission-specific files required for the embassy website.\n\n" +
    "REQUIRED (2 items):\n" +
    "1. Host country flag — SVG format\n" +
    "2. Consular PDF forms\n\n" +
    "Everything else (Nigeria coat of arms, MFA seal, national anthem, Nigeria map, Nigeria flag) " +
    "is already built into the website template and does not need to be uploaded.\n\n" +
    "For the ambassador portrait, use the link field in Form A, Section 12."
  );
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    "Files received. The developer will confirm receipt and let you know if any file needs to be resupplied."
  );

  form.addTextItem()
    .setTitle("Mission Name *")
    .setRequired(true)
    .setHelpText("e.g. Embassy of Nigeria in Havana — so uploads can be matched to the correct Form A response");

  form.addTextItem()
    .setTitle("Your Name and Role *")
    .setRequired(true)
    .setHelpText("e.g. Chiamaka Eze, Communications Officer");


  // ── Required files ───────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("Required Files")
    .setHelpText("Both files below are required. The website cannot go live without them.");

  form.addFileUploadItem()
    .setTitle("Host Country Flag (SVG) *")
    .setRequired(true)
    .setFolderId(ASSET_FOLDER_ID)
    .setHelpText(
      "SVG file only — no PNG or JPG.\n\n" +
      "The flag must be drawn using <path> and <rect> elements. No embedded raster images inside the SVG.\n\n" +
      "If you only have a raster image of the flag, note that in the comments field at the end and the developer will convert it."
    );

  form.addFileUploadItem()
    .setTitle("Consular PDF Forms *")
    .setRequired(true)
    .setFolderId(ASSET_FOLDER_ID)
    .setAllowedFileTypes(["pdf"])
    .setHelpText(
      "Upload all official consular forms. You can select multiple files at once.\n\n" +
      "Name each file exactly as it will appear on the website:\n" +
      "• visa-application-form.pdf\n" +
      "• passport-renewal-form.pdf\n" +
      "• emergency-travel-cert.pdf\n" +
      "• document-authentication-form.pdf\n" +
      "• citizen-registration-form.pdf\n" +
      "• consular-fee-schedule.pdf"
    );


  // ── Optional overrides ───────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("Optional Overrides")
    .setHelpText(
      "Only complete this section if you have a specific file that should replace the standard template asset. " +
      "Leave everything blank if the defaults are acceptable."
    );

  form.addFileUploadItem()
    .setTitle("Host Country Map SVG — Optional")
    .setRequired(false)
    .setFolderId(ASSET_FOLDER_ID)
    .setHelpText(
      "Only needed if the developer cannot source an accurate country outline map. " +
      "Must be an SVG with a single solid fill, no text, no labels, no internal borders."
    );

  form.addFileUploadItem()
    .setTitle("Alternative Anthem Recording — Optional")
    .setRequired(false)
    .setFolderId(ASSET_FOLDER_ID)
    .setAllowedFileTypes(["mp3", "ogg", "wav"])
    .setHelpText("Only if a specific recording quality or version is required. MP3 preferred, ≤ 5 MB.");

  form.addParagraphTextItem()
    .setTitle("Notes for the Developer")
    .setHelpText(
      "Flag anything unusual — e.g. 'The flag SVG uses a simplified design approved by MFA' " +
      "or 'The fee schedule is valid until March 2027' or 'Flag SVG not available, please convert attached PNG'."
    );

  return form;
}


// ═══════════════════════════════════════════════════════════════════
//  LINK FORM A TO A GOOGLE SHEET (for easy export)
// ═══════════════════════════════════════════════════════════════════

function linkFormAToSheet(form) {
  var ss = SpreadsheetApp.create("Mission Intake Responses — Form A");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // Attach the auto-export trigger
  ScriptApp.newTrigger("onFormASubmit")
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log("Responses sheet: " + ss.getUrl());
}


// ═══════════════════════════════════════════════════════════════════
//  AUTO-EXPORT TRIGGER — fires when Form A is submitted
//  Writes a clean mission-[city].json to the Drive asset folder
// ═══════════════════════════════════════════════════════════════════

function onFormASubmit(e) {
  var responses = e.response.getItemResponses();
  var data = {};

  responses.forEach(function(r) {
    var key = r.getItem().getTitle()
      .replace(/\s+\*/g, "")          // strip required asterisk
      .replace(/\s+/g, "_")           // spaces → underscores
      .replace(/[^a-zA-Z0-9_]/g, "")  // remove special chars
      .toLowerCase();
    data[key] = r.getResponse();
  });

  // Derive city slug for filename
  var city = (data["host_city_chancellery_location"] || "mission")
    .toLowerCase()
    .replace(/\s+/g, "-");

  var filename = "mission-" + city + ".json";
  var json = JSON.stringify(data, null, 2);

  var folder = DriveApp.getFolderById(ASSET_FOLDER_ID);
  var existing = folder.getFilesByName(filename);
  if (existing.hasNext()) existing.next().setTrashed(true);
  folder.createFile(filename, json, MimeType.PLAIN_TEXT);

  Logger.log("Exported: " + filename);
}
