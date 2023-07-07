import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { login } from '@/api/auth';
import LoginButton from '@/components/auth/LoginButton';
import { isAuthorizedSelector } from '@/recoil/auth';

const Kakao = () => {
  const setIsAuthorized = useSetRecoilState(isAuthorizedSelector);

  const {
    query: { code, error },
    isReady,
    push,
  } = useRouter();

  const loginKakao = async (code: string) => {
    const accessToken = await login(code);

    if (!accessToken) {
      console.warn('토큰 발급 과정에서 예상치 못한 오류가 발생하였습니다.');
      push('/login');
      return;
    }

    setIsAuthorized(true);
    push('/');
  };

  useEffect(() => {
    if (code && typeof code === 'string') loginKakao(code);
  }, [code]);

  // by 민형, 사용자 로그인 시 오류 발생_230509
  if (isReady) {
    return (
      <>
        {error && (
          <div>
            <h1>로그인에 실패했습니다</h1>
            <LoginButton>다시 로그인</LoginButton>
          </div>
        )}
      </>
    );
  }
};

export default Kakao;
