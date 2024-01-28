import React, { useState } from "react";

const AuthForm = ({ title, buttonText, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      await onSubmit(email, password);
      resetForm();
    } catch (error) {
      console.error(`Ошибка ${title.toLowerCase()}:`, error);
    }
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">{title}</h2>
      <form onSubmit={handleSubmit}>
        <label className="auth-form__label">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="auth-form__input-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength="2"
            maxLength="30"
            required
          />
          <div className="auth-form__line"></div>
        </label>
        <label className="auth-form__label">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            className="auth-form__input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="2"
            maxLength="200"
            required
          />
          <div className="auth-form__line"></div>
        </label>
        <button className="auth-form__button">{buttonText}</button>
      </form>
    </div>
  );
};

export default AuthForm;
