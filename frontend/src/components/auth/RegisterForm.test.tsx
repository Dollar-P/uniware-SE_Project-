import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RegisterForm from './RegisterForm';
import { registerUser } from '../../services/authApi';

vi.mock('../../services/authApi', () => ({
  registerUser: vi.fn(),
}));

const mockedRegisterUser = vi.mocked(registerUser);

describe('RegisterForm', () => {
  beforeEach(() => {
    mockedRegisterUser.mockReset();
  });

  it('submits valid registration data and shows success message', async () => {
    mockedRegisterUser.mockResolvedValue({
      message: 'Registration successful',
      user: {
        id: 'user-1',
        name: 'Putter',
        email: '6731234521@student.chula.ac.th',
        role: 'BORROWER',
      },
    });

    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.type(
      screen.getByLabelText('Name'),
      'Putter'
    );

    await user.type(
      screen.getByLabelText('University Email'),
      '6731234521@student.chula.ac.th'
    );

    await user.type(
      screen.getByLabelText('Password'),
      'Uniware123'
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Create Account',
      })
    );

    expect(mockedRegisterUser).toHaveBeenCalledWith({
      name: 'Putter',
      email: '6731234521@student.chula.ac.th',
      password: 'Uniware123',
    });

    expect(
      await screen.findByText('Registration successful')
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(
      screen.getByLabelText('University Email')
    ).toHaveValue('');
    expect(
      screen.getByLabelText('Password')
    ).toHaveValue('');
  });

  it('shows API error when email already exists', async () => {
    mockedRegisterUser.mockRejectedValue(
      new Error(
        'An account with this email already exists.'
      )
    );

    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.type(
      screen.getByLabelText('Name'),
      'Putter'
    );

    await user.type(
      screen.getByLabelText('University Email'),
      '1111111111@student.chula.ac.th'
    );

    await user.type(
      screen.getByLabelText('Password'),
      'Uniware123'
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Create Account',
      })
    );

    expect(
      await screen.findByText(
        'An account with this email already exists.'
      )
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Name')).toHaveValue(
      'Putter'
    );

    expect(
      screen.getByLabelText('University Email')
    ).toHaveValue(
      '1111111111@student.chula.ac.th'
    );
  });

  it('does not call API when form data is invalid', async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.type(
      screen.getByLabelText('University Email'),
      '1234567890@gmail.com'
    );

    await user.type(
      screen.getByLabelText('Password'),
      'password'
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Create Account',
      })
    );

    expect(
      await screen.findByText('Name is required')
    ).toBeInTheDocument();

    expect(
      mockedRegisterUser
    ).not.toHaveBeenCalled();
  });
});