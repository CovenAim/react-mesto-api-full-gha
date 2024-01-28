// В Register.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function Register({ onRegister }) {
  const navigate = useNavigate();

  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={async (email, password) => {
        await onRegister(email, password);
      }}
    />
  );
}
