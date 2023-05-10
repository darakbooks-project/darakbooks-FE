import { atom } from 'recoil';

export const accessTokenAtom = atom<string | null>({
  key: 'accessToken',
  default: null,
});

export const isOpenedAuthRequiredModalAtom = atom<boolean>({
  key: 'isOpenedAuthRequiredModal',
  default: false,
});
