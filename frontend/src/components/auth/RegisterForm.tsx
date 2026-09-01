import { useState } from 'react';
import type { FormEvent } from 'react';

import { registerUser } from '../../services/authApi';
import { validateRegistration } from '../../utils/validation';

import type {
  RegisterFormErrors,
} from '../../types/auth';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] =
    useState<RegisterFormErrors>({});

  const [isLoading, setIsLoading] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState('');

  const [apiError, setApiError] =
    useState('');

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSuccessMessage('');
    setApiError('');

    const formData = {
      name,
      email,
      password,
    };

    const validationErrors =
      validateRegistration(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await registerUser(formData);

      setSuccessMessage(response.message);

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError(
          'Something went wrong. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        {errors.name && (
          <p>{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">
          University Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="XXX@student.chula.ac.th"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        {errors.email && (
          <p>{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <p>
          Minimum 8 characters with uppercase,
          lowercase, and a number.
        </p>

        {errors.password && (
          <p>{errors.password}</p>
        )}
      </div>

      {apiError && (
        <p>{apiError}</p>
      )}

      {successMessage && (
        <p>{successMessage}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading
          ? 'Creating account...'
          : 'Create Account'}
      </button>
    </form>
  );
}

export default RegisterForm;