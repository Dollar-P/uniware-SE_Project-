export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;

  user: {
    id: string;
    name: string;
    email: string;
    role: 'BORROWER' | 'PROVIDER';
  };
}

export interface ApiError {
  code: string;
  message: string;
}