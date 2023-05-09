import Link from 'next/link';

import { KAKAO_REDIRECT_URL, KAKAO_REST_API_KEY } from '@/constants/auth';

interface LoginButtonProps {
  children: React.ReactNode;
}

const LoginButton = ({ children }: LoginButtonProps) => {
  return (
    <Link
      className='flex items-center justify-center w-full h-10 bg-yellow-300 border cursor-pointer'
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&
  redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`}
    >
      {children}
    </Link>
  );
};

export default LoginButton;
