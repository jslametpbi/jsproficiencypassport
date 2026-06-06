# JS Proficiency Passport AI

A professional static platform prototype for an AI-integrated English proficiency ecosystem: diagnosis, practice course, mock test, secure real test, score report, QR-verifiable certificate, admin approval, item bank, analytics, and proctoring review.

## Final v5 Audio + ITP-Style Test Updates


- Added playable and relistenable audio buttons for all Listening items.
- Listening audio is generated in-browser through Web Speech API for the static demo, so no external audio files are required.
- Real Test revised to an institutional ITP-style academic proficiency format: 50 Listening, 40 Structure and Written Expression, and 50 Reading Comprehension items.
- Real Test timer revised to 115 minutes.
- Listening section includes Part A Short Conversations, Part B Longer Conversations, and Part C Academic Talks.
- Structure section includes Sentence Completion and Written Expression / Error Recognition.
- Reading section includes academic reading comprehension passages/items.
- Score Report now includes an ITP-style section profile with raw correct counts and section scores.

- Compact one-fit premium landing page.
- Removed the production database warning text from the landing page.
- Removed certificate/demo block from landing page.
- All landing buttons are integrated and clickable.
- Admin access uses PIN only.
- Candidate, Lecturer, and Proctor login uses registered email and password.
- Detailed registration page added.
- Lecturer and Proctor registration requires Admin approval.
- Candidate registration is automatically approved.
- Navigation menu with Back, Dashboard, and role-specific pages is available in dashboards.
- Certificate is visible, printable, downloadable as HTML, and publicly verifiable.
- User registration codes and certificate codes are integrated.
- Professional code format now uses EPP, not JSPP.
- Item bank contains 1217+ demo records across six skills.
- Landing page includes Copyright © Dr. Joko Slamet.
- Certificate demo for Joko Slamet is issued by Cipta Wacana University Official Testing Center.

## Demo Access

### Admin

PIN only:

```text
JS2026
```

### Candidate Demo

Use the landing button:

```text
Enter Candidate Demo
```

Or sign in manually:

```text
Email: joko.demo@proficiency.local
Password: demo12345
Role: Candidate / Test Taker
```

## Registration Approval

- Candidate account: approved automatically.
- Lecturer account: pending until Admin approval.
- Proctor account: pending until Admin approval.

After creating a Lecturer or Proctor account, log in as Admin, open **Approvals**, and approve the account.

## GitHub Pages Deployment

1. Create a public repository named:

```text
jsproficiencypassport
```

2. Upload these files directly to the repository root:

```text
index.html
styles.css
app.js
manifest.json
README.md
```

3. Open:

```text
Settings → Pages → Deploy from a branch → main → /root → Save
```

4. Your free URL should be:

```text
https://jslametpbi.github.io/jsproficiencypassport/
```

## Production Note

This package is a static prototype for GitHub Pages and institutional demonstration. For real high-stakes testing, connect it to secure backend authentication, encrypted databases, server-side item bank storage, verified proctoring evidence, and a protected certificate registry.


## v6 Listening Audio Fix
- Every Listening item now has a visible clickable speaker button.
- Diagnostic, Mock Test, and Real Test listening questions all include Play / Relisten audio.
- Real Test keeps the ITP-style structure: 50 Listening, 40 Structure and Written Expression, 50 Reading Comprehension.
