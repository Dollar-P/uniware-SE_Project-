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