import nodemailer from "nodemailer"

function getTransporter() {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com"
  const port = Number(process.env.SMTP_PORT ?? "587")
  const user = process.env.SMTP_USER ?? process.env.CONTACT_EMAIL ?? "nmearsbrand@gmail.com"
  const pass = process.env.SMTP_PASS

  if (!pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export async function sendNewsletterEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  const transporter = getTransporter()
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "nmearsbrand@gmail.com"

  if (!transporter) {
    throw new Error("Email is not configured. Set SMTP_PASS in your environment variables.")
  }

  await transporter.sendMail({
    from: `nolandmears3rd <${from}>`,
    to,
    subject,
    html,
  })
}

export function buildNewsletterHtml(subject: string, body: string) {
  const paragraphs = body
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p style="margin:0 0 16px;line-height:1.6;color:#111;">${line}</p>`)
    .join("")

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#ffffff;color:#111;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#666;">nolandmears3rd</p>
      <h1 style="margin:0 0 24px;font-size:28px;text-transform:uppercase;">${subject}</h1>
      ${paragraphs}
      <hr style="border:none;border-top:1px solid #ddd;margin:32px 0;" />
      <p style="margin:0;font-size:12px;color:#666;">You are receiving this because you subscribed at nolandmears3rd.com</p>
    </div>
  `
}
