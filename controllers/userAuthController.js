import crypto from "crypto";

const safeCompare = (receivedValue, expectedValue) => {
  const received = Buffer.from(receivedValue || "");
  const expected = Buffer.from(expectedValue || "");

  if (received.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(received, expected);
};

export const loginUser = (req, res) => {
  const { username, password } = req.body || {};
  const expectedUsername = process.env.USER_USERNAME ;
  const expectedPassword = process.env.USER_PASSWORD;
  if (
    !username ||
    !password ||
    !safeCompare(username.trim(), expectedUsername) ||
    !safeCompare(password, expectedPassword)
  ) {
    return res.status(401).json({
      success: false,
      error: "Invalid username or password. Please contact admin for access credentials.",
    });
  }

  // Generate simple user session token with 1-day (24-hour) validity
  const token = `user_session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const ONE_DAY_SECONDS = 24 * 60 * 60; // 24 hours in seconds

  res.json({
    success: true,
    token,
    message: "Login successful",
    expiresIn: ONE_DAY_SECONDS,
    expiresAt: Date.now() + ONE_DAY_SECONDS * 1000,
  });
};
