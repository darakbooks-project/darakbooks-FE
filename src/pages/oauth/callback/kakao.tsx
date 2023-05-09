import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { login } from '@/api/auth';
import LoginButton from '@/components/auth/LoginButton';
import { accessTokenAtom } from '@/recoil/atom/auth';

const Kakao = () => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const router = useRouter();
  const { code, error } = router.query;

  const loginKakao = async (code: string) => {
    const accessToken = await login(code);

    if (!accessToken) {
      console.warn('토큰 발급 과정에서 예상치 못한 오류가 발생하였습니다.');
      router.push('/login');
      return;
    }

    setAccessToken(accessToken);
  };

  if (code && typeof code === 'string') {
    loginKakao(code);
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
