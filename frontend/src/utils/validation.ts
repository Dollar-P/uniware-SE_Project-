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
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}