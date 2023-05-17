import Link from 'next/link';
import tw from 'tailwind-styled-components';

import { KAKAO_REDIRECT_URL, KAKAO_REST_API_KEY } from '@/constants/auth';

interface LoginButtonProps {
  children: React.ReactNode;
}

const LoginButton = ({ children }: LoginButtonProps) => {
  return (
    <LinkStyle
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`}
    >
      {children}
    </LinkStyle>
  );
};

export default LoginButton;

const LinkStyle = tw(Link)`
  flex 
  items-center 
  justify-center 
  w-full h-10 
  bg-yellow-300 
  border 
  cursor-pointer
`;
