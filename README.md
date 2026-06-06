# JS Proficiency Passport AI

A deployable static prototype of an AI-integrated English proficiency platform for diagnosis, practice, secure testing, reporting, and QR-verifiable certification.

## Updated Version

This update includes:

- More exclusive landing page without the certificate demo block on the landing area.
- All landing buttons connected to working actions.
- Candidate demo access.
- Certificate verification page with sample certificate under **Joko Slamet**.
- Admin access simplified to **PIN only**.
- Candidate, Lecturer, and Proctor login simplified to **registered email + password**.
- Detailed account registration form for Candidate, Lecturer, and Proctor.
- Generic institution/organization field for multi-institution use.
- No Cipta Wacana University text in the login/registration access area.
- Certificate issuing authority remains configurable; the demo certificate can show Cipta Wacana University as the official issuer.
- 1000+ generated item-bank records across Listening, Structure, Reading, Vocabulary, Writing, and Speaking.

## Admin PIN

```text
JS2026
```

Admin does not need to fill profile details. Use only the Admin Access PIN on the landing page.

## Candidate / Lecturer / Proctor Access

1. Click **Register Account**.
2. Create a detailed account.
3. Login later using registered email and password.

## GitHub Pages Deployment

Upload these files directly to the repository root:

```text
index.html
styles.css
app.js
manifest.json
README.md
```

Recommended repository name:

```text
jsproficiencypassport
```

Your free GitHub Pages URL will be:

```text
https://jslametpbi.github.io/jsproficiencypassport/
```

## Production Note

This is a static demonstrator suitable for GitHub Pages. A real high-stakes testing platform should add backend authentication, encrypted database, server-side item bank, secure certificate registry, recorded proctoring evidence, and institutional audit logs.
