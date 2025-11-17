
// import nodemailer from "nodemailer";
// import crypto from "crypto";

// export async function POST(req) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return Response.json(
//         { success: false, message: "Email is required" },
//         { status: 400 }
//       );
//     }

//     // Generate reset token
//     const resetToken = crypto.randomBytes(32).toString('hex');

//     // Store token-email mapping in Strapi using admin API
//     // First, find the user by email
//     const findUserResponse = await fetch('https://admin.jacobs-electronics.com/api/users?filters[email][$eq]=' + encodeURIComponent(email), {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${process.env.STRAPI_ADMIN_JWT}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!findUserResponse.ok) {
//       throw new Error('Failed to find user');
//     }

//     const users = await findUserResponse.json();
//     if (!users.data || users.data.length === 0) {
//       throw new Error('User not found');
//     }

//     const userId = users.data[0].id;

//     // Store the reset token in the user's resetPasswordToken field
//     const updateUserResponse = await fetch(`https://admin.jacobs-electronics.com/api/users/${userId}`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${process.env.STRAPI_ADMIN_JWT}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         resetPasswordToken: resetToken,
//       }),
//     });

//     if (!updateUserResponse.ok) {
//       throw new Error('Failed to store reset token');
//     }

//     // Send email directly using nodemailer
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAILTRAP_HOST,
//       port: process.env.MAILTRAP_PORT,
//       auth: {
//         user: process.env.MAILTRAP_USER,
//         pass: process.env.MAILTRAP_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/account/reset-password?token=${resetToken}`;

//     await transporter.sendMail({
//       from: process.env.MAILTRAP_FROM || "contact@jacobs-electronics.com",
//       to: email,
//       subject: "Password Reset Request",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2>Password Reset Request</h2>
//           <p>You requested a password reset for your account.</p>
//           <p>Click the link below to reset your password:</p>
//           <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Reset Password</a>
//           <p>This link will expire in 1 hour.</p>
//           <p>If you didn't request this, please ignore this email.</p>
//           <p>Best regards,<br>Jacobs Electronics Team</p>
//         </div>
//       `,
//     });

//     return Response.json({ success: true, message: "Password reset email sent successfully!" });
//   } catch (error) {
//     console.error("❌ Failed to send password reset email:", error);
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }
import nodemailer from 'nodemailer';
import https from 'https';

export async function POST(req) {
    try {
        const { email } = await req.json();

        // 1️⃣ Check user exists in Strapi
        const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users?filters[email][$eq]=${email}`,
            {
                agent: new https.Agent({ rejectUnauthorized: false }),
            }
        );
        const users = await userRes.json();
        if (!users || users.length === 0) {
            return Response.json({
                success: false,
                message: 'User not found.',
            });
        }
        const user = users[0];

        // 2️⃣ Generate reset token
        const token = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`;

        // 3️⃣ Save token in Strapi user
        await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`, // Strapi API token
                },
                body: JSON.stringify({ Gender: token }),
                agent: new https.Agent({ rejectUnauthorized: false }),
            }
        );

        // 4️⃣ Create reset link
        const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/account/reset-password?token=${token}`;

        // 5️⃣ Send email
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
            from: process.env.MAILTRAP_FROM || 'contact@jacobs-electronics.com',
            to: email,
            subject: 'Password Reset Request',
            html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <div style="background-color: #007bff; color: white; text-align: center; padding: 20px;">
            <h2 style="margin: 0;">Jacobs Electronics</h2>
          </div>

          <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi ${user.username || 'there'},</p>

            <p style="font-size: 15px; color: #333;">
              We received a request to reset your password. Click the button below to set a new one:
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" target="_blank"
                style="
                  background-color: #007bff;
                  color: white;
                  padding: 12px 25px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-size: 16px;
                  display: inline-block;
                "
              >
                Reset My Password
              </a>
            </div>

            <p style="font-size: 14px; color: #555;">
              If the button above doesn’t work, copy and paste the link below into your browser:
            </p>

            <p style="word-break: break-all; color: #007bff; font-size: 13px;">
              <a href="${resetLink}" target="_blank">${resetLink}</a>
            </p>

            <p style="font-size: 14px; color: #555;">
              If you didn’t request a password reset, you can safely ignore this email.
            </p>

            <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Jacobs Electronics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      `,
        });

        return Response.json({
            success: true,
            message: 'Reset email sent successfully.',
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

