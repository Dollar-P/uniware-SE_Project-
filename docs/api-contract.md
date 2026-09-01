# UniWare API Contract

This document defines the API contract shared between the UniWare frontend and backend.

---

# Authentication

## Register Account

### Endpoint

```http
POST /api/auth/register
```

### Description

Creates a new UniWare account using a Chulalongkorn University student email.

Self-registration always creates a `BORROWER` account.

The client must not be allowed to choose its own role.

---

## Request

### Content-Type

```text
application/json
```

### Body

```json
{
  "name": "Putter",
  "email": "6731234521@student.chula.ac.th",
  "password": "Uniware123"
}
```

### Fields

| Field      | Type   | Required | Rule                                                                                |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| `name`     | string | Yes      | Must not be empty                                                                   |
| `email`    | string | Yes      | Exactly 10 digits followed by `@student.chula.ac.th`                                |
| `password` | string | Yes      | Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number |

---

## Successful Response

### `201 Created`

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

## Validation Error

### `400 Bad Request`

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid registration data."
}
```

Examples:

* Missing name
* Invalid student email
* Weak password

---

## Duplicate Email

### `409 Conflict`

```json
{
  "code": "EMAIL_ALREADY_EXISTS",
  "message": "An account with this email already exists."
}
```

---

## Server Error

### `500 Internal Server Error`

```json
{
  "code": "INTERNAL_SERVER_ERROR",
  "message": "Something went wrong."
}
```

The backend should not expose internal stack traces or sensitive implementation details.

---

# Registration Business Rules

## University Email

Valid format:

```text
XXXXXXXXXX@student.chula.ac.th
```

Where `XXXXXXXXXX` is exactly 10 numeric digits.

Example:

```text
6731234521@student.chula.ac.th
```

Frontend validation pattern:

```regex
^\d{10}@student\.chula\.ac\.th$
```

The backend must independently validate this rule.

---

## Password

Password must:

* Have at least 8 characters
* Contain at least one lowercase letter
* Contain at least one uppercase letter
* Contain at least one number

The backend must independently validate this rule.

Passwords must never be stored as plain text.

---

# Frontend Integration

Frontend environment configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_API=true
```

During frontend development:

```env
VITE_USE_MOCK_API=true
```

When the real backend becomes available:

```env
VITE_USE_MOCK_API=false
```

The frontend will then send requests to:

```text
POST {VITE_API_BASE_URL}/auth/register
```

Example:

```text
POST http://localhost:3000/api/auth/register
```

---

# Standard API Error Format

UniWare APIs should use the following error structure:

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

Frontend code should use `message` for user-facing feedback.

`code` can be used when the frontend needs different behavior for specific errors.
