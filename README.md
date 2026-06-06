# JS Proficiency Passport AI

A deployable static prototype for an AI-integrated English proficiency platform.

## Main Features

- Professional landing page and role-based access
- Candidate dashboard
- AI-style diagnostic level test
- Personalized practice course
- Mock test
- Secure real-test interface
- Browser-level security logs
- Score report with JSPP-AI 0–900 scale
- CEFR interpretation
- Institutional ETP-style conversion
- Certificate generation
- QR verification page
- Admin dashboard
- Candidate management
- Item bank overview
- Institutional analytics
- Proctoring center
- Security audit logs
- Local data export

## Access

Candidate access can be created directly from the login form.
Admin, Lecturer, and Proctor access require the secure access PIN configured in `app.js`.

Default development PIN: `JS2026`

Change the PIN in `app.js` before production deployment.

## Deployment on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files in this folder:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `manifest.json`
   - `README.md`
3. Go to repository **Settings**.
4. Open **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/root`.
7. Save and open the generated GitHub Pages URL.

## Important Production Notes

This is a static deployable platform prototype. It is suitable for demonstration, research-and-development planning, UI/UX validation, and early institutional presentation.

For official high-stakes deployment, add:

- backend authentication
- encrypted database
- server-side item bank
- server-side scoring
- locked-browser integration
- human proctoring dashboard with recorded evidence
- secure public certificate database
- identity verification service
- institutional hosting and privacy compliance

## Academic Disclaimer

The institutional ETP-style conversion is a benchmark interpretation only. It is not an official TOEFL, TOEIC, IELTS, ETS, or other third-party test score.

