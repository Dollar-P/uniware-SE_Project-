import { useState } from 'react';
import type { FormEvent } from 'react';

import { validateRegistration } from '../../utils/validation';
import type { RegisterFormErrors } from '../../types/auth';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<RegisterFormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      name,
      email,
      password,
    };

    const validationErrors = validateRegistration(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    console.log('Valid registration data:', formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>

        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">University Email</label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="XXX@student.chula.ac.th"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {errors.password && <p>{errors.password}</p>}
      </div>

      <button type="submit">
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;