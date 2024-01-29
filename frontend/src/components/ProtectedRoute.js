import React from "react";
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute ({ component: Component, ...props }) {
    console.log('Current loggedIn status in ProtectedRoute:', props.loggedIn);
  
    return (
      props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
    );
  }  
