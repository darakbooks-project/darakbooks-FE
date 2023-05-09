import { useRouter } from 'next/router';

import LoginButton from '@/components/auth/LoginButton';

const Kakao = () => {
  const router = useRouter();

  const { code, error } = router.query;

  if (code) {
    console.log('인증 코드 받기 성공');
  } else if (error === 'access_denied') {
    // by 민형, 사용자가 로그인 페이지에서 취소한 경우_230509
    router.push('/');
  } else if (router.isReady) {
    // by 민형, 사용자가 로그인 시 오류 발생_230509
    return (
      <>
        <h1>로그인에 실패했습니다</h1>
        <LoginButton>다시 로그인</LoginButton>
      </>
    );
  }
};

export default Kakao;
