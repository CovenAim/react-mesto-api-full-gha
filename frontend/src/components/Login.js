// В Login.js
import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function Login({ onLogin }) {
  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      onSubmit={onLogin}
    />
  );
}
