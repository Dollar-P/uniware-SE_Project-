import type {
  RegisterRequest,
  RegisterResponse,
} from '../types/auth';

export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (data.email === '1111111111@student.chula.ac.th') {
    throw new Error('An account with this email already exists.');
  }

  return {
    message: 'Registration successful',
    user: {
      id: 'mock-user-1',
      name: data.name,
      email: data.email,
      role: 'BORROWER',
    },
  };
}