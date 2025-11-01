import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Call Strapi forgot password endpoint
    const strapiResponse = await fetch('https://admin.jacobs-electronics.com/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      throw new Error(errorData.message || 'Failed to send reset email');
    }

    const data = await strapiResponse.json();

    return Response.json({ success: true, message: "Password reset email sent successfully!" });
  } catch (error) {
    console.error("❌ Failed to send password reset email:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}