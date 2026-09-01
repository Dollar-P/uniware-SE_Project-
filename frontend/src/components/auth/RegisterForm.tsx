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
    <form
      className="register-form"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <label htmlFor="name">
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        {errors.name && (
          <p className="form-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email">
          University Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="XXXXXXXXXX@student.chula.ac.th"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        {errors.email && (
          <p className="form-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <p className="form-help">
          At least 8 characters with uppercase,
          lowercase, and a number.
        </p>

        {errors.password && (
          <p className="form-error">
            {errors.password}
          </p>
        )}
      </div>

      {apiError && (
        <div className="form-message form-message-error">
          {apiError}
        </div>
      )}

      {successMessage && (
        <div className="form-message form-message-success">
          {successMessage}
        </div>
      )}

      <button
        className="register-button"
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