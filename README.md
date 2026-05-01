This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Dashboard Access

The dashboard now supports scoped expert logins without changing the production submission tables.

The dashboard supports three account sources, in order:

1. Users created inside the admin dashboard and stored in the `admin_users` Supabase table.
2. `ADMIN_USERS_JSON` for bootstrap or backup accounts.
3. `ADMIN_EMAIL` + `ADMIN_PASSWORD` as a fallback super-admin account.

Before using the in-dashboard Users module, run [supabase_admin_users_setup.sql](f:/Hostwire%20Systems/Zero%20Prize/zeroprize/supabase_admin_users_setup.sql) in Supabase SQL Editor.

Optional env bootstrap accounts can still be configured with `ADMIN_USERS_JSON`:

```json
[
	{
		"email": "zeroprize@policyandgovernance.in",
		"password": "replace-with-a-strong-password",
		"role": "super_admin",
		"displayName": "Zero Prize Admin"
	},
	{
		"email": "air.expert@example.com",
		"password": "replace-with-a-strong-password",
		"role": "expert",
		"allowedCategories": ["air"],
		"displayName": "Air Expert"
	},
	{
		"email": "water.expert@example.com",
		"password": "replace-with-a-strong-password",
		"role": "expert",
		"allowedCategories": ["water"],
		"displayName": "Water Expert"
	},
	{
		"email": "land.expert@example.com",
		"password": "replace-with-a-strong-password",
		"role": "expert",
		"allowedCategories": ["land"],
		"displayName": "Land Expert"
	}
]
```

Notes:

- `ADMIN_SECRET_TOKEN` is still required and is now used to sign dashboard sessions.
- `ADMIN_EMAIL` + `ADMIN_PASSWORD` still work as a fallback super-admin account if `ADMIN_USERS_JSON` is not configured.
- Super admins can now create additional dashboard users directly from the Users tab in the admin dashboard.
- Expert accounts can only view registrations and applications in their assigned categories.
- Only super admins can view contacts, partner inquiries, and delete records.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
