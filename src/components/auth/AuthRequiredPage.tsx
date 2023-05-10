import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { isAuthorizedSelector } from '@/recoil/atom/auth';

interface AuthRequiredPageProps {
  children: React.ReactNode;
}

const AuthRequiredPage = ({ children }: AuthRequiredPageProps) => {
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) router.push('/');
  }, [isAuthorized, router]);

  return <>{children}</>;
};

export default AuthRequiredPage;
