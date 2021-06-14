import React, { useState } from 'react';

enum FormInputType {
  newPw,
  confPw,
}

export const ChangePassword: React.FC = () => {
  const [newPassword, setPassword] = useState<string>('');
  const [confirmPassword, setConfPassword] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>, inputType: FormInputType) => {
    switch (inputType) {
      case FormInputType.newPw:
        setPassword(event.target.value);
        break;
      case FormInputType.confPw:
        setConfPassword(event.target.value);
        break;
      default:
        return;
    }
  };

  //TODO: not working for now
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitForm} noValidate>
        <h2>Change password</h2>
        <input
          value={newPassword}
          type="text"
          placeholder={'new password'}
          onChange={(event) => changeHandler(event, FormInputType.newPw)}
        />
        <input
          value={confirmPassword}
          type="text"
          placeholder={'confirm password'}
          onChange={(event) => changeHandler(event, FormInputType.confPw)}
        />
        <button type="submit" className="btn-primary">
          Change Password
        </button>
      </form>
    </div>
  );
};
