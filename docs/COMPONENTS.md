# Villain Society — Component Plan

## Overview

Every component planned before writing a single line of code.
This is the blueprint for the entire landing page.

---

## Component Tree

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

## Component Details

### Navbar.jsx

**Purpose:** Top navigation bar
**State:** None
**Props:** None
**Contains:**

- VILLAIN logo left
- Nav links center — About, Collections, Lookbook, Contact
- Coming Soon badge right

---

### Hero.jsx

**Purpose:** Main hero section — first thing visitor sees
**State:** None
**Props:** None
**Contains:**

- VILLAIN SOCIETY big heading
- Tagline — Built for the ones who never fit.
- MascotImage.jsx center
- Enter Villain World button

---

### MascotImage.jsx

**Purpose:** Display the villain mascot character
**State:** None
**Props:**

- src: string — image path
- alt: string — alt text

---

### VillainStatus.jsx

**Purpose:** Status card showing brand is loading
**State:** None
**Props:** None
**Contains:**

- Status badge — VILLAIN STATUS
- LOADING... animated text
- Pulsing red dot

---

### CountdownTimer.jsx

**Purpose:** Countdown to August 1 2026 launch
**State:**

- days: number
- hours: number
- mins: number
- secs: number
  **Props:** None
  **Logic:** useEffect with setInterval every 1000ms
  **Contains:**
- Days box
- Hours box
- Mins box
- Secs box

---

### EmailSignup.jsx

**Purpose:** Collect email signups before launch
**State:**

- email: string
- submitted: boolean
- error: string
- loading: boolean
  **Props:** None
  **Logic:** POST request to AWS API Gateway
  **Contains:**
- Heading — Get notified when we drop.
- Email input field
- Submit button
- Success message — You're in. Welcome to Villain World.
- Error message

---

### ProgressBar.jsx

**Purpose:** Animated loading bar for visual effect
**State:**

- progress: number
  **Props:** None
  **Logic:** useEffect animates from 0 to target number
  **Contains:**
- Label — Corrupting reality...
- Animated red progress bar
- Percentage number

---

### Footer.jsx

**Purpose:** Bottom of page
**State:** None
**Props:** None
**Contains:**

- VILLAIN SOCIETY text
- EST. 2026
- Social links — coming soon
- Copyright line
