import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ---------------------------------------------------------------------------
// Email design system
// Same near-black / bronze-gold / off-white palette as the Stone India site,
// with a small "core sample" strata strip as the one recurring signature mark.
// ---------------------------------------------------------------------------
const THEME = {
  black: '#0A0A08',
  charcoal: '#111111',
  gold: '#B8955D',
  goldLight: '#DFBA73',
  cream: '#F5F3EE',
  offWhite: '#FAF8F4',
  border: '#E8E4DC',
  textMuted: '#8C887E',
  textBody: '#4A4A45',
  white: '#FFFFFF',
};

const WEBSITE_URL = process.env.WEBSITE_URL || 'https://stoneindia.co';

// Escape user input before it ever reaches the HTML template (prevents
// broken markup / injection from a name, subject or message field).
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Strip line breaks before a value is used inside an email header
// (From / Subject) to prevent header injection.
function sanitizeHeader(value = '') {
  return String(value).replace(/[\r\n]/g, ' ').trim();
}

function nl2br(value = '') {
  return value.replace(/\n/g, '<br />');
}

// Five-band "core sample" strip — a literal cross-section of stone,
// echoing the geological motifs used elsewhere on the site.
// Rendered as its OWN standalone 100%-width table, completely separate
// from the header/body/footer table below it. This is what actually fixes
// the Gmail bug: previously this strip's 5 columns and the single-column
// rows below it lived in the SAME table, so their column counts had to
// match exactly (via colspan) or Gmail would render the mismatched rows
// at a fraction of the card's width. Giving the strip its own table means
// there is no shared column grid to ever get out of sync.
function strataBar() {
  const bands = [THEME.black, THEME.gold, THEME.goldLight, THEME.charcoal, THEME.gold];
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; table-layout:fixed;">
      <tr>
        ${bands
          .map(
            (color) => `<td width="20%" style="height:6px; line-height:6px; font-size:0; background-color:${color};">&nbsp;</td>`
          )
          .join('')}
      </tr>
    </table>`;
}

// A single label/value row for the admin notification's field table.
function fieldRow(label, valueHtml, isLast = false) {
  const rule = isLast ? '' : `border-bottom:1px solid ${THEME.border};`;
  return `
    <tr>
      <td style="padding:14px 0; ${rule} width:110px; vertical-align:top;">
        <span style="font-family: Helvetica, Arial, sans-serif; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:${THEME.textMuted};">${label}</span>
      </td>
      <td style="padding:14px 0; ${rule} vertical-align:top;">
        ${valueHtml}
      </td>
    </tr>`;
}

// Shared shell (top strata bar, dark wordmark header, white content card,
// dark footer) so the admin notice and the client auto-reply stay
// pixel-consistent with each other and with the site's visual language.
// Built as nested tables with inline styles throughout for compatibility
// with Outlook / older mail clients, not just Gmail and Apple Mail.
function emailShell({ eyebrow, previewText, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Gwalior Stone</title>
  <!--[if mso]>
  <style type="text/css">
    table, td { border-collapse: collapse; }
  </style>
  <![endif]-->
  <style>
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .stack-padding { padding-left: 24px !important; padding-right: 24px !important; }
      .header-padding { padding: 32px 24px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:${THEME.cream}; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">${escapeHtml(previewText)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${THEME.cream};">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:${THEME.white}; border-radius:10px; overflow:hidden; border:1px solid ${THEME.border};">
          <tr>
            <td style="padding:0; line-height:0; font-size:0;">
              ${strataBar()}
            </td>
          </tr>
          <tr>
            <td class="header-padding" style="background-color:${THEME.black}; padding:36px 40px 30px; text-align:center;">
              <div style="font-family: Georgia, 'Times New Roman', serif; font-size:22px; letter-spacing:5px; color:${THEME.offWhite}; text-transform:uppercase;">Gwalior Stone</div>
              <div style="width:36px; height:1px; background-color:${THEME.gold}; margin:16px auto 14px;">&nbsp;</div>
              <div style="font-family: Helvetica, Arial, sans-serif; font-size:11px; letter-spacing:3px; color:${THEME.gold}; text-transform:uppercase;">${eyebrow}</div>
            </td>
          </tr>
          <tr>
            <td class="stack-padding" style="padding:44px 40px; font-family: Helvetica, Arial, sans-serif;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color:${THEME.black}; padding:26px 40px; text-align:center;">
              <div style="font-family: Helvetica, Arial, sans-serif; font-size:12px; color:${THEME.offWhite}; line-height:1.8;">
                <span style="color:${THEME.gold}; letter-spacing:1px; font-weight:bold;">GWALIOR STONE PVT. LTD.</span><br />
                C-56 Industrial Area Banmore, Morena, Madhya Pradesh 476444<br />
                <a href="tel:+919371013666" style="color:${THEME.offWhite}; text-decoration:none;">+91 937 101 3666</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:info@gwaliorstone.in" style="color:${THEME.offWhite}; text-decoration:none;">info@gwaliorstone.in</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Endpoint to handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || 'No Subject');
  const safeMessageHtml = nl2br(escapeHtml(message));
  const firstName = safeName.split(' ')[0];
  const receivedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const replySubjectEncoded = encodeURIComponent(`Re: ${subject || 'your inquiry'}`);

  // --- Admin notification -------------------------------------------------
  const adminBody = `
    <div style="font-family: Helvetica, Arial, sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:${THEME.textMuted}; margin:0 0 24px;">New website inquiry</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      ${fieldRow('Name', `<span style="font-size:15px; color:${THEME.charcoal}; font-weight:600;">${safeName}</span>`)}
      ${fieldRow('Email', `<a href="mailto:${safeEmail}" style="color:${THEME.gold}; text-decoration:none; font-size:15px;">${safeEmail}</a>`)}
      ${fieldRow('Subject', `<span style="font-size:15px; color:${THEME.charcoal};">${safeSubject}</span>`)}
      ${fieldRow('Received', `<span style="font-size:15px; color:${THEME.charcoal};">${receivedAt} IST</span>`, true)}
    </table>

    <div style="font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:${THEME.textMuted}; margin-bottom:10px;">Message</div>
    <div style="background-color:${THEME.offWhite}; border-left:3px solid ${THEME.gold}; padding:22px 24px; border-radius:0 6px 6px 0; color:${THEME.textBody}; font-size:15px; line-height:1.7;">
      ${safeMessageHtml}
    </div>

    <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:32px auto 0;">
      <tr>
        <td style="border-radius:30px; background-color:${THEME.charcoal};">
          <a href="mailto:${safeEmail}?subject=${replySubjectEncoded}" style="display:inline-block; padding:14px 34px; font-family: Helvetica, Arial, sans-serif; font-size:12px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:${THEME.white}; text-decoration:none; border-radius:30px;">Reply to ${firstName}</a>
        </td>
      </tr>
    </table>
  `;

  const mailOptions = {
    from: `"${sanitizeHeader(name)}" <${process.env.SMTP_USER}>`, // Send from the authenticated user
    replyTo: email, // Reply to the person who filled out the form
    to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER, // Send to the specified receiver, or self
    subject: sanitizeHeader(`New Inquiry — ${subject || 'Website Contact Form'}`),
    text: `New website inquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\nReceived: ${receivedAt} IST\n\nMessage:\n${message}`,
    html: emailShell({
      eyebrow: 'New Inquiry Received',
      previewText: `${name} sent a new inquiry: ${subject || message.slice(0, 80)}`,
      bodyHtml: adminBody,
    }),
  };

  // --- Client auto-reply ---------------------------------------------------
  const autoReplyBody = `
    <div style="text-align:center;">
      <h1 style="font-family: Georgia, 'Times New Roman', serif; font-weight:400; font-size:24px; color:${THEME.charcoal}; margin:0 0 18px;">Thank you, ${firstName}.</h1>
      <p style="font-size:15px; line-height:1.8; color:${THEME.textBody}; margin:0 0 28px;">
        We've received your message regarding <strong style="color:${THEME.charcoal};">&ldquo;${safeSubject}&rdquo;</strong>. A member of our team will personally review it and respond within 1&ndash;2 business days.
      </p>
    </div>

    <div style="background-color:${THEME.offWhite}; border:1px solid ${THEME.border}; border-radius:8px; padding:24px 28px; margin-bottom:32px;">
      <div style="font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:${THEME.textMuted}; margin-bottom:10px;">Your message</div>
      <div style="font-size:14px; line-height:1.7; color:${THEME.textBody}; font-style:italic;">
        &ldquo;${safeMessageHtml}&rdquo;
      </div>
    </div>

    <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
      <tr>
        <td style="border-radius:30px; background-color:${THEME.charcoal};">
          <a href="${WEBSITE_URL}" style="display:inline-block; padding:15px 40px; font-family: Helvetica, Arial, sans-serif; font-size:12px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:${THEME.white}; text-decoration:none; border-radius:30px;">Explore Our Collection</a>
        </td>
      </tr>
    </table>
  `;

  const autoReplyOptions = {
    from: `"Gwalior Stone" <${process.env.SMTP_USER}>`,
    to: email,
    replyTo: process.env.RECEIVER_EMAIL || process.env.SMTP_USER, // so a customer reply reaches the team, not the sending inbox
    subject: `We've received your inquiry — Gwalior Stone`,
    text: `Hello ${name},\n\nThank you for reaching out to Gwalior Stone. We've received your message regarding "${subject || 'your inquiry'}" and will get back to you within 1-2 business days.\n\nYour message:\n${message}\n\nExplore our collection: ${WEBSITE_URL}\n\nGwalior Stone Pvt. Ltd.\nC-56 Industrial Area Banmore, Morena, Madhya Pradesh 476444\n+91 937 101 3666 | info@gwaliorstone.in`,
    html: emailShell({
      eyebrow: 'Natural Luxury Surfaces',
      previewText: `Thank you for contacting Gwalior Stone — we'll be in touch shortly.`,
      bodyHtml: autoReplyBody,
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});