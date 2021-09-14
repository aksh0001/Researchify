/**
 * This file exports the register page for Researchify.
 */

import React from 'react';
import AuthBackground from './authComponents/AuthBackground';
import LoginButton from './authComponents/LoginButton';
import AuthLayout from './AuthLayout';

const RegisterPage = () => (
  <>
    <AuthLayout button={LoginButton()}>
      <AuthBackground />
    </AuthLayout>
  </>
);

export default RegisterPage;
