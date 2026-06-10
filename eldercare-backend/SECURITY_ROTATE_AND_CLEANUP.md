# Security: Rotate leaked MongoDB credentials & cleanup Git history

This document guides you through rotating the leaked DB credentials and removing them from Git history. Do these steps immediately.

## 1) Rotate MongoDB credentials (Atlas)
1. Sign in to MongoDB Atlas: https://cloud.mongodb.com
2. Open your project -> Database Access -> Edit the user `connectshivanikumari_db_user` or create a new user.
3. Change the password to a new strong password (or create a new user and note the username/password).
4. If you created a new user, update your `MONGODB_URI` accordingly.
5. Restrict network access: Project -> Network Access -> remove `0.0.0.0/0` and add only trusted IPs or use VPC peering.
6. Enable backups if not already enabled.

## 2) Update environment files locally
- Create or update `.env` (DO NOT COMMIT) in `eldercare-backend/` with the new connection string, for example:

```
MONGODB_URI=mongodb+srv://<user>:<new_password>@cluster0.chqzmtt.mongodb.net/eldercare?retryWrites=true&w=majority
PORT=8000
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

- Verify the app works locally: from `eldercare-backend` run:

```powershell
npm install
node server.js
# or for dev
npx nodemon server.js
```

Then visit `http://localhost:8000/health`.

## 3) Remove leaked value from working tree (already done)
- `server.js` no longer contains the URI; confirm with:

```powershell
grep -R "cluster0.chqzmtt" -n . || Select-String -Pattern "cluster0.chqzmtt" -Path * -CaseSensitive
```

## 4) Remove leaked value from Git history (REWRITE HISTORY) — pick one method

IMPORTANT: Rewriting history is destructive. Coordinate with collaborators and ensure you understand the steps. All contributors must re-clone or reset their local clones after this.

Option A — Use `git filter-repo` (recommended):

1. Install `git-filter-repo`:
- On Windows (recommended via pip):

```powershell
pip install git-filter-repo
```

2. Run from repository root (make a backup first):

```powershell
git clone --mirror <repo-url> repo-mirror.git
cd repo-mirror.git
# Remove the offending string from refs
git filter-repo --replace-text <(echo "password_to_remove==>***REDACTED***")
# Push rewritten repo
git push --force --all
git push --force --tags
```

Option B — Use BFG Repo-Cleaner:

1. Download BFG: https://rtyley.github.io/bfg-repo-cleaner/
2. Create a file `passwords.txt` with the exact secret(s) (one per line).
3. Run (from a fresh mirror):

```powershell
git clone --mirror <repo-url>
java -jar bfg.jar --replace-text passwords.txt repo.git
cd repo.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

Option C — Use `git filter-branch` (legacy, slower): see Git docs.

## 5) After rewriting history
- Ask all collaborators to re-clone the repo.
- In CI/CD provider (GitHub, Render, etc.) update any stored secrets with the new credentials.

## 6) Rotate any other secrets if they may have been exposed
- JWT secret, Cloudinary keys, third-party API keys — rotate and update environment variables in hosting.

## 7) Prevent future leaks
- Ensure `.env` is in `.gitignore` (already added).
- Use environment variables or secret stores in deployment (GitHub Secrets, Render secrets, Heroku config vars, etc.).
- Add a pre-commit hook to detect secrets (pre-commit + detect-secrets or git-secrets).

---
If you want, I can attempt to run a non-destructive scan in the repo for likely secrets and prepare the commands to run `git filter-repo`. Do you want me to prepare and run the history-clean commands (I'll make a backup first and will not push without your confirmation)?
