# Zero Prize - Frontend-Only Demo

This is a decoupled, frontend-only version of the **Zero Prize** website. All backend integrations (Supabase, Clerk, Google Sheets, and Resend) have been replaced with mock handlers to allow the application to run independently without requiring external service configurations or environment variables.

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠 Features (Mocked)

### 1. Application Portal (`/apply`)
The application portal is fully functional in demo mode. 
- **Authentication**: Clerk authentication is bypassed. You are automatically "signed in" as a mock applicant.
- **Form Submission**: Submitting the application form will return a success response and simulate an ID generation without actually writing to a database or sending emails.
- **File Uploads**: The upload functionality is mocked to return a placeholder URL.

### 2. Admin Dashboard (`/admin`)
The administrative dashboard is accessible without real credentials.
- **Login Bypass**: The login screen (`/admin/login`) accepts any input and sets a mock session cookie.
- **Data Display**: The dashboard fetches from mocked API endpoints that return empty lists or success status.
- **Permissions**: You are treated as a "Super Admin" with access to all categories.

### 3. Contact & Partner Forms
The Contact Us and Partner inquiry forms are neutralized. Submitting them will show a success message but will not trigger any server-side actions (like email sending or sheet updates).

## 🔌 Decoupling Details

The following services have been neutralized in this version:
- **Supabase**: Replaced with a proxy mock that returns successful empty results for all queries.
- **Clerk**: Removed from the frontend layout and mocked in the application flow.
- **Google Sheets**: All sync functions are now no-ops.
- **Resend (Email)**: Email triggers in API routes have been removed.
- **Middleware**: Authentication checks for admin routes have been disabled to allow unrestricted access for testing.

## 📝 Note
This version is intended for **frontend development and UI/UX demonstration only**. It does not persist data across server restarts (unless implemented via LocalStorage) and is not secured for production use.
