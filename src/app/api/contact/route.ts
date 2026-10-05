import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, company, budget, message } =
      await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and message are required.",
        },
        { status: 400 },
      );
    }

    // Create Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New Website Enquiry - ${name}`,
      text: `
New Website Enquiry

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Budget: ${budget || "Not provided"}

Message:
${message}
      `,
      html: `
        <h2>New Website Enquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${
          company || "Not provided"
        }</p>
        <p><strong>Budget:</strong> ${
          budget || "Not provided"
        }</p>

        <h3>Message</h3>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Contact form email error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
      },
      { status: 500 },
    );
  }
}