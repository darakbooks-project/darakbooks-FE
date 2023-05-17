import { useSetRecoilState } from 'recoil';

import { isOpenedAuthRequiredModalAtom } from '@/recoil/auth';

export const useAuth = () => {
  const setIsOpenedAuthRequiredModal = useSetRecoilState(
    isOpenedAuthRequiredModalAtom,
  );

  const openAuthRequiredModal = () => {
    setIsOpenedAuthRequiredModal(true);
  };

  return { openAuthRequiredModal };
};
