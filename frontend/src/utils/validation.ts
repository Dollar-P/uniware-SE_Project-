import type {
  RegisterFormData,
  RegisterFormErrors,
} from '../types/auth';

export function validateRegistration(
  data: RegisterFormData
): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'University email is required';
  } else if (!isValidUniversityEmail(data.email)) {
    errors.email =
      'Email must be a 10-digit student ID followed by @student.chula.ac.th';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(data.password)) {
    errors.password =
      'Password must be at least 8 characters and contain uppercase, lowercase, and a number';
  }

  return errors;
}

function isValidUniversityEmail(email: string): boolean {
  return /^\d{10}@student\.chula\.ac\.th$/.test(email);
}

function isValidPassword(password: string): boolean {
  const hasMinimumLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return (
    hasMinimumLength &&
    hasLowercase &&
    hasUppercase &&
    hasNumber
  );
}