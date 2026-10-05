import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      mobile1,
      mobile2,
      company,
      budget,
      message,
    } = await request.json();

    // At least one contact number is required.
    if (!name || (!mobile1 && !mobile2) || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, at least one contact number, and message are required.",
        },
        { status: 400 },
      );
    }

    // Create Gmail / Google Workspace SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email to company
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,

      // If the visitor provides an email, the company
      // can directly reply to that email.
      replyTo: email || undefined,

      subject: `New Website Enquiry - ${name}`,

      text: `
New Website Enquiry

Name: ${name}

Email: ${email || "Not provided"}

Contact Number 1: ${mobile1 || "Not provided"}

Contact Number 2: ${mobile2 || "Not provided"}

Company: ${company || "Not provided"}

Budget: ${budget || "Not provided"}

Message:
${message}
      `,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #222;
          "
        >
          <h2>New Website Enquiry</h2>

          <p>
            <strong>Name:</strong><br />
            ${name}
          </p>

          <p>
            <strong>Email:</strong><br />
            ${email || "Not provided"}
          </p>

          <p>
            <strong>Contact Number 1:</strong><br />
            ${mobile1 || "Not provided"}
          </p>

          <p>
            <strong>Contact Number 2:</strong><br />
            ${mobile2 || "Not provided"}
          </p>

          <p>
            <strong>Company:</strong><br />
            ${company || "Not provided"}
          </p>

          <p>
            <strong>Budget:</strong><br />
            ${budget || "Not provided"}
          </p>

          <h3>Message</h3>

          <p>
            ${message.replace(/\n/g, "<br />")}
          </p>
        </div>
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
