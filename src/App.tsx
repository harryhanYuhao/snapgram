// import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from './_root/pages';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';

import './globals.css';
import RootLayout from './_root/RootLayout';

const App = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<AuthLayout />} >
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm/>} />
      </Route>

      {/* private routes */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App;
