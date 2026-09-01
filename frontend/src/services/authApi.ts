import type {
  RegisterRequest,
  RegisterResponse,
  ApiError,
} from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API === 'true';

export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  if (USE_MOCK_API) {
    return mockRegisterUser(data);
  }

  return registerUserWithApi(data);
}

async function mockRegisterUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  await new Promise((resolve) =>
    setTimeout(resolve, 800)
  );

  if (
    data.email ===
    '1111111111@student.chula.ac.th'
  ) {
    throw new Error(
      'An account with this email already exists.'
    );
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

async function registerUserWithApi(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await fetch(
    `${API_BASE_URL}/auth/register`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error: ApiError = await response.json();

    throw new Error(error.message);
  }

  const result: RegisterResponse =
    await response.json();

  return result;
}