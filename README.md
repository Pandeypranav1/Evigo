## Evigo — Real-time Event Services Platform

Evigo is a real-time event service marketplace with:

- **Only real providers**: no mock listings; providers appear only after registration.
- **Only 5 services**: Catering, Photography, DJ, Mehendi & Makeup, Cultural.
- **Mobile OTP login** via Firebase (Client + Provider).
- **Provider onboarding** (“Become a Partner”) stored in Firestore.
- **Bookings** stored in Firestore; providers **Accept/Reject** in dashboard.
- **Call Now** `tel:` action on every vendor card.

## Getting started

### 1) Install and run

```bash
npm i
npm run dev
```

Open `http://localhost:3000`.

### 2) Firebase setup (required)

Create a Firebase project and enable:

- **Authentication → Sign-in method → Phone**
- **Firestore Database**

Then create `/.env.local` from `/.env.example` and fill:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### 3) reCAPTCHA notes (OTP login)

Firebase Phone Auth uses reCAPTCHA automatically:

- Add `localhost` to **Authentication → Settings → Authorized domains** (for local dev)
- Add your production domain when deploying

## App routes

- `/` — Homepage (dynamic featured providers)
- `/explore` — Real-time vendor listing + booking modal
- `/partner` — Become a Partner form (writes provider to Firestore)
- `/login/client` — Client OTP login
- `/login/provider` — Provider OTP login
- `/dashboard` — Client booking list
- `/provider/dashboard` — Provider booking requests (Accept/Reject)

## Deploy

Any Next.js hosting works (Vercel recommended). Ensure your production domain is added to Firebase Authorized Domains and your env vars are configured.
