import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  accessTokenAtom,
  isOpenedAuthRequiredModalAtom,
} from '@/recoil/atom/auth';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = useRecoilValue(accessTokenAtom);
  const setIsOpenedAuthRequiredModal = useSetRecoilState(
    isOpenedAuthRequiredModalAtom,
  );

  const openAuthRequiredModal = () => {
    setIsOpenedAuthRequiredModal(true);
  };

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  return { openAuthRequiredModal, isLoggedIn };
};
