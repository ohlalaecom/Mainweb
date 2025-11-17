// export async function POST(req) {
//   try {
//     const { token, password } = await req.json();

//     if (!token || !password) {
//       return Response.json(
//         { success: false, message: "Token and password are required" },
//         { status: 400 }
//       );
//     }

//     // Find user by reset token
//     const findUserResponse = await fetch('https://admin.jacobs-electronics.com/api/users?filters[resetPasswordToken][$eq]=' + encodeURIComponent(token), {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${process.env.STRAPI_ADMIN_JWT}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!findUserResponse.ok) {
//       throw new Error('Failed to find user with token');
//     }

//     const users = await findUserResponse.json();
//     if (!users.data || users.data.length === 0) {
//       return Response.json({
//         error: { status: 404, name: "NotFoundError", message: "Not Found", details: {} },
//         data: null
//       }, { status: 404 });
//     }

//     const userId = users.data[0].id;

//     // Update the user's password and clear the reset token
//     const updateUserResponse = await fetch(`https://admin.jacobs-electronics.com/api/users/${userId}`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${process.env.STRAPI_ADMIN_JWT}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         password: password,
//         resetPasswordToken: null, // Clear the token after use
//       }),
//     });

//     if (!updateUserResponse.ok) {
//       const errorData = await updateUserResponse.json();
//       throw new Error(errorData.message || 'Failed to update password');
//     }

//     return Response.json({
//       success: true,
//       message: "Password reset successfully! You can now log in with your new password."
//     });
//   } catch (error) {
//     console.error("❌ Failed to reset password:", error);
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

import https from 'https';

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    // 1️⃣ Find user with that Gender
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users?filters[Gender][$eq]=${token}`, {
      agent: new https.Agent({ rejectUnauthorized: false }),
    });
    const users = await res.json();

    if (!users || users.length === 0) {
      return Response.json({ success: false, message: "Invalid or expired token." });
    }

    const user = users[0];

    // 2️⃣ Update password & clear token
    const updateRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
      },
      body: JSON.stringify({
        password,
        Gender: null,
      }),
      agent: new https.Agent({ rejectUnauthorized: false }),
    });

    if (!updateRes.ok) throw new Error("Failed to update password");

    return Response.json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}