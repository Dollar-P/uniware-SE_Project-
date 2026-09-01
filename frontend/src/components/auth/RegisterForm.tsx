function RegisterForm() {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
        />
      </div>

      <div>
        <label htmlFor="email">University Email</label>
        <input
          id="email"
          name="email"
          type="email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
        />
      </div>

      <button type="submit">
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;