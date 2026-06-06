# JS Proficiency Passport AI

A professional static platform prototype for an AI-integrated English proficiency ecosystem: diagnosis, practice course, mock test, secure real test, score report, QR-verifiable certificate, admin approval, item bank, analytics, and proctoring review.

## Final v7 Updates: Diagnostic Standardization + Listening Audio Control

- Diagnostic Test revised from 10 items to a standard 60-item diagnostic blueprint:
  - Listening: 12 items
  - Structure: 12 items
  - Reading: 12 items
  - Vocabulary: 12 items
  - Writing: 6 items
  - Speaking: 6 items
- Diagnostic listening now has visible audio controls with **Play / Replay Audio** and **Stop**.
- Practice page now includes a **Listening Practice Lab** with playable listening items.
- Practice and mock listening items allow unlimited replay and stop controls.
- Real Test listening items are restricted to **one play only per item**.
- Real Test audio button becomes disabled after the first play.
- Real Test security log records every one-time audio play.
- Real Test remains in ITP-style format:
  - Listening Comprehension: 50 items / 35 minutes
  - Structure & Written Expression: 40 items / 25 minutes
  - Reading Comprehension: 50 items / 55 minutes
  - Total: 140 items / 115 minutes

## Previous Final Features

- Compact one-fit premium landing page.
- All landing buttons are integrated and clickable.
- Admin access uses PIN only.
- Candidate, Lecturer, and Proctor login uses registered email and password.
- Detailed registration page added.
- Lecturer and Proctor registration requires Admin approval.
- Candidate registration is automatically approved.
- Navigation menu with Back, Dashboard, and role-specific pages is available in dashboards.
- Certificate is visible, printable, downloadable as HTML, and publicly verifiable.
- User registration codes and certificate codes are integrated.
- Professional code format uses EPP.
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

1. Create or open the public repository named:

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
