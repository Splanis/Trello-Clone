import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/modules/auth';

export function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);

  return null;
}
