# UniWare

UniWare is a university equipment sharing and management system.

The system connects two main types of users:

- **Provider** — manages and provides university equipment
- **Borrower** — discovers equipment and requests to borrow it

The main system flow is:

```text
Register / Login
      ↓
Provider adds equipment
      ↓
Borrower discovers equipment
      ↓
Borrow request
      ↓
Provider approval
      ↓
Checkout
      ↓
Return
```

---

# Sprint 1

## Sprint Goal

Users can access the system, and Providers can add equipment that Borrowers can discover.

Sprint 1 focuses on the foundation of:

```text
Authentication
User
Equipment
Catalog
```

Current Sprint 1 stories include:

```text
US1-1 Register
US1-2 Login
US1-3 Logout

US2-1 Add Equipment
US2-2 View Own Equipment
US2-3 Edit Equipment
US2-5 Category / Location / Status

US3-1 Browse Equipment
US3-4 Equipment Detail
```

---

# Tech Stack

| Part | Technology | Purpose |
|---|---|---|
| Frontend | React | Build UI using reusable components |
| Language | TypeScript | Adds type checking to JavaScript |
| Frontend Tooling | Vite | Development server and production build tool |
| Styling | CSS | Prototype UI styling |
| Testing | Vitest | Test runner |
| React Testing | Testing Library | Test components from the user's perspective |
| Version Control | Git + GitHub | Branching, collaboration, Pull Requests |

## React

React is used to build the frontend as reusable components.

Example:

```tsx
function RegisterPage() {
  return <RegisterForm />;
}
```

Pages can be composed from smaller components:

```text
RegisterPage
    ↓
RegisterForm
    ├── Name input
    ├── Email input
    ├── Password input
    └── Submit button
```

## TypeScript

TypeScript is JavaScript with static type checking.

Files containing normal TypeScript use:

```text
.ts
```

React components containing JSX use:

```text
.tsx
```

Example:

```text
validation.ts
authApi.ts

RegisterPage.tsx
RegisterForm.tsx
```

## Vite

Vite provides the development environment and build system for the React application.

Run development server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

---

# Repository Structure

```text
UniWare/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── auth/
│   │   │       ├── RegisterForm.tsx
│   │   │       └── RegisterForm.test.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── RegisterPage.tsx
│   │   │   └── RegisterPage.css
│   │   │
│   │   ├── services/
│   │   │   └── authApi.ts
│   │   │
│   │   ├── types/
│   │   │   └── auth.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── validation.ts
│   │   │   └── validation.test.ts
│   │   │
│   │   ├── test/
│   │   │   └── setup.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── vitest.config.ts
│
├── docs/
│   └── api-contract.md
│
└── README.md
```

---

# Frontend Project Structure

The frontend follows a simple separation of responsibilities.

## `pages/`

Contains complete application screens.

Examples:

```text
RegisterPage.tsx
LoginPage.tsx
EquipmentCatalogPage.tsx
EquipmentDetailPage.tsx
```

A page normally represents a screen or route in the application.

---

## `components/`

Contains reusable UI pieces.

Example:

```text
components/
└── auth/
    └── RegisterForm.tsx
```

Do not put the entire application inside `App.tsx`.

Prefer:

```text
App
 ↓
Page
 ↓
Components
```

---

## `services/`

Contains code that communicates with backend APIs.

Example:

```text
services/authApi.ts
```

React components should not contain API implementation everywhere.

Prefer:

```text
RegisterForm
     ↓
registerUser()
     ↓
authApi.ts
     ↓
Backend API
```

This allows the backend implementation or URL to change without rewriting the UI.

---

## `types/`

Contains shared TypeScript interfaces and types.

Example:

```ts
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
```

This helps ensure different parts of the frontend use the same data structure.

---

## `utils/`

Contains reusable logic that is not UI-specific.

Example:

```text
validation.ts
```

Registration validation is separated from `RegisterForm.tsx` so that UI code and validation logic are not mixed together.

---

## CSS

`index.css` contains global/base styles shared by the application.

Page-specific styles should stay close to their page.

Example:

```text
RegisterPage.tsx
RegisterPage.css
```

Do not use `App.css` as a shared place for all feature styles.

---

# Getting Started

## 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

---

## 2. Enter the frontend directory

```bash
cd frontend
```

---

## 3. Install dependencies

