import { Route, Routes } from 'react-router';
import DefaultHeader from '../components/header/DefaultHeader';

import Index from './Index';
import Signup from './SignUp';
import Login from './Login';

export default function Auth() {
  return (
    <>
      <DefaultHeader white />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
