# Villain Society — Technical Spec

## Architecture Overview

A static React single page application deployed on AWS.
Email signups are handled by a serverless pipeline.

---

## Frontend

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v3
- **Animations:** CSS keyframes + Tailwind animate
- **Icons:** React Icons
- **Fonts:** Bebas Neue (heading), Space Grotesk (body)

---

## Backend — Serverless Pipeline

User submits email
↓
React sends POST request
↓
AWS API Gateway receives request
↓
AWS Lambda processes and validates email
↓
AWS DynamoDB saves email to database
↓
Returns success response to user

---

## AWS Infrastructure

| Service     | Purpose                     |
| ----------- | --------------------------- |
| S3          | Host production build files |
| CloudFront  | CDN + HTTPS global delivery |
| Lambda      | Process email signups       |
| API Gateway | REST API endpoint           |
| DynamoDB    | Store email signups         |
| IAM         | Security + permissions      |

---

## Component Architecture

App.jsx
├── Navbar.jsx
├── Hero.jsx
│ └── MascotImage.jsx
├── VillainStatus.jsx
├── CountdownTimer.jsx
├── EmailSignup.jsx
├── ProgressBar.jsx
└── Footer.jsx

---

## Data Flow

### Email Signup

- **Endpoint:** POST /api/v1/signup
- **Request body:** `{ email: string }`
- **Success response:** `{ success: true, message: "You're in. Welcome to Villain World." }`
- **Error response:** `{ success: false, error: "Invalid email" }`

---

## Environment Variables

VITE_API_URL=https://your-api-gateway-url/prod

---

## Deployment

```bash
npm run build
# Upload dist/ to AWS S3
# Invalidate CloudFront cache
```

---

## Future Phase 2

- Shopping cart
- Product pages
- Payment processing
- Social media integration
- Mobile app
