import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

dotenv.config();

export async function POST(req: Request) {
  try {
    const { email, name, subject, moreDetails } = await req.json();

    // If environment variables are not detected.
    if (!SMTP_PASSWORD || !SMTP_USER) {
      return NextResponse.json(
        { message: "internal server error." },
        { status: 500 }
      );
    }

    // ensure there are not empty fields.
    if (!email || !name || !subject || !moreDetails) {
      return NextResponse.json(
        { message: "please fill all the input fields." },
        { status: 400 }
      );
    }

    // check email string's format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "please send approapriate email." },
        { status: 400 }
      );
    }

    // check the limit of the input values.
    if (name.length > 50 || subject.length > 75 || moreDetails.length > 200) {
      return NextResponse.json(
        { message: "input value exceeds max limit." },
        { status: 400 }
      );
    }

    // 1. Create reusable transporter object using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    // 2. Plain text version
    const text = `
                  Hello Dipanshu,

                  You’ve received a new connection request through your portfolio website.

                  From: ${name}
                  Email: ${email}
                  Subject: ${subject}

                  Message:
                  ${moreDetails}

                  Best regards,  
                  Your Portfolio Bot
`;

    // 3. HTML version with button
    const html = `
                  <html>
                    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                      <h2 style="color: #1D8F6E;">New Connection Request</h2>
                      <p>Hello Dipanshu,</p>
                      <p>You’ve received a new message from your portfolio website. Here are the details:</p>
                      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                          <td style="padding: 8px; font-weight: bold;">Name:</td>
                          <td style="padding: 8px;">${name}</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                          <td style="padding: 8px; font-weight: bold;">Email:</td>
                          <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 8px; font-weight: bold;">Subject:</td>
                          <td style="padding: 8px;">${subject}</td>
                        </tr>
                      </table>
                      <p><strong>Message:</strong></p>
                      <p style="padding: 12px; background-color: #f1f1f1; border-radius: 6px;">${moreDetails}</p>
                      <br/>
                      <p style="font-size: 0.9em; color: #666;">
                        This message was sent via your portfolio website's Connect Page.
                      </p>
                    </body>
                  </html>`;
    // 4. Send mail
    const info = await transporter.sendMail({
      from: SMTP_USER,
      to: "dipanshuchoksi@gmail.com",
      subject: "Let's connect!",
      text: text,
      html: html,
    });

    console.log("email sent: %s", info.messageId);
    return NextResponse.json({
      successful: true,
      msg: "email sent successfully.",
    });
  } catch (err) {
    console.error(`Failed to send email`, err);
    return NextResponse.json(
      {
        successful: false,
        msg: "there was an error while sending email.",
      },
      { status: 500 }
    );
  }
}