```bash
npm install
```

Do **not** copy `node_modules` from another team member.

`npm install` reads:

```text
package.json
package-lock.json
```

and installs the correct dependencies locally.

`node_modules/` must not be committed to Git.

---

# Environment Configuration

Create:

```text
frontend/.env
```

using:

```text
frontend/.env.example
```

Current configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_API=true
```

## Mock API Mode

While the backend is not available:

```env
VITE_USE_MOCK_API=true
```

The frontend will use a mock registration response.

## Real Backend Mode

When the backend Register API is ready:

```env
VITE_USE_MOCK_API=false
```

The frontend will call:

```text
POST http://localhost:3000/api/auth/register
```

Restart Vite after changing `.env`:

```bash
Ctrl + C
npm run dev
```

> Never put passwords, database credentials, API secrets, or other secrets in variables beginning with `VITE_`.
>
> Vite frontend environment variables can be exposed to the browser.

---

# Running the Frontend

Start development server:

```bash
npm run dev
```

Vite normally starts at:

```text
http://localhost:5173
```

Stop the development server using:

```text
Ctrl + C
```

---

# Testing

Run tests in watch mode:

```bash
npm test
```

Run all tests once:

```bash
npm run test:run
```

Current registration tests cover:

```text
Valid registration data
Missing name
Invalid university email
Incorrect student ID length
Weak password
Missing password
Successful form submission
Duplicate email API error
Invalid form does not call API
```

---

# Lint

Check code quality and common coding issues:

```bash
npm run lint
```

---

# Production Build

Verify that the frontend can compile successfully:

```bash
npm run build
```

Before a Pull Request is considered ready, run:

```bash
npm run test:run
npm run lint
npm run build
```

All three should pass.

---

# Git Workflow

Do not develop directly on `main`.

Before starting a new User Story:

```bash
git switch main
git pull
```

Then create a new branch:

```bash
git switch -c feature/usX-X-name
```

Examples:

```text
feature/us1-1-register
feature/us1-2-login
feature/us1-3-logout

feature/us2-1-add-equipment
feature/us2-2-my-equipment

feature/us3-1-catalog
feature/us3-4-equipment-detail
```

Project/setup work that is not a User Story can use:

```text
chore/frontend-setup
```

---

# Typical Git Workflow

```text
main
 ↓
git pull
 ↓
create feature branch
 ↓
develop
 ↓
commit
 ↓
push
 ↓
Pull Request
 ↓
review
 ↓
merge into main
```

Example:

```bash
git switch main
git pull

git switch -c feature/us2-1-add-equipment

# work...

git add .
git commit -m "feat(us2-1): add equipment form"

git push -u origin feature/us2-1-add-equipment
```

Then open a Pull Request to:

```text
feature/us2-1-add-equipment
              ↓
             main
```

Do not push directly into `main`.

---

# Commit Convention

Use descriptive commit messages.

Feature:

```text
feat(us1-1): add registration form
```

Tests:

```text
test(us1-1): add registration form tests
```

Styling:

```text
style(us1-1): add registration prototype styling
```

Documentation:

```text
docs: add registration API contract
```

Project/configuration:

```text
chore: initialize React Vite TypeScript frontend
```

---

# US1-1 — Register Account

## User Story

A new user can create a UniWare account using an approved university email.

## Registration Fields

```text
Name
University Email
Password
```

---

# Registration Rules

## Name

Name must not be empty.

---

## Chulalongkorn Student Email

Required format:

```text
XXXXXXXXXX@student.chula.ac.th
```

where:

```text
XXXXXXXXXX = exactly 10 numeric digits
```

Valid example:

```text
6731234521@student.chula.ac.th
```

Invalid examples:

```text
putter@student.chula.ac.th
123456789@student.chula.ac.th
12345678901@student.chula.ac.th
1234567890@gmail.com
```

Validation pattern:

```text
^\d{10}@student\.chula\.ac\.th$
```

---

## Password

Password must:

```text
Have at least 8 characters
Contain at least 1 lowercase letter
Contain at least 1 uppercase letter
Contain at least 1 number
```

Example valid password:

```text
Uniware123
```

Important:

Frontend validation exists for user experience.

The backend must independently perform the same validation because frontend validation can be bypassed.

---

# Register API Contract

Full API documentation:

```text
docs/api-contract.md
```

## Endpoint

```http
POST /api/auth/register
```

## Request

```json
{
  "name": "Putter",
  "email": "6731234521@student.chula.ac.th",
  "password": "Uniware123"
}
```

The frontend must **not** send a role during self-registration.

Self-registration currently creates:

```text
BORROWER
```

Provider accounts for Sprint 1 can be created using seeded/test accounts.

---

# Successful Registration

Response:

```http
201 Created
```

```json
{
  "message": "Registration successful",
  "user": {
    "id": "1",
    "name": "Putter",
    "email": "6731234521@student.chula.ac.th",
    "role": "BORROWER"
  }
}
```

---

# API Error Format

All UniWare APIs should use the same basic error format:

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

Example duplicate email:

```http
409 Conflict
```

```json
{
  "code": "EMAIL_ALREADY_EXISTS",
  "message": "An account with this email already exists."
}
```

Example validation error:

```http
400 Bad Request
```

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid registration data."
}
```

