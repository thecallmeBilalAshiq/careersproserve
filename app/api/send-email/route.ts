import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, html, from } = body;

    const emailUser = process.env.GMAIL_USER || 'careersproserve@gmail.com';
    const emailPass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_TOKEN || process.env.EMAIL_PASS;

    console.log(`[Email Dispatcher] Attempting to send email to: ${to} | Subject: ${subject}`);

    if (emailPass) {
      // 1. Live Gmail SMTP dispatch via App Password
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const info = await transporter.sendMail({
        from: `Sapphire ProServe <${emailUser}>`,
        to,
        subject,
        html,
      });

      console.log(`[Email Dispatcher] Sent successfully via Gmail SMTP! MessageId: ${info.messageId}`);
      return NextResponse.json({
        success: true,
        messageId: info.messageId,
        provider: 'gmail_smtp',
      });
    }

    // 2. Fallback Mode (Simulated successful dispatch when env variable is awaiting input)
    console.log(`[Email Dispatcher - Dev Fallback] Simulated email to ${to} (Subject: "${subject}")`);
    return NextResponse.json({
      success: true,
      provider: 'simulated_fallback',
      note: 'To enable live Gmail delivery, add GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx to .env',
    });
  } catch (error: any) {
    console.error('[Email Dispatcher Error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Email delivery failed' },
      { status: 500 }
    );
  }
}
