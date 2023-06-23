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
  bg-[#F9E000] 
  border 
  cursor-pointer
  rounded-lg
  px-4
  py-3.5
  my-4
  font-medium	
`;
