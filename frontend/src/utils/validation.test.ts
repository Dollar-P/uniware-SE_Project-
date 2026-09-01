import { describe, expect, it } from 'vitest';

import { validateRegistration } from './validation';

describe('validateRegistration', () => {
  it('accepts valid registration data', () => {
    const errors = validateRegistration({
      name: 'Putter',
      email: '6731234521@student.chula.ac.th',
      password: 'Uniware123',
    });

    expect(errors).toEqual({});
  });

  it('rejects missing name', () => {
    const errors = validateRegistration({
      name: '',
      email: '6731234521@student.chula.ac.th',
      password: 'Uniware123',
    });

    expect(errors.name).toBe('Name is required');
  });

  it('rejects non-Chula student email', () => {
    const errors = validateRegistration({
      name: 'Putter',
      email: 'putter@gmail.com',
      password: 'Uniware123',
    });

    expect(errors.email).toBeDefined();
  });

  it('rejects student email without exactly 10 digits', () => {
    const errors = validateRegistration({
      name: 'Putter',
      email: '123456789@student.chula.ac.th',
      password: 'Uniware123',
    });

    expect(errors.email).toBeDefined();
  });

  it('rejects weak password', () => {
    const errors = validateRegistration({
      name: 'Putter',
      email: '6731234521@student.chula.ac.th',
      password: 'password',
    });

    expect(errors.password).toBeDefined();
  });

  it('rejects empty password', () => {
    const errors = validateRegistration({
      name: 'Putter',
      email: '6731234521@student.chula.ac.th',
      password: '',
    });

    expect(errors.password).toBe('Password is required');
  });
});