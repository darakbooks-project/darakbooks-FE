import { useSetRecoilState } from 'recoil';

import { isOpenedAuthRequiredModalAtom } from '@/recoil/atom/auth';

export const useAuth = () => {
  const setIsOpenedAuthRequiredModal = useSetRecoilState(
    isOpenedAuthRequiredModalAtom,
  );

  const openAuthRequiredModal = () => {
    setIsOpenedAuthRequiredModal(true);
  };

  return { openAuthRequiredModal };
};
