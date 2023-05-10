import axios from 'axios';

export const login = async (code: string) => {
  try {
    // by 민형, 현재 토큰이 응답되지 않는 관계로 문제 해결 후 해당 소스코드로 수정_230509
    // const data = await axios.get(
    //   `http://mafiawithbooks.site/user/auth/kakao/?code=${code}`,
    // );

    // by 민형, 임의의 액세스 토큰_230509
    return 'sfasdf112sdfsadf111';
  } catch {
    return null;
  }
};

export const silentRefresh = async () => {
  try {
    // by 민형, 현재 토큰이 응답되지 않는 관계로 문제 해결 후 해당 소스코드로 수정_230510
    // const data = await axios.get(
    //   `http://mafiawithbooks.site/user/auth/reissue`,
    // );

    // by 민형, 임시로 null 설정_230510
    return null;
  } catch {
    return null;
  }
};
