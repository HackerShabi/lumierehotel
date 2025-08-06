# Data Migration Instructions for Lumiere Hotel Website

## Overview

We've updated the Firestore data structure to use subcollections for better data segregation between different websites in the same Firebase project. This document provides instructions on how to migrate your existing data to the new structure and set up the necessary Firebase configurations.

## Prerequisites

1. Firebase CLI installed (`npm install -g firebase-tools`)
2. Node.js and npm/pnpm installed
3. Firebase Admin SDK service account key

## Step 1: Download Service Account Key

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`hotelwebsite-bca40`)
3. Navigate to Project Settings > Service accounts
4. Click "Generate new private key"
5. Save the file as `serviceAccountKey.json` in the root of your project

## Step 2: Install Required Dependencies

```bash
npm install firebase-admin
# or if using pnpm
pnpm add firebase-admin
```

## Step 3: Migrate Existing Data

We've provided two scripts to help with data migration:

### Option 1: Migrate Existing Data

If you have existing data in the old collections, use this script to migrate it to the new subcollections:

```bash
node scripts/migrateData.js
```

This script will:
- Copy all rooms from `rooms` collection to `rooms/mylumierehotel/roomData`
- Copy all bookings from `bookings` collection to `bookings/mylumierehotel/bookingData`
- Copy all contacts from `contacts` collection to `contacts/mylumierehotel/contactData`
- Add a `website` field with value `mylumierehotel` to each document

### Option 2: Seed Initial Data

If you don't have existing data or want to start fresh, use this script to seed some initial data:

```bash
node scripts/seedInitialData.js
```

This script will create:
- 3 sample rooms
- 1 sample booking
- 1 sample contact message

## Step 4: Deploy Firestore Rules

We've already updated the Firestore security rules to secure access to the new subcollections. Make sure they're deployed with:

```bash
firebase deploy --only firestore:rules
```

## Step 5: Verify Data in Admin Panel

1. Open the admin panel at [https://mylumierehotel.web.app/admin](https://mylumierehotel.web.app/admin)
2. You should now see the migrated or seeded data in the dashboard

## Troubleshooting

### No Data Showing in Admin Panel

If you don't see any data in the admin panel after migration:

1. Check the browser console for any errors
2. Verify that the data exists in the correct subcollections in the Firebase console
3. Make sure the Firestore rules allow reading from the subcollections

### Error Running Migration Scripts

If you encounter errors running the migration scripts:

1. Make sure the `serviceAccountKey.json` file is in the correct location
2. Check that you have the necessary permissions in the Firebase project
3. Verify that the Firebase Admin SDK is properly installed

## Additional Information

### Data Structure

The new data structure uses subcollections to segregate data by website:

- `rooms/{websiteId}/roomData/{roomId}`
- `bookings/{websiteId}/bookingData/{bookingId}`
- `contacts/{websiteId}/contactData/{contactId}`

Where `{websiteId}` is `mylumierehotel` for this website.

### Security Rules

The updated security rules allow:

- Public read access to rooms
- Public write access for bookings and contacts (for form submissions)
- Admin panel access to all data without authentication

### Code Changes

The following files have been updated to use the new data structure:

- `lib/firebaseServices.ts`: All Firebase service functions
- `pages/admin.tsx`: Admin panel UI and authentication
- `firestore.rules`: Firestore security rules