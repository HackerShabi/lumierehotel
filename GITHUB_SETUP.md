# GitHub Setup for Automatic Deployment

This guide will help you set up automatic deployment to Firebase Hosting using GitHub Actions.

## Prerequisites

1. GitHub repository: https://github.com/HackerShabi/lumierehotel.git
2. Firebase project: `hotelwebsite-bca40`
3. Firebase CLI installed locally

## Setup Steps

### 1. Push Code to GitHub

First, initialize git and push your code to the GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/HackerShabi/lumierehotel.git
git branch -M main
git push -u origin main
```

### 2. Generate Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/project/hotelwebsite-bca40/settings/serviceaccounts/adminsdk)
2. Click "Generate new private key"
3. Download the JSON file
4. Copy the entire content of the JSON file

### 3. Add GitHub Secret

1. Go to your GitHub repository: https://github.com/HackerShabi/lumierehotel
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `FIREBASE_SERVICE_ACCOUNT_HOTELWEBSITE_BCA40`
6. Value: Paste the entire content of the service account JSON file
7. Click "Add secret"

### 4. Test the Deployment

Once you've set up the secret, any push to the `main` branch will automatically:

1. Install dependencies using pnpm
2. Build the Next.js project
3. Deploy to Firebase Hosting

You can monitor the deployment progress in the "Actions" tab of your GitHub repository.

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is configured to:

- Trigger on pushes to `main` or `master` branches
- Use Node.js 20 and pnpm for package management
- Build the project using `pnpm run build`
- Deploy to Firebase Hosting using the official Firebase action

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are properly listed in `package.json`
2. **Deployment fails**: Verify that the Firebase service account secret is correctly set
3. **Wrong project**: Ensure the `projectId` in the workflow matches your Firebase project

### Checking Deployment Status:

1. Go to GitHub repository → Actions tab
2. Click on the latest workflow run
3. Check the logs for any errors

### Firebase Hosting URL:

After successful deployment, your site will be available at:
- https://hotelwebsite-bca40.web.app
- https://mylumierehotel.web.app (if custom domain is configured)

## Manual Deployment (Backup)

If you need to deploy manually:

```bash
pnpm run build
firebase deploy --only hosting
```

## Next Steps

After setting up automatic deployment:

1. Any changes pushed to the main branch will automatically deploy
2. You can set up branch protection rules to require pull request reviews
3. Consider setting up staging deployments for pull requests
4. Configure custom domain if needed