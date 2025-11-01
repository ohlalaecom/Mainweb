export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json(
        { success: false, message: "Token and password are required" },
        { status: 400 }
      );
    }

    // Call Strapi reset password endpoint
    const strapiResponse = await fetch('https://admin.jacobs-electronics.com/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        newPassword: password,
      }),
    });

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      throw new Error(errorData.message || 'Failed to reset password');
    }

    const data = await strapiResponse.json();

    return Response.json({
      success: true,
      message: "Password reset successfully! You can now log in with your new password."
    });
  } catch (error) {
    console.error("❌ Failed to reset password:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}