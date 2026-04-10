# Email Setup Guide for Contact Form

Your contact form is now wired to send emails to **aziz.mansour.tn@gmail.com**.

## Setup Instructions

### 1. Gmail App Password Setup

Since the form uses Gmail SMTP, you need to create an **App Password** (not your regular Gmail password):

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows/Linux" (or your device)
3. Google will generate a 16-character app password
4. Copy this password

### 2. Configure Environment Variables

Edit `.env.local` in your project root with:

```env
EMAIL_FROM=aziz.mansour.tn@gmail.com
EMAIL_PASSWORD=your-16-character-app-password-here
```

Replace the password with the one from step 1.

### 3. How It Works

**Frontend (Contact.tsx):**
- User fills out the contact form with their email and message
- On submit, the form sends a POST request to `/api/contact`

**Backend (app/api/contact/route.ts):**
- Validates the input
- Sends an email to `aziz.mansour.tn@gmail.com` with:
  - Sender's email address
  - Full message content
  - HTML formatted body
  - Reply-To set to sender's email for easy response

### 4. Features

✅ Email validation on frontend
✅ Character count validation (10-500 chars)
✅ Loading state while sending
✅ Success/error feedback
✅ Form clears on successful submission
✅ Reply-To header set for easy responses
✅ HTML formatted emails

### 5. Troubleshooting

**"Failed to send email" error:**
- Check that `EMAIL_FROM` and `EMAIL_PASSWORD` are set in `.env.local`
- Verify the Gmail app password is correct (16 characters)
- Make sure 2-Step Verification is enabled on your Gmail account

**Still not receiving emails:**
- Check your Gmail spam folder
- Verify the app password is still valid
- Check server logs for detailed error messages

## Installation

The required packages are already installed:
- `nodemailer` - For SMTP email sending
- `@types/nodemailer` - TypeScript type definitions

If you ever need to reinstall:
```bash
npm install nodemailer @types/nodemailer
```
