import { Route, Routes } from 'react-router';
import DefaultHeader from '../components/header/DefaultHeader';
// import CompPw from './CompPw';
// import Login from './Login';
// import ResetPw from './ResetPw';
// import SetPw from './SetPw';
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

        {/* <Route path="/resetpw" element={<ResetPw />} />
        <Route path="/setpw/:code" element={<SetPw />} />
        <Route path="/comppw" element={<CompPw />} /> */}
      </Routes>
    </>
  );
}
