📘 Git Setup Notes
📁 Working Directory: D:/groce-ready-api

This guide explains how to connect a local project to a new GitHub repository.

🧩 STEP 1 — Go to Project Directory

Open VS Code Terminal or PowerShell:

cd D:/groce-ready-api
🔎 Significance:

Moves terminal into your project folder.
All Git commands will now apply to this directory.

🧩 STEP 2 — Initialize Git (Only If New Project)
git init
🔎 Significance:

Creates a hidden .git folder.
This turns your normal folder into a Git repository.

⚠️ If you see:

Reinitialized existing Git repository

It means Git was already initialized — that’s fine.

🧩 STEP 3 — Check Existing Remote (Optional but Recommended)
git remote -v
🔎 Significance:

Checks if your project is already connected to any GitHub repo.

If nothing appears → No remote connected (normal for new project).

🧩 STEP 4 — Add Remote Repository
git remote add origin https://github.com/AbhayGJoshi/groce-ready-api.git
🔎 Significance:

Connects your local project to the GitHub repository.

origin = nickname for your GitHub repo

URL = your actual GitHub repository link

🧩 STEP 5 — Add All Files to Staging Area
git add .
🔎 Significance:

Prepares all files in the folder to be committed.

. means:

Add everything in current directory

🧩 STEP 6 — Commit Files
git commit -m "Initial commit"
🔎 Significance:

Creates a snapshot of your project.

-m → message

"Initial commit" → description of this version

🧩 STEP 7 — Ensure Branch Name is main
git branch -M main
🔎 Significance:

Renames current branch to main.

GitHub default branch is main, so this avoids mismatch errors.

🧩 STEP 8 — Push Code to GitHub
git push -u origin main
🔎 Significance:

Uploads your code to GitHub.

origin → remote name

main → branch name

-u → sets upstream (so next time you can just use git push)

🎯 After First Push

Next time, you only need:

git add .
git commit -m "your message"
git push

That’s it 🚀

🛑 Important for Node / API Projects

If this is a backend API (Node/Express), create .gitignore:

node_modules/
.env
Why?

Avoid uploading dependencies

Protect environment variables

🧠 Quick Mental Model
Command What It Does
git init Start Git tracking
git add . Select files
git commit Save version
git remote add Connect to GitHub
git push Upload code
