import { atom, DefaultValue, selector } from 'recoil';

import { silentRefresh } from '@/api/auth';

const authStateAtom = atom({
  key: 'authState',
  default: (async () => {
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
