import { atom, DefaultValue, selector } from 'recoil';

import { silentRefresh } from '@/api/auth';

const authStateAtom = atom({
  key: 'authState',
  default: (async () => {
    // by 민형, 도메인 등록되면 토큰 재발급 API 함수로 변경_230510
    // 유저가 페이지 처음 방문했을 때는 서버에 Refresh token이 없으므로 null 또는 undefined 반환
    // 로그인한 유저가 새로고침 할 경우 서버에 Refresh token이 있고 새로운 AccessToken 반환 하므로 새로고침 유지
    const response = await silentRefresh();

    return {
      isAuthorized: !!response,
    };
  })(),
});

export const isAuthorizedSelector = selector({
  key: 'isAuthorizedState',
  get: ({ get }) => get(authStateAtom).isAuthorized,
  set: ({ set, get }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      set(authStateAtom, {
        ...get(authStateAtom),
        isAuthorized: newValue,
      });
    }
  },
});

export const isOpenedAuthRequiredModalAtom = atom<boolean>({
  key: 'isOpenedAuthRequiredModal',
  default: false,
});
