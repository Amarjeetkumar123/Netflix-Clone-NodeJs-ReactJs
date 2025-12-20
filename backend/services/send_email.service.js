import nodemailer from 'nodemailer';
import fs from 'fs';

/**
 * Sends an email using Nodemailer with Gmail SMTP.
 *
 * @param {string|string[]} toEmails - The recipient email address(es).
 * @param {string} subject - The subject of the email.
 * @param {string} htmlText - The HTML content of the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - Throws an error if the email sending fails.
 */

export const sendEmail = async function (toEmails, subject, htmlText) {
  if (!Array.isArray(toEmails)) {
    toEmails = [toEmails];
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_APP_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD, // The 16-character App Password
    },
  });
  const mailOptions = {
    from: process.env.GOOGLE_APP_EMAIL,
    to: toEmails,
    subject: subject,
    html: htmlText,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
    throw error;
  } 
}

/**
 * Sends a verification email with a verification code to the specified email address.
 * This function should call when a user signs up an account.
 *
 * @param {string} userEmail - The email address to send the verification email to.
 * @param {string} verificationCode - The verification code to include in the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - Throws an error if the email sending fails.
 */
export const sendVerificationEmail = async (userEmail, verificationCode) => {
  try {
    const subject = 'Email Verification Code – Netflix-Clone';
    const htmlText = fs.readFileSync('./templates/email-templates/send_verification_email.html', 'utf-8');
    const customizedHtmlText = htmlText.replace('{{VERIFICATION_CODE}}', verificationCode);

    await sendEmail(userEmail, subject, customizedHtmlText);
    console.log('Verification email sent successfully');
  } catch (error) {
    // In case of any error, log it and re-throw the error for proper handling
    console.error('Error sending verification email', error);
    throw new Error(`Couldn't send verification email: ${error.message}`);
  }
};

/**
 * Sends a welcome email to the specified email address.
 * This function should call when a user successfully signs up an account.
 */
export const sendWelcomeEmail = async (userEmail, name) => {
  try {
    const subject = 'Welcome to Netflix-Clone!';
    const htmlText = fs.readFileSync('./templates/email-templates/send_welcome_email.html', 'utf-8');
    let customizedHtmlText = htmlText.replace('{{NAME}}', name);
    customizedHtmlText = customizedHtmlText.replace('{{APP_URL}}', process.env.CLIENT_URL);
    
    await sendEmail(userEmail, subject, customizedHtmlText);
    console.log('Welcome email sent successfully');
  } catch (error) {
    // In case of any error, log it and re-throw the error for proper handling
    console.error('Error sending welcome email', error);
    throw new Error(`Couldn't send welcome email: ${error.message}`);
  }
};

/**
 * Sends a password reset email to the specified email address.
 * This function should be called when a user requests a password reset.
 *
 * @param {string} userEmail - The email address to send the password reset email to.
 * @param {string} url - The URL of the password reset page with a unique token.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - Throws an error if the email sending fails.
 */
export const sendPasswordResetEmail = async (userEmail, url) => {
  try {
    const subject = 'Password Reset Request – Netflix-Clone';
    const htmlText = fs.readFileSync('./templates/email-templates/send_password_reset_email.html', 'utf-8');
    const customizedHtmlText = htmlText.replace('{{RESET_PASSWORD_URL}}', url);

    await sendEmail(userEmail, subject, customizedHtmlText);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email', error);
    throw new Error(`Couldn't send password reset email: ${error.message}`);
  }
};

/**
 * Sends a password reset success email to the specified email address.
 * This function should be called when a user successfully resets their password.
 *
 * @param {string} userEmail - The email address to send the password reset success email to.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - Throws an error if the email sending fails.
 */
export const sendPasswordResetSuccessEmail = async (userEmail) => {
  try {
    const subject = 'Your Password Has Been Reset – Netflix-Clone';
    const htmlText = fs.readFileSync('./templates/email-templates/send_password_reset_successfull_email.html', 'utf-8');

    const response = await sendEmail(userEmail, subject, htmlText);
    console.log('Password reset email sent successfully', response);
  } catch (error) {
    console.error('Error sending password reset email', error);
    throw new Error(`Couldn't send password reset email: ${error.message}`);
  }
};
