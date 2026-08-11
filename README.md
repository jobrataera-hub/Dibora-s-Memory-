# Dibora Birthday — production starter

## Features
- Mobile-first luxury birthday experience
- Firestore memory timeline
- Firebase Storage photo/video uploads
- Admin-only memory editor
- Real guest wishes with moderation
- Wishing Sky and local time capsule
- Balloon Pop, Birthday Quiz, Memory Match
- Interactive piano and birthday melody
- Fireworks finale

## Setup

1. Create a Firebase project.
2. Enable Authentication providers: Email/Password and Anonymous.
3. Create Firestore Database.
4. Create Storage.
5. Put your Web App config into `firebase-config.js`.
6. Install and run:

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
```

## Admin

Create an Email/Password user in Firebase Authentication.

The admin editor requires a Firebase custom claim:

```js
{ "admin": true }
```

Set it only from a trusted server using Firebase Admin SDK. Never put a service-account private key in this project.

Example secure Node script:

```js
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

initializeApp({ credential: applicationDefault() });

const user = await getAuth().getUserByEmail(process.argv[2]);
await getAuth().setCustomUserClaims(user.uid, { admin: true });
console.log("Admin enabled:", user.email);
```

Run with `GOOGLE_APPLICATION_CREDENTIALS=/secure/service-account.json node set-admin.mjs you@example.com`.

Then sign out/in at `/admin.html`.

## Firebase rules

Deploy:

```bash
firebase deploy --only firestore:rules,storage
```

Guest wishes are created by anonymous-authenticated visitors, stored as `approved:false`, and are visible publicly only after admin approval.

Memory writes and Storage uploads are admin-only.

## Media

Admin uploads go to:

`memories/{memoryId}/{timestamp}_{filename}`

The editor supports images and videos. The current client limits uploads to 250 MB; for a very large public archive, add video transcoding/thumbnails and image compression.

## Production hardening

Recommended next:
- Firebase App Check
- Cloud Functions for stronger anti-spam/rate limiting
- image compression and video thumbnails
- backups
- PWA/offline support
- custom domain
- private/family-only memories
- analytics/privacy controls

Firebase's current web guidance recommends the modular SDK and restrictive Firestore/Storage rules for production.
