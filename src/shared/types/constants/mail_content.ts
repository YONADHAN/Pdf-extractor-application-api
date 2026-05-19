export const VERIFICATION_MAIL_CONTENT = (otp: string) => `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #f4f4f4; border-radius: 14px; overflow: hidden; border: 1px solid #ddd;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #B00020, #E53935); padding: 35px 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 42px; color: white; font-weight: bold;">
      📄 PDF-Uploader
    </h1>

    <p style="margin-top: 12px; color: #ffe5e5; font-size: 16px;">
      Secure PDF Storage & Verification Platform
    </p>
  </div>

  <!-- Body -->
  <div style="padding: 35px 30px; background-color: white;">

    <h2 style="color: #B00020; text-align: center; margin-bottom: 20px;">
      Verify Your Account 🔐
    </h2>

    <p style="font-size: 16px; line-height: 1.7; color: #444;">
      Welcome to <strong>PDF-Uploader</strong> — your secure space for uploading,
      managing, and accessing PDF documents seamlessly.
    </p>

    <p style="font-size: 16px; line-height: 1.7; color: #444;">
      To continue securely, please verify your email address using the OTP below.
    </p>

    <!-- OTP Box -->
    <div style="
      margin: 35px 0;
      padding: 30px;
      background-color: #fafafa;
      border: 2px dashed #E53935;
      border-radius: 12px;
      text-align: center;
    ">
      <p style="margin-bottom: 12px; font-size: 15px; color: #666;">
        Your One-Time Verification Code
      </p>

      <div style="
        display: inline-block;
        background-color: #fff5f5;
        color: #B00020;
        font-size: 40px;
        font-weight: bold;
        letter-spacing: 8px;
        padding: 18px 30px;
        border-radius: 10px;
        border: 1px solid #ffcccc;
      ">
        ${otp.trim()}
      </div>

      <p style="margin-top: 18px; color: #777; font-size: 14px;">
        ⏰ This OTP expires in 1 minute
      </p>
    </div>

    <!-- Security -->
    <div style="
      background-color: #fff8f8;
      border-left: 4px solid #E53935;
      padding: 15px 18px;
      border-radius: 6px;
      margin-top: 25px;
    ">
      <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
        🔒 For your security, never share this verification code with anyone.
        PDF-Uploader staff will never ask for your OTP.
      </p>
    </div>

    <!-- Features -->
    <div style="margin-top: 35px;">
      <h3 style="color: #B00020; margin-bottom: 15px;">
        Why PDF-Uploader?
      </h3>

      <ul style="padding-left: 20px; color: #555; line-height: 1.8;">
        <li>📂 Secure PDF Uploads</li>
        <li>⚡ Fast File Processing</li>
        <li>☁️ Cloud-Based Storage</li>
        <li>🔍 Smart Document Access</li>
        <li>🛡️ Protected User Authentication</li>
      </ul>
    </div>

  </div>

  <!-- Footer -->
  <div style="
    background-color: #1f1f1f;
    color: #ccc;
    text-align: center;
    padding: 25px 20px;
  ">
    <p style="margin: 0 0 10px 0; font-size: 14px;">
      Need help? Contact our support team
    </p>

    <a 
      href="mailto:support@pdf-uploader.com"
      style="
        color: #ff6b6b;
        text-decoration: none;
        font-size: 14px;
      "
    >
      support@pdf-uploader.com
    </a>

    <div style="
      margin-top: 18px;
      font-size: 12px;
      color: #888;
    ">
      © ${new Date().getFullYear()} PDF-Uploader. All rights reserved.
    </div>
  </div>
</div>
`;
