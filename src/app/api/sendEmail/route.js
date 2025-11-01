import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { to, subject, html } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.MAILTRAP_FROM || "contact@jacobs-electronics.com",
      to,
      subject,
      html,
    });

    return Response.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
