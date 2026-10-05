import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      mobile1,
      mobile2,
      company,
      budget,
      message,
    } = body;

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required.",
        },
        { status: 400 }
      );
    }

    // First contact number is required
    if (!mobile1?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact number is required.",
        },
        { status: 400 }
      );
    }

    if (!message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // CHECK ENVIRONMENT VARIABLES
    // -----------------------------

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.CONTACT_TO
    ) {
      console.error("Missing SMTP environment variables:", {
        SMTP_HOST: !!process.env.SMTP_HOST,
        SMTP_PORT: !!process.env.SMTP_PORT,
        SMTP_USER: !!process.env.SMTP_USER,
        SMTP_PASSWORD: !!process.env.SMTP_PASSWORD,
        CONTACT_TO: !!process.env.CONTACT_TO,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Email configuration is missing.",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // CREATE SMTP TRANSPORTER
    // -----------------------------

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // -----------------------------
    // SEND EMAIL
    // -----------------------------

    await transporter.sendMail({
      from: process.env.SMTP_USER,

      to: process.env.CONTACT_TO,

      replyTo: email?.trim() || process.env.SMTP_USER,

      subject: `New Project Inquiry - ${name}`,

      text: `
NEW PROJECT INQUIRY
===================

Name:
${name}

Email:
${email?.trim() || "Not provided"}

Contact Number:
${mobile1}

Alternate Contact Number:
${mobile2?.trim() || "Not provided"}

Company:
${company?.trim() || "Not provided"}

Project Budget:
${budget || "Not provided"}

----------------------------------------

PROJECT MESSAGE:

${message}
`,

      html: `
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            max-width: 700px;
            margin: 0 auto;
            padding: 30px;
            color: #222;
            background: #ffffff;
          "
        >

          <h2
            style="
              margin: 0 0 25px;
              padding-bottom: 15px;
              border-bottom: 1px solid #dddddd;
            "
          >
            New Project Inquiry
          </h2>

          <h3>Contact Information</h3>

          <p>
            <strong>Name:</strong><br />
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Email:</strong><br />
            ${escapeHtml(email?.trim() || "Not provided")}
          </p>

          <p>
            <strong>Contact Number:</strong><br />
            ${escapeHtml(mobile1)}
          </p>

          <p>
            <strong>Alternate Contact Number:</strong><br />
            ${escapeHtml(mobile2?.trim() || "Not provided")}
          </p>

          <p>
            <strong>Company:</strong><br />
            ${escapeHtml(company?.trim() || "Not provided")}
          </p>

          <p>
            <strong>Project Budget:</strong><br />
            ${escapeHtml(budget || "Not provided")}
          </p>

          <hr
            style="
              margin: 30px 0;
              border: 0;
              border-top: 1px solid #dddddd;
            "
          />

          <h3>Project Message</h3>

          <div
            style="
              padding: 20px;
              background: #f7f7f7;
              border-radius: 8px;
              white-space: pre-line;
            "
          >
            ${escapeHtml(message)}
          </div>

        </div>
      `,
    });

    console.log("Contact email sent successfully.");

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message.",
      },
      { status: 500 }
    );
  }
}

// -----------------------------
// ESCAPE HTML
// -----------------------------

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}