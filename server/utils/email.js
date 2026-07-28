const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNotificationEmail = async ({ name, email, message }) => {
  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const mailOptions = {
    from: `"Portfolio Notifications" <${process.env.EMAIL_USER}>`,
    to: 'jeandamour157@gmail.com',
    replyTo: email,
    subject: `New Message from ${name} — Portfolio`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#0a0a1a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a1a;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#7c3aed 0%,#6d28d9 40%,#0891b2 100%);padding:40px 30px;border-radius:20px 20px 0 0;text-align:center;">
                    <div style="width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);margin:0 auto 16px;line-height:60px;font-size:24px;color:#fff;border:2px solid rgba(255,255,255,0.2);">
                      &#9993;
                    </div>
                    <h1 style="color:#ffffff;margin:0 0 6px;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                      New Message Received
                    </h1>
                    <p style="color:rgba(255,255,255,0.75);margin:0;font-size:14px;">
                      Someone contacted you through your portfolio
                    </p>
                  </td>
                </tr>

                <!-- Sender Card -->
                <tr>
                  <td style="background-color:#111127;padding:30px 30px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:16px;overflow:hidden;">
                      <tr>
                        <td style="padding:24px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="56" valign="top">
                                <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#06b6d4);text-align:center;line-height:52px;font-size:18px;font-weight:700;color:#ffffff;">
                                  ${initials}
                                </div>
                              </td>
                              <td width="16"></td>
                              <td valign="top">
                                <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8b5cf6;font-weight:600;">From</p>
                                <p style="margin:0 0 2px;font-size:18px;font-weight:700;color:#f0f0f0;">${name}</p>
                                <p style="margin:0;font-size:13px;">
                                  <a href="mailto:${email}" style="color:#22d3ee;text-decoration:none;">${email}</a>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="background-color:#111127;padding:20px 30px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8b5cf6;font-weight:600;">Message</p>
                          <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;border-left:4px solid #7c3aed;">
                            <tr>
                              <td style="padding:20px;">
                                <p style="margin:0;font-size:15px;line-height:1.7;color:#d1d5db;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Reply Button -->
                <tr>
                  <td style="background-color:#111127;padding:24px 30px 0;" align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-radius:12px;background:linear-gradient(135deg,#7c3aed,#0891b2);">
                          <a href="mailto:${email}?subject=Re: Your message on my portfolio&body=Hi ${name.split(' ')[0]},%0A%0AThank you for reaching out through my portfolio. " style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.3px;">
                            Reply to ${name.split(' ')[0]} &#8594;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Meta Info -->
                <tr>
                  <td style="background-color:#111127;padding:20px 30px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:10px;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="font-size:12px;color:#6b7280;">
                                &#128337; ${timestamp}
                              </td>
                              <td align="right" style="font-size:12px;color:#6b7280;">
                                via jeandamour.dev
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#111127;padding:24px 30px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;text-align:center;">
                          <p style="margin:0 0 4px;font-size:12px;color:#4b5563;">
                            Sent from your portfolio contact form
                          </p>
                          <p style="margin:0;font-size:11px;color:#374151;">
                            &copy; ${new Date().getFullYear()} NSHIMIYIMANA Jean Damour &middot; Built with passion, creativity and technology
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `New Message from ${name} (${email})\n\n${message}\n\n---\nSent via jeandamour.dev | ${timestamp}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendNotificationEmail };
