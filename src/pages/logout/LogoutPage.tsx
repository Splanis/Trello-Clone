import { useEffect } from 'react';
import { firebaseSignOut } from '../../firebase/services/auth';

export function LogoutPage() {
  useEffect(() => {
    firebaseSignOut();
  }, []);

  return null;
}
