import React, { useState } from 'react';

export const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitForm} noValidate>
        <h2>Reset password</h2>
        <input
          value={email}
          type="text"
          placeholder={'confirm password'}
          onChange={changeHandler}
        />
        <button type="submit" className="btn-primary">
          Reset my password
        </button>
      </form>
    </div>
  );
};
