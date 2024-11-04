import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD // Use App Password, not your regular password
      }
    });

    await transporter.sendMail({
      from: '"MedChoice One" <cosmicnups@gmail.com>',
      to: data.email,
      subject: 'Welcome to MedChoice One - Complete Your Registration',
      html: `
        <h1>Welcome to MedChoice One!</h1>
        <p>You've been invited to join our healthcare platform.</p>
        <p>Please click the link below to complete your registration:</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/register/patient/${encodeURIComponent(data.email)}">Complete Registration</a></p>
      `
    });

    return NextResponse.json({
      success: true,
      message: 'Invitation sent successfully'
    });
  } catch (error) {
    console.error('Invitation error:', error);
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    );
  }
}