Using one error format prevents different frontend features from handling backend errors differently.

---

# Current US1-1 Architecture

```text
RegisterPage
     ↓
RegisterForm
     │
     ├────────→ validation.ts
     │              ↓
     │        Client Validation
     │
     └────────→ authApi.ts
                    ↓
             Mock / Real API
                    ↓
            POST /auth/register
```

---

# US1-1 Frontend Completed

The current `feature/us1-1-register` branch includes:

```text
Registration page
Registration form

React form state

Required-field validation
Chula student email validation
Password validation

Loading state
Success state
API error state

TypeScript API types
Register API contract

Mock registration API
Real backend-ready fetch implementation

Environment configuration

Prototype styling

Validation unit tests
Registration form component tests

Lint check
Production build check
```

---

# US1-1 Backend Still Required

The complete User Story is **not finished yet**.

Backend work still includes:

```text
User data model
Database migration

POST /api/auth/register

Server-side:
- name validation
- Chula student email validation
- password validation
- duplicate email validation

Password hashing

Create User in database

Return API response according to:
docs/api-contract.md
```

After the backend is ready:

```text
VITE_USE_MOCK_API=false
        ↓
Frontend
        ↓
Real Register API
        ↓
Database
```

Then the team must perform integration/end-to-end registration tests.

---

# Creating a New Frontend Feature

For example, if working on US1-2 Login:

Start from the latest `main`:

```bash
git switch main
git pull
git switch -c feature/us1-2-login
```

Recommended files:

```text
src/
├── pages/
│   └── LoginPage.tsx
│
├── components/
│   └── auth/
│       └── LoginForm.tsx
│
├── services/
│   └── authApi.ts
│
└── types/
    └── auth.ts
```

Notice that `authApi.ts` and `auth.ts` already exist.

Do not create duplicate files such as:

```text
loginApi.ts
authenticationApi.ts
userAuthApi.ts
```

without discussing it with the team first.

Authentication-related API functions should normally stay together in:

```text
services/authApi.ts
```

For example:

```text
registerUser()
loginUser()
logoutUser()
```

---

# Creating an Equipment Feature

Equipment features should follow the same pattern.

Example:

```text
pages/
└── AddEquipmentPage.tsx

components/
└── equipment/
    └── EquipmentForm.tsx

services/
└── equipmentApi.ts

types/
└── equipment.ts

utils/
└── equipmentValidation.ts
```

The pattern is:

```text
Page
 ↓
Component
 ↓
Validation
 ↓
Service
 ↓
Backend API
```

---

# Team Rules

1. Start new work from the latest `main`.
2. Do not develop directly on `main`.
3. Use one branch per User Story/feature.
4. Push work regularly; pushing does not merge it into `main`.
5. Use Pull Requests before merging.
6. Keep page-specific CSS outside global `index.css`.
7. Keep API calls in `services/`, not scattered throughout components.
8. Keep shared TypeScript structures in `types/`.
9. Keep reusable validation logic outside React components.
10. Follow `docs/api-contract.md` when implementing backend APIs.
11. Never commit `.env` or `node_modules`.
12. Before requesting merge, run:

```bash
npm run test:run
npm run lint
npm run build
```

---

# Current Development Branch

```text
feature/us1-1-register
```

This branch currently contains the frontend implementation and development foundation for US1-1 Register Account.

The registration frontend currently operates using the Mock API while waiting for the real backend implementation.