import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function EventListener() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.defaults.headers.Authorization = localStorage.getItem('token');
  }, [location]);

  return <></>;
}
